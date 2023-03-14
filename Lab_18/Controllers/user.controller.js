const path = require('path');
const Usuario = require('../Models/Users.model');
const bcrypt = require('bcryptjs');

exports.getlogin = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'LoginExample.html'));
};

exports.postlogin = (request, response, next) =>{
    Usuario.fetchOne(request.body.username)
    .then(([rows, fieldData]) => {
        if(rows.length == 1){
            bcrypt.compare(request.body.password, rows[0].password)
            .then(doMatch => {
                if (doMatch) {
                    request.session.isLoggedIn = true;
                    request.session.user = request.body.username;
                    return request.session.save(err => {
                        response.redirect('/AboutMe/Portfolio');
                    });
                }
                response.redirect('/user/login');
            }).catch(err => {
                response.redirect('/user/login');
            });

            
        } else {
            response.redirect('/user/login');

        }
    })
    .catch((error) => {
        console.log(error);
    })
}


exports.getsignin = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'signIn.html'));
};

exports.post_signup = (request, response, next) => {
    const usuario = new Usuario({
        nombre: request.body.name,
        username: request.body.username,
        password: request.body.password,
    });

    usuario.save()
    .then(([rows, fieldData]) => {
        response.redirect('/user/login');
    }).catch((error) => {console.log(error)});
};

