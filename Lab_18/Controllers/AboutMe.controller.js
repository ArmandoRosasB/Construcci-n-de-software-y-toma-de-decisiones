const { response } = require('express');
const { request } = require('http');
const path = require('path');
const Mensaje = require('../Models/Messages.models');

exports.get = (request, response, next) => {
    const username = request.session.nombre || '';
    if(request.session.nombre){
        request.session.nombre = '';
    }
    response.render('AboutMe', {
        nombre: username,
    })}


exports.post = (request, response, next) => {
    const nuevo = new Mensaje({
        fname: request.body.fname,
        lname: request.body.lname,
        email: request.body.email,
        Planguage: request.body.Planguage,
        message: request.body.message,
    });
    nuevo.save().then(() => {
        let cookies = request.get('Cookie');
        let contador;

        request.session.alerta = "Mensaje registrado exitosamente";

        if (typeof cookies === 'string'){
            if (cookies.includes('consultas')){
                contador =  Number.parseInt(cookies.split(';')[1].trim().split('=')[1]);
            }
            else {
                contador = 0;
            }
        }
        
        contador++;

        request.session.email = nuevo.email;
        
        response.setHeader('Set-Cookie', [`ultimo_mensaje=${nuevo.fname}; HttpOnly`, `consultas=${contador}; HttpOnly`]);
        response.redirect('/AboutMe/Messages');
    }) .catch (err => console.log(err));

    
}

exports.listar = (request, response, next) => {
    let cookies = request.get('Cookie');
    let contador;
    let mensaje;

    let alerta = '';

    if (request.session.alerta) {
        alerta = request.session.alerta;
        request.session.alerta = '';
    }
    console.log(cookies);
    if (typeof cookies === 'string'){
        if (cookies.includes('consultas')){
            mensaje =  cookies.split(';')[0].split('=')[1];
            contador =  Number.parseInt(cookies.split(';')[1].trim().split('=')[1]);
            }
    } else {
        contador = 0;
        mensaje =  '';
        request.session.email = '';
    }
    
    Mensaje.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('Messages', {
            array: rows,
            ultimo_mensaje: mensaje,
            views: contador,
            email: request.session.email,
            alerta: alerta,
        });
    })

    .catch(err => {
        console.log(err);
    });
    
}


