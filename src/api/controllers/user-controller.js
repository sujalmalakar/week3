import bcrypt from 'bcrypt';
import {
  getUsers,
  getUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getAllUsers = async (req, res) => {
  const users = await getUsers();
  res.json(users);
};

const getOneUser = async (req, res) => {
  const user = await getUserById(req.params.id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(user);
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const user = await addUser(req.body);

  if (!user) {
    res.status(500).json({ message: 'Could not add user' });
    return;
  }

  res.status(201).json(user);
};

const putUser = async (req, res) => {
  if (res.locals.user.role !== 'admin') {
    delete req.body.role;
  }
  const result = await modifyUser(
    req.body,
    req.params.id,
    res.locals.user.user_id,
    res.locals.user.role,
  );

  if (!result) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(result);
};

const deleteUser = async (req, res) => {
  const result = await removeUser(
    req.params.id,
    res.locals.user.user_id,
    res.locals.user.role,
  );

  if (!result) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(result);
};

export { getAllUsers, getOneUser, postUser, putUser, deleteUser };
