const express = require("express");
const cors = require("cors");
const http=require("http");
const {connection} = require("./db.config");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const message=require("./src/controllers/message.controller");
const authen=require("./src/controllers/authen.controller");
const booking=require("./src/controllers/booking.controller");


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
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("message", async (msg)=>{
        console.log(msg);
        const {token, conversationId, type, content}=msg;
        const user=authen.verify(token);
        if(user==null){
            return;
        }
        const replyTo=booking.getReplyTo(conversationId, user);
        var createdAt=Date.now();
        const insertQuery="INSERT INTO message (id, sender, content, replyTo, createdAt, type, conversation_id) VALUES (0, "+user+", \""+content+"\", "+replyTo+", "+createdAt+", \""+type+"\", \""+conversationId+"\")";
        console.log(insertQuery);
            connection.query(insertQuery, function(err, result, fields) {
                if (err) {
                    // handle error
                    console.log(err);
                    return;
                }else{
                    // Your row is inserted you can view  
                    console.log(result.insertId);
                    data= {
                        conversationId: conversationId,
                        id: result.insertId, 
                        content: content,
                        createdAt: createdAt, 
                        type: type,
                        sender: user
                    };
                    console.log(data);
                    io.emit(user, data);
                    io.emit(replyTo, data);
                }
            });
        })
});

require("./src/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT);
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });