import amqplib from "amqplib";

export const initiateAMQPServerConnection = async () => {
    try {
        console.log("Initiating RabbitMQ connection...");
        console.log("Trying to Establish RabbitMQ connection...");
        const amqp_connection = await amqplib.connect({
            protocol: process.env.RABBITPROTOCOL,
            hostname: process.env.RABBITHOST,
            port: process.env.RABBITPORT as unknown as number,
            username: process.env.RABBITUSER,
            password: process.env.RABBITPASSWORD,
        });
        console.log(
            `RabbitMQ Established, Cluster name @ ${amqp_connection.connection.serverProperties.cluster_name}`
        );
        amqp_connection.on("disconnect", () => {
            console.log("RabbitMQ connection dropped...");
        });
        console.log(
            `RabbitMQ, Cluster name @ ${amqp_connection.connection.serverProperties.cluster_name}`
        );
        return amqp_connection;
    } catch (error) {
        console.error("Failed to connect to rabbitmq server");
        throw error;
    }
};
