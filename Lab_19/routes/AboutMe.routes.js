const express = require('express');
const AboutMeController = require('../Controllers/AboutMe.controller');
const hasMessages = require('../util/has-messages');

const router = express.Router();

router.get('/Portfolio', AboutMeController.get);
router.get('/Messages', hasMessages, AboutMeController.listar);
router.post('/Portfolio', AboutMeController.post);


module.exports = router;