import { createDbSchema, dbConnection, dbSync } from "../../db/dbConnection";
import { defineAssociations } from "../../db/defineAssociation";
import { initiateAMQPServerConnection } from "./amqpConnection";
import { queueConsumer, setupNotificationListener } from "./notificationListener";

export const initQueueingDBFunctions = async () => {
    try {
        console.debug(`Initiating queueing functions`);
        const dbSchema = process.env.DATABASE_SCHEMA;

        // Create Trigger for order status update table and function which notify rabbit mq producer

        const orderQueueTableTriggerFunction = `
            BEGIN;
                CREATE OR REPLACE FUNCTION ${dbSchema}.notify_change()
                RETURNS TRIGGER AS $$
                BEGIN
                    PERFORM pg_notify(
                        'order_status_notification',
                        json_build_object(
                            'old', row_to_json(OLD),
                            'new', row_to_json(NEW)
                        )::text
                    );
                RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;

                CREATE OR REPLACE TRIGGER insert_notification_trigger
                AFTER INSERT OR UPDATE ON ${dbSchema}.order
                FOR EACH ROW
                EXECUTE FUNCTION ${dbSchema}.notify_change();
            COMMIT;
        `;

        await dbConnection.query(orderQueueTableTriggerFunction);
        console.debug("Queuing table initiation completed.");
        return;
    } catch (error: any) {
        console.error(`Queuing table initiation failed : ${error.message}.`);
        throw error;
    }
};

export const dropTriggerInscan = async () => {
    try {
        const dbSchema = process.env.DATABASE_SCHEMA;
        const drop_query = `DROP TRIGGER IF EXISTS insert_notification_trigger ON ${dbSchema}.order;`;
        await dbConnection.query(drop_query);
        console.debug("Queuing triggered dropped.");
        return;
    } catch (error: any) {
        console.error(`Queuing table drop failed : ${error.message}.`);
        throw error;
    }
};

export const initializeDbAndTriggers = async () => {
    try {
        console.log("Initializing database and triggers...");

        await createDbSchema(); // Ensure schema exists
        await dbSync();
        defineAssociations();
        await new Promise((resolve) => setTimeout(resolve, 100)); // delay for the tables to be sync properly before trigger creation
        await dropTriggerInscan(); // Drop existing triggers
        await initQueueingDBFunctions(); // Initialize triggers
        await initiateAMQPServerConnection(); // AMQP Server connection
        await setupNotificationListener(); // Listen for notifications
        await queueConsumer();

        console.log("Database and trigger initialization completed.");
    } catch (error) {
        console.error("Error during DB and trigger initialization:", error);
        throw error;
    }
};
