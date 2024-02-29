import "express-async-errors";
import { connectDataBase } from "database/db";
import express from "express";
import { serverConfig } from "settings";
import router from "./routers/router";
import cors from "cors";
import { errorMiddleware } from "middlewares/error.middleware";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
app.use(router);

connectDataBase();

app.use(errorMiddleware);

app.listen(serverConfig.port, () =>
  console.log(`Server is running on ${serverConfig.host}:${serverConfig.port}`),
);
