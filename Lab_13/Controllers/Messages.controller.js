const Mensajes = require('../Models/Messages.models')

exports.get = (request, response, next) => {
    response.render('Messages', {array: Mensajes.fetchAll()});
}