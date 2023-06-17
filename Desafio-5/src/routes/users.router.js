import { Router } from "express";
import {
  createUserController,
  loginUserController,
  logoutUserController,
} from "../controllers/users.controllers.js";


const router = Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.get("/logout", logoutUserController);

export default router;
