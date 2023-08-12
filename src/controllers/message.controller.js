const {getUserId} = require("../validators/validators");
const authen=require("./authen.controller");
const booking=require("./booking.controller");
const {connection} = require("../../db.config");

exports.handleEvent = async (req) => {
    // return user id to test userId
    const {token, conversationId, type, content}=req;
    const user=authen.verify(token);
    if(user==null){
        return {
            error_code: -1,
            message: "decode token fail",
            data: null
        };
    }
    const replyTo=booking.getReplyTo(conversationId, user);
    const insertQuery="INSERT INTO message (id, sender, content, replyTo, createdAt, type) VALUES (0, "+user+", "+content+", "+replyTo+", "+Date.now()+", "+type+")";
    console.log(insertQuery);
        connection.query(insertQuery, function(err, result, fields) {
            if (err) {
                // handle error
                console.log(err);
                return {
                    error_code: -1,
                    message: "Error when putting message",
                    data: null
                };
            }else{
                 // Your row is inserted you can view  
                console.log(result.insertId);
                var apiMessage={
                    error_code: 0,
                    message: "Success",
                    data: {
                        conversationId: conversationId,
                        id: result["id"], 
                        content: content,
                        createdAt: result["createdAt"], 
                        type: type
                    }
                };
                return apiMessage;
            }
        });
        
        
    
};