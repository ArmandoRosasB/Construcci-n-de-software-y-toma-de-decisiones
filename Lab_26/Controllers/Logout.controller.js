const path = require('path');

exports.logout = (request, response, next) => {
    // handle with passport
    request.session.destroy(() => {
        console.log("Expiro la sesion");
        response.redirect('/Home'); //Este código se ejecuta cuando la sesión se elimina.
    });
};