const { postService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler")

const posts = asyncWrap( async(req, res) => {
    const { sort, color, roomsize, residence, style, space,limit, offset} = req.query

    const posts = await postService.posts(sort, color, roomsize, residence, style, space, parseInt(limit), parseInt(offset));
    res.status(200).send({list : posts})
})

module.exports = {
    posts,
}