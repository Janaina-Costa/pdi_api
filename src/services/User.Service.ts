import { connectDataBase, dbSql } from "database/db";
import query from "database/db.query";
import { IUser } from "types/interfaces/user";
class UserService {
  public async findUsersService() {
    const pool = await connectDataBase();
    const result = await pool?.query(query.findAll);

    return result?.recordset;
  }

  public async findUserByIdService(id: number) {
    const pool = await connectDataBase();
    const result: any = await pool
      ?.request()
      .input("id", dbSql.Int, id)
      .query(query.findById);

    return result?.recordsets[0][0];
  }

  public async createUerService({ ...props }: IUser) {
    const pool = await connectDataBase();
    await pool
      ?.request()
      .input("name", dbSql.VarChar, props.name)
      .input("email", dbSql.VarChar, props.email)
      .input("password", dbSql.VarChar, props.password)
      .input("image", dbSql.Text, props.image)
      .query(query.create);

    return { ...props };
  }

  public async updateUserService(id: number, { ...props }: IUser) {
    const pool = await connectDataBase();
    await pool
      ?.request()
      .input("id", dbSql.Int, id)
      .input("name", dbSql.VarChar, props.name)
      .input("email", dbSql.VarChar, props.email)
      .input("password", dbSql.VarChar, props.password)
      .input("image", dbSql.Text, props.image)
      .input("updatedAt", dbSql.DateTime, new Date())
      .query(query.update);

    return { ...props };
  }

  public async deleteUserService(id: number) {
    const pool = await connectDataBase();
    await pool?.request().input("id", dbSql.Int, id).query(query.delete);
  }
}

export const userService = new UserService();
