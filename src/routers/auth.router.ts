import { Router } from "express";
import { authUserController } from "../controllers/auth.controller";

const router = Router();

router.post("/login", authUserController.loginUserController);

export default router;
