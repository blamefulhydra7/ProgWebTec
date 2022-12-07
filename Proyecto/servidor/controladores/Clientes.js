const {Router} = require('express');
const conexion = require('../conexion');
const router = Router();

/**
 * Clientes
 */
 router.get('/api/clientes', function (req, res) {
    conexion.query('SELECT * FROM Clientes', [], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.get('/api/clientes/:id', (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM Clientes where id = ?', [id], (error, results) => {
        if (error)
            res.status(501).send(error);
        else
            res.status(200).send(results[0]);
    })
})

router.post('/api/clientes', function (req, res) {
    const data = {
        nombre: req.body.nombre,
        rfc: req.body.rfc,
        direccion: req.body.direccion,
    };

    const sql = 'INSERT INTO Clientes SET ?';

    conexion.query(sql, data, function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.put('/api/clientes/:id', function (req, res) {
    const { id } = req.params;
    const { nombre, rfc, direccion } = req.body;
    const sql = 'UPDATE Clientes SET nombre = ?, rfc = ?, direccion = ? WHERE id = ?';

    conexion.query(sql, [nombre, rfc, direccion, id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.delete('/api/clientes/:id', function (req, res) {
    const { id } = req.params;

    conexion.query('DELETE FROM Clientes WHERE id = ?', [id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
});

module.exports = router;