const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',      
    user: 'root',           
    password: 'code45455',  
    database: 'gerenc_redes',
    waitForConnections: true,
    connectionLimit: 10,    
    queueLimit: 0
});

console.log('Conexão com MySQL configurada com sucesso!');

module.exports = pool;