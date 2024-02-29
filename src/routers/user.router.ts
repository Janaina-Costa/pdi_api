import { userController } from "controllers/User.Controller";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";
import {
  userValidationMiddleware,
  validateUserUpdateMiddleware,
} from "middlewares/user.validation.middleware";

const router = Router();

router.get("/users", userController.findUsersController);
router.get("/user/:id", authMiddleware, userController.findUserByIdController);
router.post(
  "/user",
  userValidationMiddleware,
  userController.createUserController,
);
router.put(
  "/user/update/:id",
  authMiddleware,
  validateUserUpdateMiddleware,
  userController.updateUserController,
);
router.delete(
  "/user/delete/:id",
  authMiddleware,
  userController.deleteUserController,
);

export default router;
