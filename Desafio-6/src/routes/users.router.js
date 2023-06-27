import { Router } from "express";
import {
  createUserController,
  loginUserController,
  logoutUserController,
  githubResponseController,
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
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github-profile', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponseController);

export default router;
