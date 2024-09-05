import { Request, Response, NextFunction } from 'express';

/**
 * This code is a middleware wrapper for Express.js, designed to handle asynchronous route handlers and catch any errors that occur during their execution. 
 * It simplifies error handling in asynchronous functions by catching rejected promises and passing them to the next() function, which can then be handled in error-handling mechanism.
 */

export default (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};