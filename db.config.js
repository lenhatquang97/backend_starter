const mysql = require("mysql2");
exports.connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "db_test_04"
});