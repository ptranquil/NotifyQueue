import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/catchAsync";
import OrderModel from "../../db/model/orders.model";

export const getOrders = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const orders = await OrderModel.findAll({});
    return res.json({
        status: true,
        message: 'Order fetched succesfully!',
        data: orders
    })
})

export const createOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const order = req.body;
    const newOrder = await OrderModel.create({
        ...order
    })
    return res.json({
        status: true,
        message: 'Order created succesfully!',
        data: newOrder
    })
})