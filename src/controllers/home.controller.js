const {connection} = require("../../db.config");

exports.getAllOfficialAccount = (req, res) => {
    connection.query("SELECT * FROM `official_account`", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving official account"
            });
        } else {
            res.send(result);
        }
    });

}