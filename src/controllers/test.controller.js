const {getUserId} = require("../validators/validators");

exports.test = (req, res) => {
    // return user id to test userId
    const userId=getUserId(req, res);
    var apiMessage={
        error_code: 0,
        message: "Success",
        data: userId
    };
    res.status(200).send(apiMessage);
};