module.exports = (request, response, next) => {
    request.user ? next() : response.sendStatus(401);
}