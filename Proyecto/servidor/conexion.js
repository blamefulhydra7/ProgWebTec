import { createConnection } from 'mysql';

const conexion = createConnection({
    host: 'localhost',
    user: 'pw',
    password: '',
    database: 'pw',
});

export default conexion;