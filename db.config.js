const mysql = require("mysql2");
// exports.pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "db_test_04",
//     port: 3306,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

exports.pool = mysql.createPool({
    host: "118.102.2.130",
    user: "db_team_04",
    database: "db_team_04",
    port: 33306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// exports.pool = mysql.createPool({
//     host: "118.102.2.130",
//     user: "db_team_04",
//     database: "db_team_04",
//     port: 33306,
//     waitForConnections: true,
//     password: "F4u!o3LNI6DC",
//     connectionLimit: 40,
//     queueLimit: 0,
//     enableKeepAlive: true,
// });