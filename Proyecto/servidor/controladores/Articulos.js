const app = require('express');
const conexion = require('../conexion');
const router = app();

/**
 * Artículos
 */
router.get('/api/articulos', function (req, res) {
    conexion.query('SELECT * FROM Articulos', [], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.get('/api/articulos/:id', (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT a.*, p.nombre as "nombreProveedor" FROM Articulos as a ' +
        'inner join Proveedor as p on a.proveedorID = p.id where a.id = ?', [id], (error, results) => {
            if (error)
                res.status(501).send(error);
            else
                res.status(200).send(results[0]);
        })
})

router.post('/api/articulos', function (req, res) {
    const data = {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        proveedorid: req.body.proveedorid,
    };

    const sql = 'INSERT INTO Articulos SET ?';

    conexion.query(sql, data, function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.put('/api/articulos/:id', function (req, res) {
    const { id } = req.params;
    const { descripcion, precio, cantidad } = req.body;
    const sql = 'UPDATE Articulos SET descripcion = ?, precio = ?, cantidad = ? WHERE id = ?';

    conexion.query(sql, [descripcion, precio, cantidad, id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.delete('/api/articulos/:id', function (req, res) {
    const { id } = req.params;

    conexion.query('DELETE FROM Articulos WHERE id = ?', [id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

module.exports = router;