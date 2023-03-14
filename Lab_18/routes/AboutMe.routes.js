const express = require('express');
const AboutMeController = require('../Controllers/AboutMe.controller');
const isAuth = require('./is-Auth');

const router = express.Router();

router.get('/Portfolio',isAuth, AboutMeController.get);
router.get('/Messages',isAuth, AboutMeController.listar);
router.post('/Portfolio',isAuth, AboutMeController.post);


module.exports = router;