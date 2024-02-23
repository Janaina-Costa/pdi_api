import { Router } from "express";
import { authUserController } from "../controllers/Auth.Controller";

const router = Router();

router.post("/login", authUserController.loginUserController);

export default router;
