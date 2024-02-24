import { Request, Response } from "express";
import { userService } from "services/User.Service";
import { IUser } from "types/interfaces/user";
import bcrypt from "bcrypt";
import { convertToString } from "util/convertToString";
import { ApiError, BadRequestError, NotFound } from "errors/ApiErrors";

export class UserController {
  async findUsersController(req: Request, res: Response) {
    const user = await userService.findUsersService();

    if (!user) {
      throw new NotFound("Users not found");
    }
    user.map((user) => (user.password = convertToString(user.password)));

    return res.status(200).send(user);
  }

  async findUserByIdController(req: Request, res: Response) {
    const { id } = req.params;

    const user: IUser = await userService.findUserByIdService(Number(id));
    console.log(user);

    if (!user) {
      throw new NotFound("User not found");
    }
    const passwordToString = convertToString(user.password);

    return res.status(200).send({ ...user, password: passwordToString });
  }

  async createUserController(req: Request, res: Response) {
    const { name, email, password, image }: IUser = req.body;
    let cryptPassword = "";

    if (password) {
      cryptPassword = await bcrypt.hash(password, 8);
    }
    const emailAlreadyExists = await userService.findUserByEmailService(email);

    if (emailAlreadyExists) {
      throw new ApiError("Email already exists", 409);
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
  }

  async updateUserController(req: Request, res: Response) {
    const { id } = req.params;
    let { name, email, password, image }: IUser = req.body;
    let cryptPassword = "";

    const user = await userService.findUserByIdService(Number(id));

    const passwordToString = convertToString(user.password);

    if (!password) {
      password = passwordToString;
    }

    if (password.length > 12 || password.length < 8) {
      throw new BadRequestError("Password must be between 8 and 12 characters");
    }

    const passwordToCompare = await bcrypt.compare(password, passwordToString);

    if (passwordToCompare || !password) {
      cryptPassword = passwordToString;
    } else {
      cryptPassword = await bcrypt.hash(password, 8);
    }

    const update = new Date();
    const result = await userService.updateUserService(Number(id), {
      name: name ? name : user.name,
      email: email ? email : user.email,
      password: password ? cryptPassword : user.password,
      image: image ? image : user.image,
      updated_At: update.toISOString(),
    });

    return res.status(200).send({
      result,
      message: "User updated successfully",
    });
  }

  async deleteUserController(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.findUserByIdService(Number(id));

    if (!user) {
      throw new NotFound("User not found");
    }

    await userService.deleteUserService(Number(id));

    return res.status(200).send({ message: "User deleted successfully" });
  }
}

export const userController = new UserController();
