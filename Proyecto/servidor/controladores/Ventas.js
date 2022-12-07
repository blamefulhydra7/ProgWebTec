const {Router} = require('express');
const conexion = require('../conexion');
const router = Router();

/**
 * Ventas
 */
 router.get('/api/ventas', function (req, res) {
    conexion.query('SELECT v.*, a.descripcion, c.nombre FROM Venta as v ' + 
                   'inner join articulos as a on v.articuloID = a.id ' + 
                   'inner join clientes as c on v.clienteID = c.id', [], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.get('/api/ventas/:id', (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT v.*, a.descripcion, c.nombre FROM Venta as v ' + 
                   'inner join articulos as a on v.articuloID = a.id ' + 
                   'inner join clientes as c on v.clienteID = c.id ' +
                   'where v.id = ?', [id], (error, results) => {
        if (error)
            res.status(501).send(error);
        else
            res.status(200).send(results[0]);
    })
})

router.post('/api/ventas', function (req, res) {
    const data = {
        articuloID: req.body.articuloID,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        clienteID: req.body.clienteID,
    };

    const sql = 'INSERT INTO Venta SET ?';

    conexion.query(sql, data, function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.put('/api/ventas/:id', function (req, res) {
    const { id } = req.params;
    const { articulo, cantidad, precio, cliente } = req.body;
    const sql = 'UPDATE Venta SET articuloID = ?, cantidad = ?, precio = ?, clienteID = ? WHERE id = ?';

    conexion.query(sql, [articulo, cantidad, precio, cliente, id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.delete('/api/ventas/:id', function (req, res) {
    const { id } = req.params;

    conexion.query('DELETE FROM Venta WHERE id = ?', [id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

module.exports = router;