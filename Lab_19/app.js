const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // The Path module provides a way of working with directories and file paths.
const session = require('express-session');
const isAuth = require('./util/is-Auth');
const csrf = require('csurf'); // Protege nuestras peticiones POST



const port = 3000;
const app = express(); // Start server



app.use(session({
    secret: 'Creo que aqui tengo que poner un string complicado para poder hashear la sesion', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

// app.use() Loads a function to be used as middleware
app.use(express.static(path.join(__dirname, 'public'))); // Access to all files in public directory
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});
      

//Middlewares
const AboutMe = require('./routes/AboutMe.routes');
app.use('/AboutMe', isAuth,AboutMe);

const stuff = require('./routes/Stuff.routes');
app.use('/Stuff',isAuth, stuff);

const user = require('./routes/User.routes');
app.use('/user', user);


const home = require('./routes/Home.routes');
app.use('/Home', home);

const logout = require('./routes/Logout.routes');
app.use('/Logout', logout);

app.use((request, response, next) => {
    response.status(404).send("<h1>Esta pagina no existe</h1>");
});

app.listen(port);
console.log(`The server is listening on port: ${port}`);