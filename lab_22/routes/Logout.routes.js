const express = require('express');
const LogoutController = require('../Controllers/Logout.controller');

const router = express.Router();

router.get('/', LogoutController.logout);



module.exports = router;