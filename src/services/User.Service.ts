import { connectDataBase, dbSql } from "database/db";
import query from "database/db.query";
import { IUser } from "types/interfaces/user";
class UserService {
  public async findUsersService() {
    const pool = await connectDataBase();
    const result = await pool?.query(query.findAll);
    return result?.recordset;
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
}

export const userService = new UserService();
