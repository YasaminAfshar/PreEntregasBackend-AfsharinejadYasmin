import { UserModel } from "./models/users.model.js";

export default class UsersDao {
  async createUser(user) {
    try {
      const newUser = await UserModel.create(user);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  async loginUser(user) {
    try {
      const email = user.email;
      const password = user.password;
      const findUser = await UserModel.findOne({
        email: email,
        password: password,
      });
      if (!findUser) {
        return null;
      } else {
        return findUser;
      }
    } catch (error) {
      console.log(error);
    }
  }
};