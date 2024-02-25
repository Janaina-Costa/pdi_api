import { NextFunction, Request, Response } from "express";

import { z } from "zod";

export const userValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userSchema = z.object({
    name: z
      .string()
      .refine((obj) => obj.length > 3, {
        message: "Name must be greater than 3 characters",
      }),

    email: z.string().email({ message: "Invalid email address" }),

    password: z
      .string()
      .refine((obj) => obj.length >= 8 && obj.length <= 12, {
        message: "Password must be between 8 and 12 characters",
      }),
  });

  try {
    userSchema.parse(req.body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.issues);

      return res
        .status(400)
        .json({
          message: err.issues.map((issue) =>
            issue.message === "Required"
              ? `The field ${issue.path
                  .map((path) => path)
                  .join(" ")} is required`
              : issue.message,
          ),
        });
    }
  }

  return next();
};

export const validateUserUpdateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userSchema = z.object({
    name: z
      .string()
      .refine((obj) => obj.length >= 3, {
        message: "Name must be greater than 3 characters",
      })
      .optional(),

    email: z.string().email({ message: "Invalid email address" }).optional(),

    password: z
      .string()
      .refine((obj) => obj.length >= 8 && obj.length <= 12, {
        message: "Password must be between 8 and 12 characters",
      })
      .optional(),

    image: z.string().optional(),
  });
  try {
    userSchema.parse(req.body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.issues);

      return res
        .status(400)
        .json({ message: err.issues.map((issue) => issue.message) });
    }
  }
  return next();
};

export const validateLoginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  try {
    userSchema.parse(req.body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.issues);

      return res
        .status(400)
        .json({
          message: err.issues.map((issue) =>
            issue.message === "Required"
              ? "Email and password are required"
              : issue.message,
          ),
        });
    }
  }

  return next();
};
