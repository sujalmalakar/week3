import { getUsers, getUserById, addUser } from '../models/user-model.js';

const getAllUsers = (req, res) => {
  res.json(getUsers());
};

const getOneUser = (req, res) => {
  const user = getUserById(req.params.id);
  res.json(user);
};

const postUser = (req, res) => {
  const user = addUser(req.body);
  res.json(user);
};

const putUser = (req, res) => {
  res.json({ message: 'User item updated.' });
};

const deleteUser = (req, res) => {
  res.json({ message: 'User item deleted.' });
};

export { getAllUsers, getOneUser, postUser, putUser, deleteUser };
