const express = require('express');
const MessagesController = require('../Controllers/Messages.controller');

const router = express.Router();


router.get('/Messages', MessagesController.get);


module.exports = router;