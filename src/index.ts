import { AppError, errorHandler } from "./error";
import { logger } from "./config/logger";
//boostrap expressjs
import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  logger.info("Server is running on port " + PORT.toString());
});

// Error response
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  err && errorHandler.handleError(err, res);
});

//uncaught error/rejection
process.on("unhandledRejection", (e) => {
  throw e;
});

process.on("uncaughtException", (e) => {
  errorHandler.handleError(e);
  !errorHandler.isTrustedError(e) && process.exit(1);
});
