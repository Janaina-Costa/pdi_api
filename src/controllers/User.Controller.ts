import { Request, Response } from "express";
import { userService } from "services/User.Service";
import { IUser } from "types/interfaces/user";
import bcrypt from "bcrypt";
import { ApiError, NotFound } from "errors/ApiErrors";

export class UserController {
  async findUsers(req: Request, res: Response) {
    const user = await userService.findUsers();

    if (!user) {
      throw new NotFound("Users not found");
    }
    user.map((user) => (user.password = String(user.password)));

    return res.status(200).send(user);
  }

  async findUserById(req: Request, res: Response) {
    const { id } = req.params;

    const user: IUser = await userService.findUserById(Number(id));

    if (!user) {
      throw new NotFound("User not found");
    }
    const passwordToString = String(user.password);

    return res.status(200).send({ ...user, password: "" });
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password, image }: IUser = req.body;
    let cryptPassword = "";

    if (password) {
      cryptPassword = await bcrypt.hash(password, 8);
    }
    const emailAlreadyExists = await userService.findUserByEmail(email);

    if (emailAlreadyExists) {
      throw new ApiError("Email already exists", 409);
    }

    const result = await userService.createUer({
      name,
      email,
      password: cryptPassword,
      image,
    });

    return res.status(201).send({
      password: "",
      result,
      message: "User created successfully",
    });
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    let { name, email, password, image }: IUser = req.body;
    let cryptPassword = "";

    const user = await userService.findUserById(Number(id));

    const passwordToString = String(user.password);

    if (!password) {
      password = passwordToString;
    }

    const passwordToCompare = await bcrypt.compare(password, passwordToString);

    if (passwordToCompare) {
      cryptPassword = passwordToString;
    } else {
      cryptPassword = await bcrypt.hash(password, 8);
    }

    const update = new Date();
    const result = await userService.updateUser(Number(id), {
      name: name ? name : user.name,
      email: email ? email : user.email,
      password: password ? cryptPassword : user.password,
      image: image ? image : user.image,
      updated_At: update.toISOString(),
    });

    return res.status(200).send({
      _password: "",
      result,
      message: "User updated successfully",
    });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.findUserById(Number(id));

    if (!user) {
      throw new NotFound("User not found");
    }

    await userService.deleteUser(Number(id));

    return res.status(200).send({ message: "User deleted successfully" });
  }

  async countUser(req: Request, res: Response) {
    const total = await userService.countUser();
    return res.status(200).send({ total });
  }
}

export const userController = new UserController();
