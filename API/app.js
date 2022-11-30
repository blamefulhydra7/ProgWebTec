const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
app.use(express.json());

const puerto = 3000;

app.listen(puerto, () => {
    console.log('Servicio iniciado');
});

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'pw',
    password: '',
    database: 'pw',
});

conexion.connect((error) => {
    if (error)
        throw error;
    else
        console.log('Conectado a la BD');
})

app.get('/api/articulos', function (req, res) {
    conexion.query('SELECT * FROM Articulos', [], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.post('/api/articulos', function (req, res) {
    const data = {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
    };

    const sql = 'INSERT INTO Articulos SET ?';

    conexion.query(sql, data, function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.put('/api/articulos/:id', function (req, res) {
    const { id } = req.params;
    const { descripcion, precio, cantidad } = req.body;
    const sql = 'UPDATE Articulos SET descripcion = ?, precio = ?, cantidad = ? WHERE id = ?';

    conexion.query(sql, [descripcion, precio, cantidad, id], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.delete('/api/articulos/:id', function (req, res) {
    const { id } = req.params;

    conexion.query('DELETE FROM Articulos WHERE id = ?', [id], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});