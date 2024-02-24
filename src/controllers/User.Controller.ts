import { Request, Response } from "express";
import { userService } from "services/User.Service";
import { IUser } from "types/interfaces/user";
import bcrypt from "bcrypt";

export class UserController {
  async findUsersController(req: Request, res: Response) {
    try {
      const user = await userService.findUsersService();

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      user.map((user) => (user.password = String(user.password)));

      return res.status(200).send(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async findUserByIdController(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user: IUser = await userService.findUserByIdService(Number(id));

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      const passwordToString = String(user.password);

      return res.status(200).send({ ...user, password: passwordToString });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async createUserController(req: Request, res: Response) {
    const { name, email, password, image }: IUser = req.body;
    let cryptPassword = "";

    try {
      if (password) {
        cryptPassword = await bcrypt.hash(password, 8);
      }

      const result = await userService.createUerService({
        name,
        email,
        password: cryptPassword,
        image,
      });

      return res.status(201).send({
        result,
        message: "User created successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async updateUserController(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password, image, updated_at }: IUser = req.body;
    let cryptPassword = "";
    try {
      const userPassword = await userService.findUserByIdService(Number(id));
      const passwordToString = String(userPassword.password);

      const passwordToCompare = await bcrypt.compare(
        password,
        passwordToString,
      );
      console.log(passwordToCompare);

      if (passwordToCompare || password === "") {
        cryptPassword = passwordToString;
      } else {
        cryptPassword = await bcrypt.hash(password, 8);
      }
      const update = new Date();
      const result = await userService.updateUserService(Number(id), {
        name,
        email,
        password: cryptPassword,
        image,
        updated_at: update.toISOString(),
      });

      return res.status(200).send({
        result,
        message: "User updated successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async deleteUserController(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await userService.deleteUserService(Number(id));

      return res.status(200).send({ message: "User deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}

export const userController = new UserController();
