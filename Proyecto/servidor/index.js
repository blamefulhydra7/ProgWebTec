const express = require('express');
const cors = require('cors');
const conexion = require('./conexion');
const Articulos = require('./controladores/Articulos');
const Proveedores = require('./controladores/Proveedores');
const Clientes = require('./controladores/Clientes');
const Ventas = require('./controladores/Ventas');

const app = express();
app.use(cors());

const puerto = 3000;

app.listen(puerto, () => {
    console.log('Servicio iniciado');
});

conexion.connect((error) => {
    if (error)
        console.log('Conexión a DB fallida');
    else
        console.log('Conectado a la BD');
});

app.use(Articulos);
app.use(Proveedores);
app.use(Clientes);
app.use(Ventas);