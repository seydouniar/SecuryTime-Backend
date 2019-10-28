const mysql = require("mysql");

function getConnection() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "niare",
        database: "security_db"
    });
    return connection;
}

module.exports= getConnection();