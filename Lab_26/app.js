const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // The Path module provides a way of working with directories and file paths.
const session = require('express-session');
const multer = require('multer');
const isAuth = require('./util/is-Auth');
const csrf = require('csurf'); // Protege nuestras peticiones POST
const cookieSession = require("cookie-session");
const keys = require("./config/keys")
const passport = require("passport")
const passportSetup = require("./config/passport-setup");

//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos 
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().getMilliseconds() + '-' + file.originalname);
    },
});

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
app.use(bodyParser.json());

app.use(multer({ storage: fileStorage }).single('archivo')); 

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(passport.initialize());
app.use(passport.session());

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Middlewares
const AboutMe = require('./routes/AboutMe.routes');
app.use('/AboutMe', isAuth,AboutMe);

const stuff = require('./routes/Stuff.routes');
app.use('/Stuff',isAuth, stuff);

const auth = require('./routes/Auth.routes');
app.use('/auth', auth);


const home = require('./routes/Home.routes');
app.use('/Home', home);

const logout = require('./routes/Logout.routes');
app.use('/Logout', logout);

app.use((request, response, next) => {
    response.status(404).send("<h1>Esta pagina no existe</h1>");
});

app.listen(port);
console.log(`The server is listening on port: ${port}`);