const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('dotenv').config({path: 'variables.env'})

//helpers con algunas funciones 
const helpers = require('./helpers');

// crear la conexion a la BD
const db = require('./config/db');

// Importar el modelo 
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
    .then(() => console.log('Conectao al Servidor'))
    .catch(error => console.log(error));

//crear una app de express
const app = express();





//Donde cargar los archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug');

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});


// habilitar bodyParser para leer datos del formulario 

app.use(bodyParser.urlencoded({ extended: false }));



app.use('/', routes());



// Servidor y Puerto 
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});

