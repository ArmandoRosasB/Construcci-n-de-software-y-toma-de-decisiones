const express = require('express');
const StuffController = require('../Controllers/Stuff.controller');

const router = express.Router();

router.get('/Games', StuffController.getHome);

router.get('/Games/squaresNCubes', StuffController.getSquaresNCubes);

router.get('/Games/mathChallenge', StuffController.getMathChallenge);

router.get('/Games/codeChallenge', StuffController.getCodeChallenge);

module.exports = router;