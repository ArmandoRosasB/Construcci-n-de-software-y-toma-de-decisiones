module.exports = (request, response, next) => {
    if (request.session.privilegios.indexOf('Ver mensajes') === -1) {
        return response.redirect('/AboutMe/Portfolio');
    }
    next();
}