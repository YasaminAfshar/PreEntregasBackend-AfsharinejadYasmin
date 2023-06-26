import passport from "passport";
import UsersDao from "../daos/mongodb/users.dao.js";
import { Strategy as LocalStrategy } from "passport-local";

const userDao = new UsersDao();

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const signup = async (req, email, password, done) => {
  try {
    const findUser = await userDao.getUserByEmail(email);
    if (findUser.length > 0) {
      return done(null, false);
    } else {
      const newUser = await userDao.createUser(req.body);
      if (!newUser) {
        return done(null, false);
      } else {
        return done(null, newUser);
      }
    }
  } catch (error) {
        console.log(error);
  }
};

const login = async (req, email, password, done) => {
  const user = { email, password };
  const userLogged = await userDao.loginUser(user);
  if (userLogged) {
    return done(null, userLogged);
  } else {
    return done(null, false);
  }
};

const signupStrategy = new LocalStrategy(strategyConfig, signup);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use("register", signupStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userDao.getUserById(id);
  return done(null, user);
});

export const frontResponseRegister = {
  failureRedirect: "/views/register-error",
  successRedirect: "/views/login",
  passReqToCallback: true,
};
export const frontResponseLogin = {
  failureRedirect: "/views/login-error",
  successRedirect: "/products",
  passReqToCallback: true,
};