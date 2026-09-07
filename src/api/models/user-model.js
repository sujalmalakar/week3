const users = [
  {
    user_id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 2,
    name: 'Jane Doe',
    username: 'janedoe',
    email: 'jane@metropolia.fi',
    role: 'user',
    password: 'password',
  },
];

const getUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.user_id == id);
};

const addUser = (user) => {
  users.push(user);
  return user;
};

export { getUsers, getUserById, addUser };
