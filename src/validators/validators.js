const authHeader="auth";
const authen=require("../controllers/authen.controller");

const postTutorialValidation = (req, res, next) => {
    try {
        const jwtToken=req.get(authHeader);
        if(!jwtToken){
            let apiMessage={
                error_code: -103,
                message: "Permission Exception",
                data: null
            };
            res.status(200).send(apiMessage);
            return;
        }
        const userId=authen.verify(jwtToken);
        if(userId==null){
            let apiMessage={
                error_code: -104,
                message: "Decode JWT Token fail",
                data: null
            };
            res.status(200).send(apiMessage);
            return;
        }
        next();
    } catch (error) {
        res.status(400).send({message: error.message});
    }
}

const getUserId=(req, _)=>{
    try {
        const jwtToken=req.get(authHeader);
        if(!jwtToken){
            return null;
        }
        const userId=authen.verify(jwtToken);
        if(userId==null){
            return null;
        }
        return userId;
    } catch (error) {
        return null;
    }
}

module.exports = {postTutorialValidation, getUserId};