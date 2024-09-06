import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/catchAsync";
import { UserModel } from "../../db/dbConnection";

export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.findAll({});
    return res.json({
        status: true,
        message: 'User fetched succesfully!',
        data: users
    })
})

export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    await UserModel.create({
        ...user
    })
    return res.json({
        status: true,
        message: 'User created succesfully!',
    })
})