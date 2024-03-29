import { NextFunction, Request, Response } from "express";
import { ApiError } from "errors/ApiErrors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const errorMessage = error.statusCode
    ? error.message
    : "Internal server error";
  next(error);
  return res.status(statusCode).json({ message: errorMessage });
};
