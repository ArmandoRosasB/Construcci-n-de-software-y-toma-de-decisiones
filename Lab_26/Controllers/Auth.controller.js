const path = require('path');
const Usuario = require('../Models/Users.model');
const bcrypt = require('bcryptjs');

exports.getlogin = (request, response, next) => {

    response.render('login')
};

exports.getGoogle = (request, response, next) => {
    response.send("Logging with google");
}