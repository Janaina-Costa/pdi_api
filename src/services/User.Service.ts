import { connectDataBase, dbSql } from "database/db";
import query from "database/db.query";
import { UserRepository } from "repositories/userRepository";
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
