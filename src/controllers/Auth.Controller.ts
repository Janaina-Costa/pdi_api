import { Request, Response } from "express";
import { userAuthenticateService } from "services/Auth.Service";
import { IUser } from "types/interfaces/user";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "settings";
import { BadRequestError } from "errors/ApiErrors";

const secret = SECRET_KEY;

class AuthUserController {
  async loginUser(req: Request, res: Response) {
    const user: IUser = req.body;
    const userData = await userAuthenticateService.login(user.email);

    if (!user.email || user.email !== userData?.email) {
      throw new BadRequestError("Email or password invalid");
    }
    let passwordToString;

    passwordToString = String(userData?.password);

    const comparePassword = await bcrypt.compare(
      user.password,
      passwordToString,
    );

    if (!comparePassword) {
      throw new BadRequestError("Email or password invalid");
    }

    const userLogged = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      image: userData.image,
    };

    const token = await userAuthenticateService.generateToken(
      userData.id,
      secret,
    );

    return res.status(200).send({
      userLogged,
      token,
      message: "User logged in successfully",
    });
  }
}

export const authUserController = new AuthUserController();
