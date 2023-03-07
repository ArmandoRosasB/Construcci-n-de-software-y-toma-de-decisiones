const { response } = require('express');
const { request } = require('http');
const path = require('path');
const Mensaje = require('../Models/Messages.models');

exports.listar = (request, response, next) => {
    response.render('Messages', {messages: Mensaje.fetchAll()});
}

exports.post = (request, response, next) => {
    const message = new Mensaje({
        name: request.body.fname,
        lname: request.body.lname,
        email: request.body.email,
        Planguage: request.body.Planguage,
        message: request.body.message,
    });
    message.save();
    response.redirect('/AboutMe/Portfolio');
}

exports.get = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'AboutMe.html'))};

