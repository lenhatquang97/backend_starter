const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
const http=require("http");
const {connection} = require("./db.config");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const corsOptions = {
    origin: "*"
};

connection.promise().connect().then(() => {
    console.log("Connected to MySQL server!");
}).catch(err => {
    console.error("Error connecting to the database", err);
    process.exit();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    console.log('a user connected');
  });

require("./src/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});