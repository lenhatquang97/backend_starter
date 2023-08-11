const {getUserId} = require("../validators/validators");
const {connection} = require("../../db.config");

exports.book = (req, res) => {
    var apiMessage;
    try{
        const userId=getUserId(req, res);
        const startTime=req.body["start_time"];
        const endTime=req.body["end_time"];
        const storeId=req.body["store_id"];
        const curTime=Date.now();
        const query="SELECT * FROM booking WHERE user_id!="+userId+" AND is_cancel=false AND is_match=false AND store_id="+storeId+" AND ((start_time>="+startTime+" AND start_time<="+endTime+") OR ("+startTime+">=start_time AND "+startTime+"<=end_time)) AND end_time>"+curTime;
        console.log("query="+query);
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(200).send({
                    error_code: -1,
                    message: "Error when finding matching user",
                    data: null
                });
            } else {
                if (result.length==0){
                    // find no matching
                    const insertQuery="INSERT INTO booking (booking_id, user_id, store_id, start_time, end_time, is_cancel, is_match) VALUES (0, "+userId+", "+storeId+", "+startTime+", "+endTime+", false, false)";
                    connection.query(insertQuery, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(200).send({
                                error_code: -1,
                                message: "Error when putting booking",
                                data: null
                            });
                            return;
                        } 
                    });
                    res.status(200).send({
                        error_code: 0,
                        message: "Success",
                        data: null
                    });
                }
                else{
                    const match=res[0];
                    const alterQuery="UPDATE booking SET is_match=true WHERE booking_id="+match["booking_id"];
                    connection.query(alterQuery, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(200).send({
                                error_code: -2,
                                message: "Error when updating booking",
                                data: null
                            });
                            return;
                        } 
                    });
                    const insertQuery="INSERT INTO booking (booking_id, user_id, store_id, start_time, end_time, is_cancel, is_match) VALUES (0, "+userId+", "+storeId+", "+startTime+", "+endTime+", false, true)";
                    connection.query(insertQuery, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(200).send({
                                error_code: -3,
                                message: "Error when putting booking",
                                data: null
                            });
                            return;
                        } 
                    });
                    const conversationId=getConversationId(userId, match["user_id"]);
                    res.status(200).send({
                        error_code: 0,
                        message: "Success",
                        data: conversationId
                    });
                }
            }
        });
        
    } catch(err){
        apiMessage={
            error_code: -3,
            message: "Unknown Exception",
            data: null
        }
        res.status(200).send(apiMessage);
    }
};

function getConversationId(userId1, userId2){
    return compareUserId(userId1, userId2) ? userId1+":"+userId2 : userId2 +":"+userId1;
}

function compareUserId(userId1, userId2){
    if(userId1.length!=userId2.length){
        return userId1.length>userId2.length;
    }
    for(var i=0;i<userId1.length;++i){
        if(userId1[i]!=userId2[i]) return userId1[i]>userId2[i];
    }
    return false;
}