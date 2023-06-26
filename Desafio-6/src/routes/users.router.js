import { Router } from "express";
import {
  createUserController,
  loginUserController,
  logoutUserController,
} from "../controllers/users.controllers.js";
import passport from "passport";
import {
  frontResponseRegister,
  frontResponseLogin,
} from ".././config/passport.config.js";

const router = Router();

router.post("/register", passport.authenticate("register", {frontResponseRegister}), createUserController);
router.post("/login",  passport.authenticate("login", {frontResponseLogin}), loginUserController);
router.post("/logout", logoutUserController);

export default router;
