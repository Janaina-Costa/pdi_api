import { Router } from "express";

import userRouter from "./User.Router";
import authRouter from "./Auth.Router";

const router = Router();

router.use("/", userRouter);
router.use("/", authRouter);

export default router;
