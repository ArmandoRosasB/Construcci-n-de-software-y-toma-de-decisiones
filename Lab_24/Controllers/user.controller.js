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
                    Usuario.fetchPrivilegios(rows[0].nombre)
                    .then(([rows_privilegios, fieldData]) => {
                        const privilegios = [];
                        rows_privilegios.forEach(element =>{
                            privilegios.push(element.nombre);
                        });
                        request.session.privilegios = privilegios;
                        return request.session.save(err => {
                            response.redirect('/AboutMe/Portfolio');
                        });
                    })
                    .catch((error) => {console.log(error)});
                    
                } else{
                request.session.mensaje = 'Password and/or username incorrect';
                response.redirect('/user/login');
                }
            }).catch(err => {
                response.redirect('/user/login');
            });

            
        } else {
            request.session.mensaje = 'Password and/or username incorrect';
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

    usuario.save();
    usuario.addRol()
    .then(([rows, fieldData]) => {
        response.redirect('/user/login');
    }).catch((error) => {console.log(error)});
};

