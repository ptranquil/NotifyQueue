import amqplib from "amqplib";

let amqpProducerChannel: amqplib.Channel;
let amqpConsumerChannel: amqplib.Channel;

export const initiateAMQPServerConnection = async () => {
    try {
        console.log("Initiating RabbitMQ connection...");
        console.log("Trying to Establish RabbitMQ connection...");
        const amqpConnection = await amqplib.connect({
            protocol: process.env.RABBITPROTOCOL,
            hostname: process.env.RABBITHOST,
            port: process.env.RABBITPORT as unknown as number,
            username: process.env.RABBITUSER,
            password: process.env.RABBITPASSWORD,
        });
        console.log(
            `RabbitMQ Established, Cluster name @ ${amqpConnection.connection.serverProperties.cluster_name}`
        );

        await triggerQueueAndExchanges(amqpConnection);
        amqpProducerChannel = await amqpConnection.createChannel();
        console.debug("Created Rabbit MQ channel for producer.");
        amqpConsumerChannel = await amqpConnection.createChannel();
        console.debug("Created Rabbit MQ channel for consumer.");

        amqpConnection.on("disconnect", () => {
            console.log("RabbitMQ connection dropped...");
        });
        console.log(
            `RabbitMQ, Cluster name @ ${amqpConnection.connection.serverProperties.cluster_name}`
        );
        return amqpConnection;
    } catch (error) {
        console.error("Failed to connect to rabbitmq server");
        throw error;
    }
};

export const triggerQueueAndExchanges = async (amqpConnection: any) => {
    try {
        console.debug(`Triggering queues and exchange...`);
        console.debug(`Creating Rabbit MQ Channel`);
        const channel = await amqpConnection.createChannel();
        console.debug(`AMQP Channel initialized...`);

        // Declare notification_exchange
        await channel.assertExchange("notification_request_exchange", "direct");
        console.debug(
            `Notification request exchange 'notification_request_exchange' declared...`
        );
        // Declare dead letter exchange
        await channel.assertExchange(
            "notification_request_dll_exchange",
            "direct"
        );
        console.debug(
            `Notification request exchange dead letter exchange 'notification_request_dll_exchange' declared...`
        );
        // Declare notification_queue
        await channel.assertQueue("notification_request_queue", {
            deadLetterExchange: "notification_request_dll_exchange",
            durable: true,
        });
        console.debug(
            `Notification request queue  'notification_request_queue' declared...`
        );
        // Declare notification_queue dll queue
        await channel.assertQueue("notification_request_dll_queue", {
            deadLetterExchange: "notification_request_exchange",
            messageTtl: 60000, // 1 second in milliseconds,
            durable: true,
        });
        console.debug(
            `Notification request dle queue  'notification_request_dll_queue' declared...`
        );
        // Binding Notification exchange to Notification queue
        await channel.bindQueue(
            "notification_request_queue",
            "notification_request_exchange",
            "notification_request_routing_key"
        );
        console.debug(
            `Binding notification_request_exchange to notification_request_queue completed.`
        );
        // Binding Notification dll exchange to Notification dll queue
        await channel.bindQueue(
            "notification_request_dll_queue",
            "notification_request_dll_exchange",
            "notification_request_routing_key"
        );
        console.debug(
            `Binding notification_request_dll_exchange to notification_request_dll_queue completed.`
        );
        await channel.close();
        console.debug(
            `Channel closed, exchange and queues declared successfully.`
        );
        return;
    } catch (error: any) {
        console.error(
            "Failed to trigger queues and exchanges : ",
            error.message
        );
        console.log("Rabbit mq connection failed.");
        throw error;
    }
};

// Function to get the producer channel
export const getProducerChannel = () => {
    if (!amqpProducerChannel) {
        throw new Error("Producer channel is not initialized yet.");
    }
    return amqpProducerChannel;
};

// Function to get the consumer channel
export const getConsumerChannel = () => {
    if (!amqpConsumerChannel) {
        throw new Error("Consumer channel is not initialized yet.");
    }
    return amqpConsumerChannel;
};