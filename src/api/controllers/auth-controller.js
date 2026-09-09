import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { getUserByUsername } from '../models/user-model.js';

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );

  res.json({
    message: 'Login successful',
    token,
  });
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);

  if (res.locals.user) {
    res.json({
      message: 'token ok',
      user: res.locals.user,
    });
  } else {
    res.sendStatus(401);
  }
};

export { login, getMe };
