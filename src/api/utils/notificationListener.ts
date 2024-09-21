import { GetConnectionOptions } from "sequelize/types/dialects/abstract/connection-manager";
import { dbConnection } from "../../db/dbConnection";

export const setupNotificationListener = async () => {
    const getConnectionOpt: GetConnectionOptions = {
        type: 'read',
    };

    await dbConnection.query(`LISTEN order_status_notification`);
    const connection: any = await dbConnection.connectionManager.getConnection(getConnectionOpt);
    console.log('Notifier listen initiation completed');

    connection.on("notification", async (notification: any) => {
        try {
            console.debug(`New notification received, Channel name: ${notification.channel}.`);
            if (notification.channel === "order_status_notification") {
                // Handle the notification
            }
        } catch (error: any) {
            console.error(`Error in notification listener: ${error.message}`);
        }
    });
};
