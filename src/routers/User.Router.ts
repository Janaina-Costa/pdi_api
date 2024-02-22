import { userController } from "controllers/User.Controller";
import { Router } from "express";

const router = Router();

router.get("/users", userController.findUsersController);
router.get("/user/:id");
router.post("/user/create", userController.createUserController);
router.put("/user/:id");
router.delete("/user/:id");

export default router;
