const express = require('express');
const { request } = require('http');
const path = require('path');

const router = express.Router();

router.get('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'LoginExample.html'));
});


module.exports = router;