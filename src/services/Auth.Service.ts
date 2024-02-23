import { connectDataBase, dbSql } from "database/db";
import query from "database/db.query";
import jwt from "jsonwebtoken";
import { IUser } from "types/interfaces/user";

export class UserAuthenticateService {
  public async loginService(email: string) {
    const pool = await connectDataBase();
    const result = await pool
      ?.request()
      .input("email", dbSql.VarChar, email)
      .query(query.findOne);

    return result?.recordset[0];
  }

  public async generateTokenService(id: any, secret: string) {
    return jwt.sign({ id }, secret, { expiresIn: "1d" });
  }
}

export const userAuthenticateService = new UserAuthenticateService();
