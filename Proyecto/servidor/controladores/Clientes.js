import conexion from '../conexion.js';

/**
 * Clientes
 */
export const getClientes = (req, res) => {
    conexion.query('SELECT * FROM Clientes', [], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
}

export const getCliente = (req, res) => {
    const { id } = req.params;
    
    conexion.query('SELECT * FROM Clientes where id = ?', [id], (error, results) => {
        if (error)
            res.status(501).send(error);
        else
            res.status(200).send(results[0]);
    });
}

export const createCliente = (req, res) => {
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
}

export const updateCliente = (req, res) => {
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
}

export const deleteCliente = (req, res) => {
    const { id } = req.params;
    
    conexion.query('DELETE FROM Clientes WHERE id = ?', [id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
}