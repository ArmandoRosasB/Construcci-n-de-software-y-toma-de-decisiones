const express = require('express');
const UserController = require('../Controllers/user.controller');

const router = express.Router();

router.get('/login', UserController.getlogin);
router.post('/login', UserController.postlogin);

module.exports = router;