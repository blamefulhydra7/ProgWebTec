const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
app.use(cors());
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

/**
 * Artículos
 */
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

app.get('/api/articulos/:id', (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT a.*, p.nombre as "nombreProveedor" FROM Articulos as a ' + 
                   'inner join Proveedor as p on a.proveedorID = p.id where a.id = ?', [id], (error, results) => {
        if (error)
            throw error;
        else
            res.status(200).send(results[0]);
    })
})

app.post('/api/articulos', function (req, res) {
    const data = {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        proveedorid: req.body.proveedorid,
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

/**
 * Proveedores
 */
app.get('/api/proveedores', function (req, res) {
    conexion.query('SELECT * FROM Proveedor', [], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.get('/api/proveedores/:id', (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM Proveedor where id = ?', [id], (error, results) => {
        if (error)
            throw error;
        else
            res.status(200).send(results[0]);
    })
})

app.post('/api/proveedores', function (req, res) {
    const data = {
        nombre: req.body.nombre,
        rfc: req.body.rfc,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        observaciones: req.body.observaciones,
    };

    const sql = 'INSERT INTO Proveedor SET ?';

    conexion.query(sql, data, function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.put('/api/proveedores/:id', function (req, res) {
    const { id } = req.params;
    const { nombre, rfc, direccion, telefono, observaciones } = req.body;
    const sql = 'UPDATE Proveedor SET nombre = ?, rfc = ?, direccion = ?, telefono = ?, observaciones = ? WHERE id = ?';

    conexion.query(sql, [nombre, rfc, direccion, telefono, observaciones, id], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.delete('/api/proveedores/:id', function (req, res) {
    const { id } = req.params;

    conexion.query('DELETE FROM Proveedor WHERE id = ?', [id], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

/**
 * Clientes
 */
app.get('/api/clientes', function (req, res) {
    conexion.query('SELECT * FROM Clientes', [], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.get('/api/clientes/:id', (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM Clientes where id = ?', [id], (error, results) => {
        if (error)
            throw error;
        else
            res.status(200).send(results[0]);
    })
})

app.post('/api/clientes', function (req, res) {
    const data = {
        nombre: req.body.nombre,
        rfc: req.body.rfc,
        direccion: req.body.direccion,
    };

    const sql = 'INSERT INTO Clientes SET ?';

    conexion.query(sql, data, function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.put('/api/clientes/:id', function (req, res) {
    const { id } = req.params;
    const { nombre, rfc, direccion } = req.body;
    const sql = 'UPDATE Clientes SET nombre = ?, rfc = ?, direccion = ? WHERE id = ?';

    conexion.query(sql, [nombre, rfc, direccion, id], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.delete('/api/clientes/:id', function (req, res) {
    const { id } = req.params;

    conexion.query('DELETE FROM Clientes WHERE id = ?', [id], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

/**
 * Ventas
 */
app.get('/api/ventas', function (req, res) {
    conexion.query('SELECT v.*, a.descripcion, c.nombre FROM Venta as v ' + 
                   'inner join articulos as a on v.articuloID = a.id ' + 
                   'inner join clientes as c on v.clienteID = c.id', [], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.get('/api/ventas/:id', (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT v.*, a.descripcion, c.nombre FROM Venta as v ' + 
                   'inner join articulos as a on v.articuloID = a.id ' + 
                   'inner join clientes as c on v.clienteID = c.id ' +
                   'where v.id = ?', [id], (error, results) => {
        if (error)
            throw error;
        else
            res.status(200).send(results[0]);
    })
})

app.post('/api/ventas', function (req, res) {
    const data = {
        articuloID: req.body.articuloID,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        clienteID: req.body.clienteID,
    };

    const sql = 'INSERT INTO Venta SET ?';

    conexion.query(sql, data, function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.put('/api/ventas/:id', function (req, res) {
    const { id } = req.params;
    const { articulo, cantidad, precio, cliente } = req.body;
    const sql = 'UPDATE Venta SET articuloID = ?, cantidad = ?, precio = ?, clienteID = ? WHERE id = ?';

    conexion.query(sql, [articulo, cantidad, precio, cliente, id], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});

app.delete('/api/ventas/:id', function (req, res) {
    const { id } = req.params;

    conexion.query('DELETE FROM Venta WHERE id = ?', [id], function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.status(200).send(results);
        }
    });
});