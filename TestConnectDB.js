const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: "118.102.2.130",
//     user: "db_team_04",
//     database: "db_team_04",
//     password: "F4u!o3LNI6DC",
//     port: 33306
// });
//
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "db_team_04",
  port: 3306
});

connection.promise().query("SELECT * FROM Persons")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => connection.end());