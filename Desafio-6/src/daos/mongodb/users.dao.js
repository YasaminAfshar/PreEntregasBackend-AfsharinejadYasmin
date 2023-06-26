import { UserModel } from "./models/users.model.js";
import { createHash, isValidPassword } from '../.././path.js';
export default class UsersDao {
  async getUserByEmail(email) {
    try {
      const userExist = await UserModel.findOne({ email });
      if (!userExist) {
        return false;
      } else {
        return userExist;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id) {
    try {
      const userExist = await UserModel.findById(id);
      if (!userExist) {
        return false;
      } else {
        return userExist;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async createUser(user) {
    try {
      const { firstName, lastName, email, age, password } = user;
      const newUser = await UserModel.create({
        ...user,
        password: createHash(password),
      });
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(user) {
    try {
      const email = user.email;
      const password = user.password;
      const findUser = await UserModel.findOne({ email: email });

      if (findUser) {
        const passwordValidate = isValidPassword(password, findUser);
        if (!passwordValidate) return false;
        else return findUser;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
};