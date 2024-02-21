import sql from "mssql";
import dbConfig from "settings";

export const connectDataBase = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Database connected");
    return {
      pool,
      close: () => pool.close(),
    };
  } catch (err) {
    console.log(err);
  }
};
