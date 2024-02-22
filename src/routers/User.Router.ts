import { userController } from "controllers/User.Controller";
import { Router } from "express";

const router = Router();

router.get("/users", userController.findUsersController);
router.get("/user/:id", userController.findUserByIdController);
router.post("/user/create", userController.createUserController);
router.put("/user/update/:id", userController.updateUserController);
router.delete("/user/delete/:id", userController.deleteUserController);

export default router;
