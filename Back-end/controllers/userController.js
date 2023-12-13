import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createToken = (id) => {
  return jwt.sign({ id }, 'alisaghir1', { expiresIn: '10d' });
};

class usersController {
  //create user
  static async createUser(req, res) {
    try {
      const { username, password } = req.body;
      if (!password) {
        return res.status(403).json('password required');
      }
      if (!username) {
        return res.status(403).json('username required');
      }
      const newUser = await User.create({
        username,
        password,
      });
      if (!newUser) {
        return res.status(500).json('error creating user');
      }
      const token = createToken(newUser.id);
      return res.status(201).json({ newUser, token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //login user
  static async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(500).json('username and password required');
      }
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json('username not found');
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json('password dont match ');
      }
      const token = createToken(user.id);
      return res
        .status(200)
        .json({
          username,
          userType: user.userType,
          token,
          balance: user.balance,
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      if (users.length === 0) {
        return res.status(404).json('there are no available users');
      }
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //update a use by id
  static async updateUser(req, res) {
    try {
      const [updatedUser] = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!updatedUser) {
        return res.status(404).json('please enter the fields you want to edit');
      }
      const user = await User.findByPk(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //delete a user
  static async deleteUser(req, res) {
    try {
      const deleteduser = await User.findByPk(req.params.id);
      if (!deleteduser) {
        return res.status(404).json('the user was not found');
      }

      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({ deleteduser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //find user by id
  static async findUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json('user not found');
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default usersController;
