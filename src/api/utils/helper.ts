import { createDbSchema, dbConnection, dbSync } from "../../db/dbConnection";
import { defineAssociations } from "../../db/defineAssociation";
import { setupNotificationListener } from "./notificationListener";

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
        IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.status = 'created' AND OLD.status <> 'created') THEN
            PERFORM pg_notify('order_status_notification', NEW.id::text);
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE TRIGGER insert_notification_trigger
      AFTER INSERT OR UPDATE OF status ON ${dbSchema}.order
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
        await new Promise(resolve => setTimeout(resolve, 100)); // delay for the tables to be sync properly before trigger creation
        await dropTriggerInscan(); // Drop existing triggers
        await initQueueingDBFunctions(); // Initialize triggers
        await setupNotificationListener(); // Listen for notifications

        console.log("Database and trigger initialization completed.");
    } catch (error) {
        console.error("Error during DB and trigger initialization:", error);
        throw error;
    }
};
