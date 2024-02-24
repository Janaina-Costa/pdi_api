import { userController } from "controllers/user.controller";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";

const router = Router();

router.get("/users", authMiddleware, userController.findUsersController);
router.get("/user/:id", userController.findUserByIdController);
router.post("/user/create", userController.createUserController);
router.put("/user/update/:id", userController.updateUserController);
router.delete("/user/delete/:id", userController.deleteUserController);

export default router;
