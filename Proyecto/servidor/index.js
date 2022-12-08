import express from 'express';
import cors from 'cors';
import conexion from './conexion.js';
import { Articulos, Clientes, Proveedores, Ventas } from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());

const puerto = 3000;

app.listen(puerto, () => {
    console.log('Servicio iniciado');
});

conexion.connect((error) => {
    if (error)
        console.log('Conexión a DB fallida');
    else
        console.log('Conectado a la DB');
});

app.use('/api/articulos', Articulos);
app.use('/api/proveedores', Proveedores);
app.use('/api/clientes', Clientes);
app.use('/api/ventas', Ventas);