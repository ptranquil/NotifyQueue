import express, { Request, Response, NextFunction } from "express";
import { globalErrorHandler } from "./controller/error.controller";
import appRouter from "./routes/sample.router";

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

app.use("/api/v1/",appRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

app.use(globalErrorHandler);

export default app;
