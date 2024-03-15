import { UserRepository } from "repositories/User.Repository";
import { IUser } from "types/interfaces/user";

class UserService {
  async findUsers() {
    const client = new UserRepository();
    return await client.findAllUsers();
  }

  async findUserById(id: number) {
    const client = new UserRepository();
    return await client.findUserById(id);
  }
  async findUserByEmail(email: string) {
    const client = new UserRepository();
    return await client.findOneUser(email);
  }

  async createUer({ ...props }: IUser) {
    const client = new UserRepository();
    return await client.createUser({ ...props });
  }

  async updateUser(id: number, { ...props }: IUser) {
    const client = new UserRepository();
    return await client.updateUser(id, { ...props });
  }

  async deleteUser(id: number) {
    const client = new UserRepository();
    return await client.deleteUser(id);
  }

  async countUser() {
    const client = new UserRepository();
    return await client.countUser();
  }
}

export const userService = new UserService();
