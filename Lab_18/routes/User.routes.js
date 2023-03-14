const express = require('express');
const UserController = require('../Controllers/user.controller');

const router = express.Router();

router.get('/signin', UserController.getsignin);
router.post('/signin', UserController.post_signup )

router.get('/login', UserController.getlogin);
router.post('/login', UserController.postlogin);

module.exports = router;