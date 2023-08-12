const {getUserId} = require("../validators/validators");
const {pool} = require("../../db.config");
const main=require("../../server");

exports.getReplyTo=(conversationId, senderId)=>{
    const parts=conversationId.split(":");
    if(parts[0]===senderId) return parts[1];
    return parts[0];
}

exports.getBooking=(req, res)=>{
    const {bookingId}=req.query;
    const user=getUserId(req, res);
    const queryGetBooking="SELECT * FROM booking WHERE booking_id="+bookingId;
    console.log(queryGetBooking);
    pool.query(queryGetBooking, function(err, result, _) {
        if (err) {
            // handle error
            res.status(200).send({
                error_code: -1,
                message: "Error when finding booking",
                data: null
            });
        }else{
            const d=result[0];
            if(d["user_id"] !== user){
                res.status(200).send({
                    error_code: -2,
                    message: "not permission",
                    data: null    
                });
                return;
            }
            res.status(200).send({
                error_code: 0,
                message: "Success",
                data: d
            });
        }
    });
}

exports.book = (req, res) => {
    var apiMessage;
    try{
        const userId=getUserId(req, res);
        const startTime=req.body["start_time"];
        const endTime=req.body["end_time"]; 
        const storeId=req.body["store_id"];
        const curTime=Date.now();
        const query="SELECT * FROM booking WHERE user_id!="+userId+" AND is_cancel=false AND is_match=false AND store_id=\""+storeId+"\" AND ((start_time>="+startTime+" AND start_time<="+endTime+") OR ("+startTime+">=start_time AND "+startTime+"<=end_time)) AND end_time>"+curTime;
        console.log("query="+query);
        pool.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(200).send({
                    error_code: -1,
                    message: "Error when finding matching user",
                    data: null
                });
            } else {
                if (result.length===0){
                    // find no matching
                    const insertQuery="INSERT INTO booking (booking_id, user_id, store_id, start_time, end_time, is_cancel, is_match, conversation_id) VALUES (0, "+userId+", \""+storeId+"\", "+startTime+", "+endTime+", false, false, null)";
                    pool.query(insertQuery, (err, _) => {
                        if (err) {
                            console.log(err);
                            res.status(200).send({
                                error_code: -1,
                                message: "Error when putting booking",
                                data: null
                            });
                        }
                    });
                    res.status(200).send({
                        error_code: 0,
                        message: "Success",
                        data: null
                    });
                }
                else{
                    const match=result[0];
                    console.log(match);
                    const conversationId=getConversationId(userId, match["user_id"]);
                    const alterQuery="UPDATE booking SET is_match=true, conversation_id=\""+conversationId+"\" WHERE booking_id="+match["booking_id"];
                    pool.query(alterQuery, (err, _) => {
                        if (err) {
                            console.log(err);
                            res.status(200).send({
                                error_code: -2,
                                message: "Error when updating booking",
                                data: null
                            });
                        } 
                    });
                    const insertQuery="INSERT INTO booking (booking_id, user_id, store_id, start_time, end_time, is_cancel, is_match, conversation_id) VALUES (0, "+userId+", \""+storeId+"\", "+startTime+", "+endTime+", false, true, \""+conversationId+"\")";
                    pool.query(insertQuery, (err, _) => {
                        if (err) {
                            console.log(err);
                            res.status(200).send({
                                error_code: -3,
                                message: "Error when putting booking",
                                data: null
                            });
                        }
                    });
                    // todo: noti booking is matched
                    const io=main.io;
                    io.emit("notify-booking-status-"+match["user_id"], {
                        booking_id: match["booking_id"],
                        type: "IS_MATCHED"
                    });
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

exports.getAllBookingOfUser=(req, res)=>{
    var {offset, limit}=req.query;
    if(!offset) offset=0;
    if(!limit) limit=100000;
    const user=getUserId(req, res);
    const queryGetBooking="SELECT * FROM booking WHERE user_id="+user;
    pool.query(queryGetBooking, function(err, result, _) {
        if (err) {
            // handle error
            res.status(200).send({
                error_code: -1,
                message: "Get all user's booking error",
                data: null
            });
        }else{
            res.status(200).send({
                error_code: 0,
                message: "Success",
                data: result
            });
        }
    });
}

exports.getPartnerFromBooking=(req, res)=>{
    const {bookingId}=req.query;
    const user=getUserId(req, res);
    if(!user || !bookingId){
        res.status(200).send({
            error_code: -1,
            message: "bookingId or user not found",
            data: null
        });
        return res;
    }
    const queryGetBooking="SELECT * FROM booking WHERE booking_id="+bookingId;
    pool.query(queryGetBooking, function(err, result, _) {
        if (err) {
            // handle error
            console.log(err);
            res.status(200).send({
                error_code: -2,
                message: "error when find booking",
                data: null
            });
        }else{
            console.log(result);
            if(result.length === 0){
                res.status(200).send({
                    error_code: -3,
                    message: "no booking has bookingId",
                    data: null
                });
                return;
            }
            const b=result[0];
            const userInBooking=b["user_id"];
            const conversationId=b["conversation_id"];
            if(!conversationId){
                res.status(200).send({
                    error_code: 0,
                    message: "Success",
                    data: null
                });
                return;
            }
            if(userInBooking !== user  || !conversationId.includes(user)){
                res.status(200).send({
                    error_code: -4,
                    message: "nno permission",
                    data: null
                });
                return;
            }
            
            const parts=conversationId.split(":");
            var partnerId=parts[0];
            if(partnerId === user) partnerId=parts[1];
            if(partnerId === user) {
                console.log("Error "+conversationId);
                res.status(200).send({
                    error_code: 0,
                    message: "Success",
                    data: null
                });
                return;
            }
            
            const queryGetProfile="SELECT * FROM user WHERE user_id="+partnerId;
            pool.query(queryGetProfile, function(err, result2, _) {
                if (err) {
                    // handle error
                    console.log(err);
                    res.status(200).send({
                        error_code: -6,
                        message: "error when get profile",
                        data: null
                    });
                }
                else{
                    const c=result2[0];
                    // console.log(result2);
                    res.status(200).send({
                        error_code: 0,
                        message: "Success",
                        data: {
                            user_name: c["user_name"],
                            user_ava: c["user_ava"],
                            user_id: c["user_id"]
                        }
                    });
                }
            });
        }
    });
}

function getConversationId(userId1, userId2){
    return compareUserId(userId1, userId2) ? userId1+":"+userId2 : userId2 +":"+userId1;
}

function compareUserId(userId1, userId2){
    if(userId1.length !== userId2.length){
        return userId1.length>userId2.length;
    }
    for(var i=0;i<userId1.length;++i){
        if(userId1[i] !== userId2[i]) return userId1[i]>userId2[i];
    }
    return false;
}

