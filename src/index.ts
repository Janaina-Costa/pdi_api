import { connectDataBase } from "database/db";
import express from "express";
import { serverConfig } from "settings";

const app = express();

app.get("/", (req, res) => res.status(200).json({ message: "App is running" }));

connectDataBase();

app.listen(serverConfig.port, () =>
  console.log(`Server is running on ${serverConfig.host}:${serverConfig.port}`),
);
