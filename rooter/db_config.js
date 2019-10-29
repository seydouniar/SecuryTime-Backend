const mysql = require("mysql");

function getConnection() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "security_db"
    });
    return connection;
}

module.exports= getConnection();