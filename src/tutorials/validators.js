const {object, string} = require('yup');
const postTutorialSchema = object({
    title: string().required(),
});
const postTutorialValidation = (req, res, next) => {
    try {
        postTutorialSchema.validateSync(req.body);
        next();
    } catch (error) {
        res.status(400).send({message: error.message});
    }
}
module.exports = {postTutorialValidation};