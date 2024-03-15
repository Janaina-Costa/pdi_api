import { userController } from "controllers/User.Controller";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";
import {
  userValidationMiddleware,
  validateUserUpdateMiddleware,
} from "middlewares/user.validation.middleware";

const router = Router();

router.get("/users", userController.findUsers);
router.get("/user/:id", authMiddleware, userController.findUserById);
router.post("/user", userValidationMiddleware, userController.createUser);
router.put(
  "/user/update/:id",
  authMiddleware,
  validateUserUpdateMiddleware,
  userController.updateUser,
);
router.delete("/user/delete/:id", authMiddleware, userController.deleteUser);

router.get("/count", userController.countUser);

export default router;
