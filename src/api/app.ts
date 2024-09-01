import express, { Request, Response, NextFunction } from "express";
import { globalErrorHandler } from "./utils/helper";
const app = express();

app.use(express.json({ limit: '10000kb' }));
app.use(express.urlencoded({ extended: true, limit: '10000kb' }));

app.use("/", (req: Request, res: Response) => {
    res.json({
        status: true,
        message: 'API is working'
    })
})

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  // next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));

  res.status(400).send({
    message:`Can't find ${req.originalUrl} on this server!`
  })

});

app.use(globalErrorHandler);

export default app;
