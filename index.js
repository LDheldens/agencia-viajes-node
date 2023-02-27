// importa el módulo express y lo asigna a la variable express.
import express from 'express';

import router from './routes/index.js';

import db from './config/db.js';



//conectar la base de datos
db.authenticate()
    .then(()=>console.log('Base de datos conectada'))
    .catch(()=>console.log('Error al conectarse ala BD'))

// crea una instancia de la aplicación Express y la asigna a la variable app.
const app = express();

//definir el puerto
const port = process.env.PORT || 4000;

//habilitar pug
//set en ExpressJS es una función de middleware que se utiliza para procesar solicitudes HTTP. Se puede utilizar para ejecutar funciones middleware en todas las solicitudes HTTP entrantes antes de que se manejen las rutas específicas.
app.set('view engine', 'pug');

//obtener el año actual
app.use((request, response, next)=>{
    const year = new Date();
    response.locals.actualYear = year.getFullYear();
    response.locals.nombreSitio = 'Agencia de viajes'
    next();
})

//agregar body parcel para leer los datos del formulario
app.use(express.urlencoded({extended: true}))

//definir la carpeta pública
app.use(express.static('public'));

//agregar el router
app.use('/', router );

app.listen(port,()=>{
    console.log(`Se está ejecutando en el puerto ${port}`);
})