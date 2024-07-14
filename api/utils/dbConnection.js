const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: process.env.dbPass,
    database: 'hungerEase',
});

module.exports = db;