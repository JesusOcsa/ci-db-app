const express = require('express');
const mysql = require('mysql2');

const app = express();

function crearConexion() {
    return mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'isurdb'
    });
}

let connection;

function conectar() {
    connection = crearConexion();

    connection.connect((err) => {
        if (err) {
            console.log("Esperando base de datos...");
            setTimeout(conectar, 3000);
        } else {
            console.log("Conectado a MySQL");
        }
    });
}

conectar();

app.get('/', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.send("Error DB");
        res.send(results);
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});