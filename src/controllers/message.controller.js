const {getUserId} = require("../validators/validators");

exports.handleEvent = (req) => {
    // return user id to test userId
    const userId=getUserId(req, res);
    var apiMessage={
        error_code: 0,
        message: "Success",
        data: userId
    };
    res.status(200).send(apiMessage);
};