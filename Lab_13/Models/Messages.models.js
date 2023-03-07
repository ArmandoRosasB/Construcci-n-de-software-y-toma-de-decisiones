const messages = [];

module.exports = class Perro {
    constructor(message) {
        this.fname = message.name || 'Anonimo';
        this.lname = message.lname || 'Anonimo';
        this.email = message.email || 'anonimo@gmail.com';
        this.Planguage= message.Planguage || 'C';
        this.message = message.message || 'Hola, este es un mensaje default';
    }

    save(){
        messages.push(this);
    }

    static fetchAll(){
        return messages;
    }
}