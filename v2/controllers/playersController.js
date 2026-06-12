let players = [
  { id: 1, name: 'Julie', team: 'Yellow' },
  { id: 2, name: 'Tom', team: 'Green' },
];
let nextId = 3;

exports.getAllPlayers = (req, res) => {
  res.status(200).json(players);
};

exports.createPlayer = (req, res) => {
  const { name, team } = req.body;
  const player = { id: nextId++, name, team };
  players.push(player);
  res.status(201).json(player);
};

exports.getPlayerById = (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (!player) {
    return res.status(404).json({ error: 'Player not found' });
  }
  res.status(200).json(player);
};

exports.updatePlayer = (req, res) => {
  const index = players.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Player not found' });
  }
  const { name, team } = req.body;
  players[index] = { id: parseInt(req.params.id), name, team };
  res.status(200).json(players[index]);
};

exports.deletePlayer = (req, res) => {
  const index = players.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Player not found' });
  }
  players.splice(index, 1);
  res.status(200).json({ message: 'Player deleted' });
};
