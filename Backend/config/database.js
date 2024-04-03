const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: 'utf8',
    connectTimeout: 30000,
    acquireTimeout: 30000,
};

const connection = mysql.createConnection(dbConfig);

function handleDisconnect() {
    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos: ' + err.message);
            setTimeout(handleDisconnect, 2000); // Intentar reconectar después de 2 segundos
        }
        console.log('Conectado a la base de datos');
    });

    connection.on('error', (err) => {
        console.error('Error de base de datos: ' + err.message);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconectar en caso de conexión perdida
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;
