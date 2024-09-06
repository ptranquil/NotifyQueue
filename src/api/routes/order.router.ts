import express from "express";
import { getOrders, createOrder } from "../controller/order.controller";

const orderRouter = express.Router();

orderRouter.get('/', getOrders);
orderRouter.post('/', createOrder);

export default orderRouter;