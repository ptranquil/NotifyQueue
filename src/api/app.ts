import express, { Request, Response, NextFunction } from "express";
import { globalErrorHandler } from "./controller/error.controller";
import { dbConnection, createDbSchema } from "../db/dbConnection";
import AppError from "./utils/appError";
import appRouter from "./routes";
import { initiateAMQPServerConnection } from "./utils/amqpConnection";
import { GetConnectionOptions } from "sequelize/types/dialects/abstract/connection-manager";
import NotificationLogModel from "../db/model/notification.model";

const app = express();
let queueConnection;

app.use(express.json({ limit: "10000kb" }));
app.use(express.urlencoded({ extended: true, limit: "10000kb" }));

//health-check API
app.use("/health-check", (req: Request, res: Response) => {
    res.json({
        status: true,
        message: "API is working!!!!!!",
    });
});

// Database Connection & Schema Creation Process
const getConnectionOpt: GetConnectionOptions = {
    type: 'read'
}

dbConnection
    .authenticate()
    .then(async () => {
        console.log("Connection has been established successfully.");
        await createDbSchema();
        await dbConnection.query(`LISTEN new_notification`);
        console.log('Notifier listen initiation completed')
    })
    .catch((err: any) => {
        console.log("Unable to connect to the database:", err.message);
        throw new AppError(`Unable to connect to the database: ${err}`, 400);
    });

(async() => {
    const connection: any = await dbConnection.connectionManager.getConnection(getConnectionOpt)
    connection.on("notification", async (notification: any) => {
        try {
          console.debug(
            `New notification received, Channel name : ${notification.channel}.`
          );
          if (notification.channel === "new_notification") {
            //handling required
          }
        } catch (error: any) {
          // console.log("Internal Error : ", error.message);
          console.error(
            `Fatal error @ trigger notification for channel  db event listner.Error : ${error.mesage}`
          );
        }
    });
})();


app.use("/api/v1/",appRouter);

(async() => {
    queueConnection = await initiateAMQPServerConnection();
})()

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

app.use(globalErrorHandler);

export default app;
