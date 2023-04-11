const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {

    constructor(nuevo_usuario) {
        this.nombre = nuevo_usuario.nombre || 'John Doe';
        this.username = nuevo_usuario.username || 'johndoe';
        this.password = nuevo_usuario.password || 'johndoejohndoe';
    }

    save() {
        return bcrypt.hash(this.password, 12)
        .then((password_cifrado) => {
            return db.execute(`
                INSERT INTO usuarios (nombre, username, password)
            values (?, ?, ?);
                
            `, [this.nombre, this.username, password_cifrado]);
        })
        .catch((error) => {console.log(error)});
    }
    addRol() {

        return db.execute(`
            INSERT INTO usuario_rol (idUsuario, idRol) VALUES (?, ?)
            
        `, [this.username, '2']);

    }

    static fetchOne(username){
        return db.execute(`
            SELECT nombre, password 
            FROM usuarios
            WHERE username = ?
        `, [username]);
    }

    static fetchPrivilegios(name) {
        return db.execute(`
        SELECT p.nombre
        FROM usuarios u, usuario_rol ur, roles r, rol_privilegio rp, privilegios p
        WHERE u.username = ur.idUsuario AND ur.idRol = r.id AND rp.idRol = r.id
        AND rp.idPrivilegio = p.id AND u.nombre = ?
        `, [name]);
    }

}