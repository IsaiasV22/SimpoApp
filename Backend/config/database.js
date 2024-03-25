const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    charset: 'utf8',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => { 
    if(err){
        console.error('Error al conectar a la base de datos: ' + err.message);
        throw err;
    }
    console.log('Conectado a la base de datos');
 });

    module.exports = connection;
