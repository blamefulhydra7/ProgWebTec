import conexion from '../conexion.js';

/**
 * Ventas
 */
export const getVentas = (req, res) => {
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
}

export const getVenta = (req, res) => {
    const { id } = req.params;
    
    conexion.query('SELECT v.*, a.descripcion, c.nombre FROM Venta as v ' +
        'inner join articulos as a on v.articuloID = a.id ' +
        'inner join clientes as c on v.clienteID = c.id ' +
        'where v.id = ?', [id], (error, results) => {
            if (error)
                res.status(501).send(error);
            else
                res.status(200).send(results[0]);
        });
}

export const createVenta = (req, res) => {
    const data = {
        articuloID: req.body.articuloID,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        clienteID: req.body.clienteID,
    };
    
    conexion.query('SELECT cantidad FROM articulos WHERE id = ?', [data.articuloID], function (error, results) {
        if (error)
            return res.status(501).send(error);
        else {
            if (parseInt(results[0].cantidad) < parseInt(data.cantidad)) {
                return res.status(400).send('No hay suficiente producto para la venta');
            }
            else {
                conexion.query('UPDATE articulos SET cantidad = ? WHERE id = ?', [parseInt(results[0].cantidad) - parseInt(data.cantidad), data.articuloID], function (error, results) {
                    if (error) {
                        return res.status(501).send(error);
                    }
                });
    
                conexion.query('INSERT INTO Venta SET ?', data, function (error, results) {
                    if (error) {
                        return res.status(501).send(error);
                    }
                    else {
                        return res.status(200).send(results);
                    }
                });
            }
        }
    });
}

export const updateVenta = (req, res) => {
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
}

export const deleteVenta = (req, res) => {
    const { id } = req.params;
    
    conexion.query('DELETE FROM Venta WHERE id = ?', [id], function (error, results) {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    });
}