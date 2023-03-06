const express = require('express');
const bodyParser = require('body-parser');
const path = require('path') // The Path module provides a way of working with directories and file paths.

const port = 3000;
const app = express(); // Start server

// app.use() Loads a function to be used as middleware
app.use(express.static(path.join(__dirname, 'public'))); // Access to all files in public directory
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

//Middlewares
const rutasAboutMe = require('./routes/AboutMe.routes');
app.use('/AboutMe', rutasAboutMe.router);

const stuff = require('./routes/Stuff.routes');
app.use('/Stuff', stuff);

const login = require('./routes/Login.routes');
app.use('/login', login);

const friends = require('./routes/Messages.routes');
app.use('/Friends', friends);


app.use((request, response, next) => {
    response.status(404).send("<h1>Esta pagina no existe</h1>");
});

app.listen(port);
console.log(`The server is listening on port: ${port}`);