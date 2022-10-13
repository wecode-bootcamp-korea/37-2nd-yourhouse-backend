const { postingService } = require('../services')
const { asyncWrap } = require("../middleware/errorHandler")

const createPost = asyncWrap(async(req, res, next) => {
    const userId = req.user.id

    console.log(req.body)
    const post = {
        marker : JSON.parse(req.body.marker),
        hashTag : JSON.parse(req.body.hashTag),
        size : req.body.size,
        residence : req.body.residence,
        style : req.body.style,
        space : req.body.space,
        comment : req.body.comment
    }

    const image = req.file

    await postingService.createPost(userId, post, image)

    return res.status(200).json({ message: "post success" });
})


module.exports = {
    createPost
}