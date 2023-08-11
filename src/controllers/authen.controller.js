const request = require("request");
var jwt = require('jsonwebtoken');

const secretKey="DepTraiCoGiLaSai";

exports.login = (req, res) => {
    // get access token in request
    var apiMessage;
    const {accessToken}=req.body;
    if(!accessToken) {
        apiMessage={
            error_code: -1,
            message: "accessToken is missing",
            data: null
        };
        res.status(200).send(apiMessage);
        return;
    }
    // make api call to Zalo to get userId from accessToken
    const options = {
        url: "https://graph.zalo.me/v2.0/me",
        method: "GET",
        headers: {
          access_token: accessToken,
        },
        qs: {
          fields: "id,name,birthday,picture"
        },
        json: true
    };
      
    request(options, (error, response, body) => {
        if (error) {
            apiMessage={
                error_code: -2,
                message: "Error when get profile from accessToken. "+error,
                data: null
            };
            res.status(200).send(apiMessage);
        } else {
            if(body["error"]!=0){
                apiMessage={
                    error_code: -body["error"],
                    message: body["message"],
                    data: null
                };
                res.status(200).send(apiMessage);
                return;
            }
            const {name, id, picture}=body;
            var token = jwt.sign({id: id}, secretKey);
            data={
                name: name,
                token: token,
                picture: picture
            };
            apiMessage={
                error_code: 0,
                message: "Success",
                data: data
            }
            res.status(200).send(apiMessage);
        }
    });
};

exports.verify=(jwtToken)=>{
    try {
        const decoded = jwt.verify(jwtToken, secretKey);
        const user = decoded["id"];
        return user;
    } catch (err) {
        return null;
    }
}