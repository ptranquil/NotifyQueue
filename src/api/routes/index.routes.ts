import express from "express";
import orderRouter from "./order.router";
import userRouter from "./user.router";

const appRouter = express.Router();

appRouter.use('/user', userRouter);
appRouter.use('/order', orderRouter);

export default appRouter;