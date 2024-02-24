import { userController } from "controllers/User.Controller";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";
import { userValidationMiddleware } from "middlewares/user.validation.middleware";

const router = Router();

router.get("/users", authMiddleware, userController.findUsersController);
router.get("/user/:id", userController.findUserByIdController);
router.post(
  "/user/create",
  userValidationMiddleware,
  userController.createUserController,
);
router.put("/user/update/:id", userController.updateUserController);
router.delete("/user/delete/:id", userController.deleteUserController);

export default router;
