const {postTutorialValidation} = require("../validators/validators");
module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");
    const authen=require("../controllers/authen.controller");
    const test=require("../controllers/test.controller");

    const router = require("express").Router();

    // use access token to find user zalo
    router.post("/login", authen.login);

    // test validator and get user id in jwt token
    router.get("/test", postTutorialValidation, test.test);


    router.post("/",postTutorialValidation, tutorials.create);

    router.get("/", tutorials.findAll);
    router.get("/published", tutorials.findAllPublished);
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial with idWWW
    router.put("/:id", tutorials.update);

    router.delete("/:id", tutorials.delete);
    router.delete("/", tutorials.deleteAll);

    

    app.use('/api', router);
};