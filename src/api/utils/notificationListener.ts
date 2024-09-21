import { GetConnectionOptions } from "sequelize/types/dialects/abstract/connection-manager";
import { dbConnection } from "../../db/dbConnection";
import { getConsumerChannel, getProducerChannel } from "./amqpConnection";
import NotificationLogModel from "../../db/model/notification.model";
import { Message } from "amqplib";

export const setupNotificationListener = async () => {
    const getConnectionOpt: GetConnectionOptions = {
        type: "read",
    };

    await dbConnection.query(`LISTEN order_status_notification`);
    const connection: any = await dbConnection.connectionManager.getConnection(
        getConnectionOpt
    );
    console.log("Notifier listen initiation completed");

    connection.on("notification", async (notification: any) => {
        try {
            console.debug(
                `New notification received, Channel name: ${notification.channel}.`
            );
            if (notification.channel === "order_status_notification") {
                console.debug(`Received notification for ${notification.channel}. Triggering rabbit mq producer for message ${notification.payload}.`);

                console.log("notification.payload:::::::::::::::::::::::::::",notification.payload);
                const parsedPayload = JSON.parse(notification.payload);
                const oldData = parsedPayload.old;
                const newData = parsedPayload.new;

                console.debug("Old Data:", oldData);
                console.debug("New Data:", newData);

                await NotificationLogModel.create({
                    userId: newData.userId,
                    orderId: newData.id,
                    oldStatus: oldData?.status || newData.status,
                    newStatus: newData.status,
                });

                const producer = getProducerChannel();

                console.debug(`Triggering AMQP publisher`);
                producer.publish(
                    "notification_request_exchange",
                    "notification_request_routing_key",
                    Buffer.from(notification.payload)
                );
                console.debug(`Event handled successfully.`);
            }
        } catch (error: any) {
            console.log(error);
            console.error(`Error in notification listener: ${error.message}`);
        }
    });
};

export const queueConsumer = async () => {
    const consumer = getConsumerChannel();
    console.debug(`Initiating RMQ consumers`);

    // Setting prefetch count to 1 to process one message at a time
    consumer.prefetch(1);

    // Consuming messages from the queue
    consumer.consume(
        "notification_request_queue",
        async (message) => {
            if (!message) {
                // If the message is null, do nothing
                console.debug("Received null message, skipping...");
                return;
            }

            try {
                console.debug(
                    `RMQ consumer received payload: ${JSON.stringify(
                        message.content.toString()
                    )}`
                );
                /**
                 * TODO: Implement the notification sending mechanism
                 * and based on the status update the queue
                 */
                consumer.ack(message); // Acknowledge the message after processing
            } catch (error: any) {
                console.error(
                    `Internal error @ RMQ consumer: ${error.message}`
                );
            }
        },
        { noAck: false } // Ensure messages are acknowledged only after processing
    );
};
