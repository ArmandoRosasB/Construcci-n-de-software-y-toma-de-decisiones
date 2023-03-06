const express = require('express');
const { request } = require('http');
const path = require('path');

const router = express.Router();

router.get('/Games', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'Challenges.html'));
});

router.get('/Games/squaresNCubes', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'squaresNCubes.html'));
});

router.get('/Games/mathChallenge', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'mathChallenge.html'));
});

router.get('/Games/codeChallenge', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'codeChallenge.html'));
});

module.exports = router;