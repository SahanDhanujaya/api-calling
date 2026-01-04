const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
});

db.connect((err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log("Database connected successfull!")
    }
})

module.exports = db;