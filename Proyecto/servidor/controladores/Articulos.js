import conexion from '../conexion.js';

/**
 * Artículos
 */

export const getArticulos = (req, res) => {
    conexion.query('SELECT * FROM Articulos', [], (error, results) => {
        if (error) {
            return res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
}

export const getArticulo = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT a.*, p.nombre as "nombreProveedor" FROM Articulos as a ' +
        'inner join Proveedor as p on a.proveedorID = p.id where a.id = ?', [id], (error, results) => {
            if (error)
                res.status(501).send(error);
            else
                res.status(200).send(results[0]);
        });
}

export const createArticulo = (req, res) => {
    const data = {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: 0,
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
}

export const updateArticulo = (req, res) => {
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
}

export const compraArticulo = (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;

    return conexion.query('SELECT cantidad FROM articulos WHERE id = ?', [id], function (error, results) {
        if (!error) {
            conexion.query('UPDATE articulos SET cantidad = ? WHERE id = ?', [parseInt(results[0].cantidad) + parseInt(cantidad), id], function (error, result) {
                if (!error) {
                    return res.sendStatus(200);
                }
                return res.sendStatus(501);
            });
        }
        else
            return res.sendStatus(501);
    });
}

export const deleteArticulo = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM Articulos WHERE id = ?', [id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
}