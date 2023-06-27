import passport from "passport";
import UsersDao from "../daos/mongodb/users.dao.js";
import { Strategy as GithubStrategy } from "passport-github2";

const userDao = new UsersDao();
 
const strategyOptions = {
  clientID: "Iv1.a9d8186963539c2c",
  clientSecret: "2b2ea0f894cf7187702b2e47ce5ac8e590b355a9",
  callbackURL: "http://localhost:8080/users/github-profile",
};

const registerOrLogin = async (accesToken, refreshToken, profile, done) => {
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    let user = await userDao.getUserByEmail(email);
    //console.log("profile", profile);
     if (user) return done(null, user);
     const newUser = await userDao.createUser({
       firstName: profile._json.name?.split(" ")[0],
       lastName: profile._json.name?.split(" ")[1],
       email: email,
       password: " ",
       isGithub: true,
     });
     return done(null, newUser);
};

const githubStrategy = new GithubStrategy(strategyOptions, registerOrLogin);
passport.use("github", githubStrategy);
