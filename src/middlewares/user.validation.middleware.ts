import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "errors/ApiErrors";
import { IUser } from "types/interfaces/user";

export const userValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user: IUser = req.body;
  const error = [];

  if (!user.name) {
    error.push("name");
  }
  if (!user.email) {
    error.push("email");
  }
  if (!user.password) {
    error.push("password");
  }

  if (error.length <= 0) {
    return next();
  }
  if (error.length > 1) {
    return res
      .status(400)
      .send({ message: `Empty ${error} data are required` });
  }
  return res.status(400).send({ message: `Empty ${error} data is required` });
};

export const validateLoginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user: IUser = req.body;
  const error = [];
  if (!user.email) {
    error.push("email");
  }
  if (!user.password) {
    error.push("password");
  }
  if (error.length === 0) {
    return next();
  }
  if (error.length > 1) {
    return res
      .status(400)
      .send({ message: `Empty ${error} data are required` });
  }
  return res.status(400).send({ message: `Empty ${error} data is required` });
};
