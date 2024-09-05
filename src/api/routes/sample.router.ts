import express from "express";
import { helloWorld, errorHandlerController } from "../controller/sample.controller";

const appRouter = express.Router();

appRouter.get('/test', helloWorld);
appRouter.get('/error', errorHandlerController);

export default appRouter;