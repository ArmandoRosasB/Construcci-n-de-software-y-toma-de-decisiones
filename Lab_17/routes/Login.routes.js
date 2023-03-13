const express = require('express');
const LoginController = require('../Controllers/Login.controller');

const router = express.Router();

router.get('/', LoginController.get);


module.exports = router;