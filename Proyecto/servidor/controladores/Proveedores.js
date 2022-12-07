const {Router} = require('express');
const conexion = require('../conexion');
const router = Router();

/**
 * Proveedores
 */
 router.get('/api/proveedores', function (req, res) {
    conexion.query('SELECT * FROM Proveedor', [], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.get('/api/proveedores/:id', (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM Proveedor where id = ?', [id], (error, results) => {
        if (error)
            res.status(501).send(error);
        else
            res.status(200).send(results[0]);
    })
})

router.post('/api/proveedores', function (req, res) {
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
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.put('/api/proveedores/:id', function (req, res) {
    const { id } = req.params;
    const { nombre, rfc, direccion, telefono, observaciones } = req.body;
    const sql = 'UPDATE Proveedor SET nombre = ?, rfc = ?, direccion = ?, telefono = ?, observaciones = ? WHERE id = ?';

    conexion.query(sql, [nombre, rfc, direccion, telefono, observaciones, id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.delete('/api/proveedores/:id', function (req, res) {
    const { id } = req.params;

    conexion.query('DELETE FROM Proveedor WHERE id = ?', [id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

module.exports = router;