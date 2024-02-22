import sql from "mssql";
import dbConfig from "settings";

export const dbSql = sql;

export const connectDataBase = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Database connected");
    return pool;
  } catch (err) {
    console.log(err);
  }
};
