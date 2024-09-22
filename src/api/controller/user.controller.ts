import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/catchAsync";
import UserModel from "../../db/model/user.model";
import redisClient from "../utils/redisConnection";

export const getUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const users = await UserModel.findAll({});
        return res.json({
            status: true,
            message: "User fetched succesfully!",
            data: users,
        });
    }
);

export const createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.body;
        await UserModel.create({
            ...user,
        });
        return res.json({
            status: true,
            message: "User created succesfully!",
        });
    }
);

export const getUserDetails = async (userId: string) => {
    const cachedUser = await redisClient.get(`user:${userId}`);
    if (cachedUser) {
        console.log('fetching from cache')
        return JSON.parse(cachedUser); // Return user data from cache
    }

    // If not in cache, fetch from DB
    const user = await UserModel.findByPk(userId);

    if (user) {
        // Cache the user details for future use
        await redisClient.setEx(`user:${userId}`, 3600, JSON.stringify(user)); // Cache for 1 hour
        return user;
    }
    return null;
};
