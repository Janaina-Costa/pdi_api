import { Router } from "express";

import userRouter from "./user.router";
import authRouter from "./auth.router";

const router = Router();

router.use("/", userRouter);
router.use("/", authRouter);

export default router;
