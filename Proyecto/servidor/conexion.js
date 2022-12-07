const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'pw',
    password: '',
    database: 'pw',
});

module.exports = conexion;