import express, { Request, Response, NextFunction } from "express";
import { globalErrorHandler } from "./controller/error.controller";
import appRouter from "./routes/index.routes";
import { initializeDbAndTriggers } from "./utils/helper";
import { initiateAMQPServerConnection } from "./utils/amqpConnection";

const app = express();
let queueConnection;

app.use(express.json({ limit: "10000kb" }));
app.use(express.urlencoded({ extended: true, limit: "10000kb" }));

// Health-check API
app.use("/health-check", (req: Request, res: Response) => {
    res.json({
        status: true,
        message: "API is working!",
    });
});

// Initialize database and triggers
initializeDbAndTriggers();

// Initialize AMQP
(async () => {
    queueConnection = await initiateAMQPServerConnection();
})();

app.use("/api/v1/", appRouter);

// Error handling
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

app.use(globalErrorHandler);

export default app;
