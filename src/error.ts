import { Response } from "express";
import mongoose from "mongoose";
import { logger } from "./config/logger";

export class AppError {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

class ErrorHandler {
  public handleError(err: Error, res?: Response) {
    //constructing response
    let { message, stack } = err;
    let statusCode;
    if (err instanceof AppError) {
      statusCode = err.statusCode;
    } else if (err instanceof mongoose.Error.ValidationError) {
      statusCode = 400;
      message = err.message;
    } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
      statusCode = 404;
      message = err.message;
    } else {
      statusCode = 500;
      message = "Something went wrong";
    }

    //logging
    logger.error(message, stack);

    //response
    res && res.status(statusCode).json({ error: message });
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof AppError) return true;
    if (error instanceof mongoose.Error.ValidationError) return true;
    if (error instanceof mongoose.Error.DocumentNotFoundError) return true;
    return false;
  }
}
export const errorHandler = new ErrorHandler();
