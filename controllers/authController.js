const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, process.env.SECRET_KEY);
}

class AuthController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'User with this login already exists' });
      }

      const hashPassword = bcrypt.hashSync(password, 8);
      const userRole = await Role.findOne({ role: 'USER' });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.role]
      });

      await user.save();
      return res.json({ message: 'Successfully registered' });

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Wrong password' });
      }

      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUser(req, res) {
    try {
      const _id = req.params.id;
      const user = await User.findOne({ _id }).select('-password');

      return res.json(user);

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Fetch user failed' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find().select('-password');
      res.json(users);

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Fetch users failed' });
    }
  }
}

module.exports = new AuthController();
