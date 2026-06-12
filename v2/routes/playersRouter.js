const express = require('express');
const playersController = require('../controllers/playersController');

const router = express.Router();

router.get('/', playersController.getAllPlayers);
router.post('/', playersController.createPlayer);
router.get('/:id', playersController.getPlayerById);
router.put('/:id', playersController.updatePlayer);
router.delete('/:id', playersController.deletePlayer);

module.exports = router;
