import { connectDataBase } from "database/db";
import express from "express";
import { serverConfig } from "settings";
import router from "./routers/router";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(router);
app.use(cors());
app.get("/", (req, res) => res.status(200).json({ message: "App is running" }));

connectDataBase();

app.listen(serverConfig.port, () =>
  console.log(`Server is running on ${serverConfig.host}:${serverConfig.port}`),
);
