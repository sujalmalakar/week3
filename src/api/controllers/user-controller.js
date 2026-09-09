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

const getOneUser = async (req, res, next) => {
  const user = await getUserById(req.params.id);

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }

  res.json(user);
};

const postUser = async (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const user = await addUser(req.body);

  if (!user) {
    return next(new Error('Could not add user'));
  }

  res.status(201).json(user);
};

const putUser = async (req, res, next) => {
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
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }

  res.json(result);
};

const deleteUser = async (req, res, next) => {
  const result = await removeUser(
    req.params.id,
    res.locals.user.user_id,
    res.locals.user.role,
  );

  if (!result) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }

  res.json(result);
};

export { getAllUsers, getOneUser, postUser, putUser, deleteUser };
