import { Request, Response } from "express";
import { userAuthenticateService } from "services/auth.service";
import { IUser } from "types/interfaces/user";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "settings";

const secret = SECRET_KEY;

class AuthUserController {
  async loginUserController(req: Request, res: Response) {
    try {
      const user: IUser = req.body;
      const userData = await userAuthenticateService.loginService(user.email);

      if (!user.email || user.email !== userData?.email) {
        return res.status(400).send({ message: "Email or password invalid" });
      }
      let passwordToString;

      passwordToString = String(userData?.password);

      const comparePassword = await bcrypt.compare(
        user.password,
        passwordToString,
      );

      if (!comparePassword) {
        return res.status(400).send({ message: "Email or password invalid" });
      }

      const userLogged = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      };

      const token = await userAuthenticateService.generateTokenService(
        userData.id,
        secret,
      );

      return res.status(200).send({
        userLogged,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export const authUserController = new AuthUserController();
