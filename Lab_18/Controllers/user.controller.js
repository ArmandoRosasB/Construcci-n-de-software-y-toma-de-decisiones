const path = require('path');
const Usuario = require('../Models/Users.model');
const bcrypt = require('bcryptjs');

exports.getlogin = (request, response, next) => {
    const mensaje = request.session.mensaje || '';
    if(request.session.mensaje){
        request.session.mensaje = '';
    }
    response.render('login', {
        mensaje: mensaje,
    })
};

exports.postlogin = (request, response, next) =>{
    Usuario.fetchOne(request.body.username)
    .then(([rows, fieldData]) => {
        if(rows.length == 1){
            bcrypt.compare(request.body.password, rows[0].password)
            .then(doMatch => {
                if (doMatch) {
                    request.session.isLoggedIn = true;
                    request.session.nombre = rows[0].nombre;
                    return request.session.save(err => {
                        response.redirect('/AboutMe/Portfolio');
                    });
                }
                request.session.mensaje = 'Password and/or username incorrect';
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
    response.render('SignIn',{
    });
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

