import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import asyncHandler from "../utils/catchAsync";

export const helloWorld = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        status: true,
        message: 'Hello World'
    })
})

// example of error throwing
export const errorHandlerController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return next(new AppError("Testing the Error Handling", 400));
})