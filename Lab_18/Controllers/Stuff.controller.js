const path = require('path')

exports.getHome = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'Challenges.html'));
};
exports.getSquaresNCubes = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'squaresNCubes.html'));
};
exports.getMathChallenge = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'mathChallenge.html'));
};
exports.getCodeChallenge = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'codeChallenge.html'));
};
