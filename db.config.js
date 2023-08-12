const mysql = require("mysql2");
exports.connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "db_test_04",
});
//
// exports.connection = mysql.createConnection({
//     host: "118.102.2.130",
//     user: "db_team_04",
//     database: "db_team_04",
//     password: "F4u!o3LNI6DC",
//     port: 33306
// });