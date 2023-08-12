const {getUserId} = require("../validators/validators");
const authen=require("./authen.controller");
const booking=require("./booking.controller");
const {connection} = require("../../db.config");

exports.getAllMessageOfConversation=(req, res)=>{
    const user=getUserId(req, res);
    var {conversationId, offset, limit}=req.query;
    if (!conversationId){
        res.status(200).send({
            error_code: -1,
            message: "conservation is empty",
            data: null
        });
        return;
    }
    if(!conversationId.includes(user)){
        res.status(200).send({
            error_code: -2,
            message: "not enough permission",
            data: null
        });
        return;
    }
    if(!offset) offset=0;
    if(!limit) limit=10000;
    const query="SELECT * FROM message WHERE conversation_id=\""+conversationId+"\" LIMIT "+limit+" OFFSET "+offset;
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(200).send({
                error_code: -3,
                message: "Error when finding conversation's messages",
                data: null
            });
        } else {
            console.log(result);
            data=[];
            for (const m of result){
                item={
                    id: m["id"],
                    sender: m["sender"],
                    content: m["content"],
                    replyTo: null,
                    createdAt: m["createdAt"],
                    type: m["type"]
                };
                data.push(item);
            }
            res.status(200).send({
                error_code: 0,
                message: "Success",
                data: data
            });
        }
    });
}