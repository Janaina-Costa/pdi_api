import { UserRepository } from "repositories/User.Repository";
import { IUser } from "types/interfaces/user";

class UserService {
  async findUsersService() {
    const client = new UserRepository();
    return await client.findAllUsersRepository();
  }

  async findUserByIdService(id: number) {
    const client = new UserRepository();
    return await client.findUserByIdRepository(id);
  }
  async findUserByEmailService(email: string) {
    const client = new UserRepository();
    return await client.findOneUserRepository(email);
  }

  async createUerService({ ...props }: IUser) {
    const client = new UserRepository();
    return await client.createUserRepository({ ...props });
  }

  async updateUserService(id: number, { ...props }: IUser) {
    const client = new UserRepository();
    return await client.updateUserRepository(id, { ...props });
  }

  async deleteUserService(id: number) {
    const client = new UserRepository();
    return await client.deleteUserRepository(id);
  }
}

export const userService = new UserService();
