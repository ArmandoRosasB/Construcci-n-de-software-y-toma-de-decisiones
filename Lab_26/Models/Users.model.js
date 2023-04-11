const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {

    constructor(nuevo_usuario) {
        this.id = nuevo_usuario.id || "johndoe";
        this.nombre = nuevo_usuario.nombre || 'John Doe';
        this.username = nuevo_usuario.username || 'johndoe';
    }

    save() {
        return db.execute(`
            INSERT INTO usuarios (id, nombre, username)
        values (?, ?, ?);
            
        `, [this.id, this.nombre, this.username]);
        
    }
    addRol() {

        return db.execute(`
            INSERT INTO usuario_rol (idUsuario, idRol) VALUES (?, ?)
            
        `, [this.id, '2']);

    }

    static fetchOne(id){
        return db.execute(`
            SELECT id, nombre, username
            FROM usuarios
            WHERE id = ?
        `, [id]);
    }

    static findById(id){
        return db.execute(`
            SELECT id, nombre, username
            FROM usuarios
            WHERE id = ?
        `, [id]);
    }

    static fetchPrivilegios(name) {
        console.log(name)
        return db.execute(`
        SELECT p.nombre
        FROM usuarios u, usuario_rol ur, roles r, rol_privilegio rp, privilegios p
        WHERE u.id = ur.idUsuario AND ur.idRol = r.id AND rp.idRol = r.id
        AND rp.idPrivilegio = p.id AND u.id = ?
        `, [name]);
    }

}