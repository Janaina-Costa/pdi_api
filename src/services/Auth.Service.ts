import jwt from "jsonwebtoken";
import { UserRepository } from "repositories/User.Repository";

export class UserAuthenticateService {
  public async login(email: string) {
    const service = new UserRepository();

    return await service.findOneUser(email);
  }

  public async generateToken(id: any, secret: string) {
    return jwt.sign({ id }, secret, { expiresIn: "1d" });
  }
}

export const userAuthenticateService = new UserAuthenticateService();
