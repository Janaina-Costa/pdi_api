import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_SERVER,
} = process.env;

export const SECRET_KEY = process.env.SECRET_KEY || "";

export const serverConfig = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
};
const sqlEncrypt = process.env.ENCRYPT === "true";

const dbConfig = {
  server: SQL_SERVER || "localhost",
  database: SQL_DATABASE || "",
  user: SQL_USER || "",
  password: SQL_PASSWORD || "",
  options: {
    encrypt: sqlEncrypt,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

export default dbConfig;
