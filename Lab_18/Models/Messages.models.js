const db = require('../util/database');

const messages = [];

module.exports = class Mensaje {
    constructor(message) {
        this.fname = message.fname || 'Anonimo';
        this.lname = message.lname || 'Anonimo';
        this.email = message.email || 'anonimo@gmail.com';
        this.Planguage= message.Planguage || 'C';
        this.message = message.message || 'Hola, este es un mensaje default';
    }

    save(){
        return db.execute(`INSERT INTO mensaje (fname, lname, email, Planguage, message) VALUES
        (?, ?, ?, ?, ?)`, [this.fname, this.lname, this.email, this.Planguage, this.message]);
    }

    static fetchAll(){
        return db.execute(
            `SELECT fname, lname, email, Planguage, message FROM mensaje`
        );
    }
}