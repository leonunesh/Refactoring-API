const http = require('http');

let players = [
  { id: 1, name: 'Julie', team: 'Yellow' },
  { id: 2, name: 'Tom',   team: 'Green' },
];
let nextId = 3;

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise(resolve => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => resolve(JSON.parse(body || '{}')));
  });
}

function getIdFromUrl(url) {
  return parseInt(url.split('/').pop(), 10);
}

function getAllPlayers(res) {
  sendJSON(res, 200, players);
}

async function createPlayer(req, res) {
  const data = await parseBody(req);
  const player = { id: nextId++, name: data.name, team: data.team };
  players.push(player);
  sendJSON(res, 201, player);
}

function getPlayer(url, res) {
  const player = players.find(p => p.id === getIdFromUrl(url));
  if (!player) return sendJSON(res, 404, { error: 'Player not found' });
  sendJSON(res, 200, player);
}

async function updatePlayer(url, req, res) {
  const index = players.findIndex(p => p.id === getIdFromUrl(url));
  if (index === -1) return sendJSON(res, 404, { error: 'Player not found' });
  const data = await parseBody(req);
  players[index] = { id: players[index].id, name: data.name, team: data.team };
  sendJSON(res, 200, players[index]);
}

function deletePlayer(url, res) {
  const index = players.findIndex(p => p.id === getIdFromUrl(url));
  if (index === -1) return sendJSON(res, 404, { error: 'Player not found' });
  players.splice(index, 1);
  sendJSON(res, 200, { message: 'Player deleted' });
}

const PLAYERS_BASE = '/api/v1/players';

async function router(req, res) {
  const { method, url } = req;
  const isCollection = url === PLAYERS_BASE || url === `${PLAYERS_BASE}/`;
  const isItem       = !isCollection && url.startsWith(`${PLAYERS_BASE}/`);

  if (method === 'GET'    && isCollection) return getAllPlayers(res);
  if (method === 'POST'   && isCollection) return createPlayer(req, res);
  if (method === 'GET'    && isItem)       return getPlayer(url, res);
  if (method === 'PUT'    && isItem)       return updatePlayer(url, req, res);
  if (method === 'DELETE' && isItem)       return deletePlayer(url, res);

  sendJSON(res, 404, { error: 'Not found' });
}

const server = http.createServer((req, res) => {
  router(req, res).catch(err => {
    console.error(err);
    sendJSON(res, 500, { error: 'Internal server error' });
  });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));