import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userService } from "services/User.Service";
import { SECRET_KEY } from "settings";
import { IUser } from "types/interfaces/user";

const secret = SECRET_KEY;

interface IJWTPayload {
  id: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ message: "No token provided" });
    }

    const partsOfToken = authorization.split(" ");
    if (partsOfToken.length !== 2) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const matchBearer = /^Bearer$/i;

    const [scheme, token] = partsOfToken;

    if (!matchBearer.test(scheme)) {
      return res.status(401).send({ message: "Invalid token format" });
    }

    jwt.verify(token, secret, async (error, decoded) => {
      if (error) {
        console.log(`Error: ${error}`);
        return res.status(401).send({ message: "Invalid token" });
      }

      const { id } = decoded as IJWTPayload;

      const user: IUser = await userService.findUserById(id);

      if (!user) {
        return res.status(401).send({ message: "User unauthorized" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
