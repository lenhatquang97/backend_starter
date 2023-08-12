const {postTutorialValidation} = require("../validators/validators");

module.exports = app => {
    const home = require("../controllers/home.controller");
    const authen=require("../controllers/authen.controller");
    const test=require("../controllers/test.controller");
    const booking=require("../controllers/booking.controller");
    const message=require("../controllers/message.controller");

    const router = require("express").Router();

    // use access token to find user zalo
    router.post("/login", authen.login);

    // test validator and get user id in jwt token
    router.get("/test", postTutorialValidation, test.test);

    router.post("/booking/book", postTutorialValidation, booking.book);

    router.get("/booking/messages", postTutorialValidation, message.getAllMessageOfConversation);

    router.get("/booking/getPartnerInfoFromBooking", postTutorialValidation, booking.getPartnerFromBooking);

    router.get("/booking/getAllUserBooking", postTutorialValidation, booking.getAllBookingOfUser);

    router.get("/oa", home.getAllOfficialAccount)
    router.get("/oa/favorite", home.getFavoriteOA)
    router.get("/oa/nearest", home.getNearestOA)
    router.get("/meal_history", home.getMealHistory)



    app.use('/api', router);
};