import { connectDataBase, dbSql } from "database/db";
import query from "database/db.query";

export class UserRepository {
  async findAllUsersRepository(): Promise<User[]> {
    const pool = await connectDataBase();
    const result = await pool?.query(query.findAll);

    return result?.recordset || [];
  }

  async findUserByIdRepository(id: number): Promise<User> {
    const pool = await connectDataBase();
    const result: any = await pool
      ?.request()
      .input("id", dbSql.Int, id)
      .query(query.findById);

    return result?.recordsets[0][0];
  }

  async findOneUserRepository(email: string): Promise<User> {
    const pool = await connectDataBase();
    const result = await pool
      ?.request()
      .input("email", dbSql.VarChar, email)
      .query(query.findOne);

    return result?.recordset[0];
  }

  async createUserRepository(user: User): Promise<any> {
    const pool = await connectDataBase();
    await pool
      ?.request()
      .input("name", dbSql.VarChar, user.name)
      .input("email", dbSql.VarChar, user.email)
      .input("password", dbSql.VarChar, user.password)
      .input("image", dbSql.Text, user.image)
      .query(query.create);

    return { ...user };
  }

  async updateUserRepository(id: number, user: User) {
    const pool = await connectDataBase();
    await pool
      ?.request()
      .input("id", dbSql.Int, id)
      .input("name", dbSql.VarChar, user.name)
      .input("email", dbSql.VarChar, user.email)
      .input("password", dbSql.VarChar, user.password)
      .input("image", dbSql.Text, user.image)
      .input("updatedAt", dbSql.DateTime, new Date())
      .query(query.update);

    return { ...user };
  }

  async deleteUserRepository(id: number) {
    const pool = await connectDataBase();
    await pool?.request().input("id", dbSql.Int, id).query(query.delete);
  }
}
