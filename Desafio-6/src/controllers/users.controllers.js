import UsersDao from "../daos/mongodb/users.dao.js";
const userDao = new UsersDao();


export const registerController = async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error);
  }
};
export const loginController = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    next(error);
  }
};
export const registerErrorController = async (req, res, next) => {
  try {
    res.render("registerError");
  } catch (error) {
    next(error);
  }
};
export const loginErrorController = async (req, res, next) => {
  try {
    res.render("loginError");
  } catch (error) {
    next(error);
  }
};
export const createUserController = async (req, res, next) => {
  try {
    const session = req.session;
    if (!session) {
      res.status(404).redirect("/views/register-error");
    } else {
      res.status(304).redirect("/views/login");
    }
  } catch (error) {
    next();
  }
};
export const loginUserController = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await userDao.loginUser(userData);
    if (!user) {
      res.status(404).redirect("/views/login-error");
    } else {
      const userId = await userDao.getUserById(req.session.passport.user);
      const { firstName, lastName, email, age, role } = userId;
      const userLogged = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };
      
      req.session.user = userLogged;
      console.log({message:"User logged in successfully!", session: req.session});
      res.redirect("/products");
    }
  } catch (error) {
    next(error);
  }
};
export const logoutUserController = async (req, res, next) => {
  try {
     req.session.destroy((err) => {
       if (err) {
         console.log(err);
       } else {
         res.redirect("/views/login");
         console.log("¡Logout successfuly!");
       }
     });
  } catch (error) {
    next(error);
  }
};

export const githubResponseController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, isGithub } = req.user;
    console.log({
      message: "Register with Github successfull!",
      session: req.session,
      userData: {
        firstName,
        lastName,
        email,
        role,
        isGithub
      },
    });
    res.redirect("/products");
  } catch (error) {
    next(error);
  }
};
