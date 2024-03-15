import { Router } from "express";
import { authUserController } from "../controllers/Auth.Controller";
import { validateLoginMiddleware } from "middlewares/user.validation.middleware";

const router = Router();

router.post("/login", validateLoginMiddleware, authUserController.loginUser);

export default router;
