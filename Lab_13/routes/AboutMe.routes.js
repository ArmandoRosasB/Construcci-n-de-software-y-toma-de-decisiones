const express = require('express');
const AboutMeController = require('../Controllers/AboutMe.controller');

const router = express.Router();

router.get('/Portfolio', AboutMeController.get);
router.post('/Portfolio', AboutMeController.post);


module.exports = router;