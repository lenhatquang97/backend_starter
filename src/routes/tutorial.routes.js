const {postTutorialValidation} = require("../validators/validators");
module.exports = app => {
    const home = require("../controllers/home.controller");
    const authen=require("../controllers/authen.controller");
    const test=require("../controllers/test.controller");
    const booking=require("../controllers/booking.controller");

    const router = require("express").Router();

    // use access token to find user zalo
    router.post("/login", authen.login);

    // test validator and get user id in jwt token
    router.get("/test", postTutorialValidation, test.test);

    router.post("/booking/book", postTutorialValidation, booking.book);

    router.get("/oa", home.getAllOfficialAccount)


    app.use('/api', router);
};