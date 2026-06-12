const express = require('express');
const playersRouter = require('./routes/playersRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/v1/players', playersRouter);
app.use('/api/v1/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});