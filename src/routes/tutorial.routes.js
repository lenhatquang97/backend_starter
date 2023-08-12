const {postTutorialValidation} = require("../validators/validators");
const home = require("../controllers/home.controller");
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
    router.get("/oa/favorite", home.getFavoriteOA)
    router.get("/oa/nearest", home.getNearestOA)
    //oaById?oa_id=1
    router.get("/oaById", home.getOfficialAccountById)
    //storeById?store_id=1
    router.get("/storeById", home.getStoreById)
    //bookingByUserId?user_id=1
    router.get("/bookingByUserId", home.getBookingById)

    app.use('/api', router);
};