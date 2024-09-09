import express, { Request, Response, NextFunction } from "express";
import { globalErrorHandler } from "./controller/error.controller";
import { dbConnection, createDbSchema } from "../db/dbConnection";
import AppError from "./utils/appError";
import appRouter from "./routes";

const app = express();

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
dbConnection
    .authenticate()
    .then(async () => {
        console.log("Connection has been established successfully.");
        await createDbSchema()
    })
    .catch((err: any) => {
        console.log("Unable to connect to the database:", err.message);
        throw new AppError(`Unable to connect to the database: ${err}`, 400);
    });

app.use("/api/v1/",appRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

app.use(globalErrorHandler);

export default app;
