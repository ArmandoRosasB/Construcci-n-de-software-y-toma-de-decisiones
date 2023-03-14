const express = require('express');
const StuffController = require('../Controllers/Stuff.controller');
const isAuth = require('./is-auth.js');

const router = express.Router();

router.get('/Games',isAuth, StuffController.getHome);

router.get('/Games/squaresNCubes',isAuth, StuffController.getSquaresNCubes);

router.get('/Games/mathChallenge',isAuth, StuffController.getMathChallenge);

router.get('/Games/codeChallenge',isAuth, StuffController.getCodeChallenge);

module.exports = router;