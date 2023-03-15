const express = require('express');
const HomeController = require('../Controllers/Home.controller');

const router = express.Router();

router.get('/', HomeController.get);


module.exports = router;