const {postTutorialValidation} = require("../tutorials/validators");
module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");

    const router = require("express").Router();

    router.post("/",postTutorialValidation, tutorials.create);

    router.get("/", tutorials.findAll);
    router.get("/published", tutorials.findAllPublished);
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial with id
    router.put("/:id", tutorials.update);

    router.delete("/:id", tutorials.delete);
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};