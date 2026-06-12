let users = [
  { id: 1, name: 'James', email: 'james@example.com' },
  { id: 2, name: 'Alexia', email: 'alexia@example.com' }
];
let nextId = 3;

exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
};

exports.getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

exports.updateUser = (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { name, email } = req.body;
  users[index] = { id: parseInt(req.params.id), name, email };
  res.status(200).json(users[index]);
};

exports.deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(index, 1);
  res.status(200).json({ message: 'User deleted' });
};
