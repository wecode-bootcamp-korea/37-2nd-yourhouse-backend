const { postService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler");
const { BaseError } = require("../util/error");

const getPostsList = asyncWrap( async(req, res) => {
    const userId  = req.user.id;
    const { sort, color, roomsize, residence, style, space,limit, offset } = req.query;

    if (!limit || !offset) throw new BaseError( "KEY_ERROR", 400 );

    const lists = await postService.getPostsList( userId, parseInt(sort), color, roomsize, residence, style, space, parseInt(limit), parseInt(offset) );
    
    return res.status(200).json({ lists });
})

const createPost = asyncWrap( async(req, res, next) => {
    const userId = req.user.id;

    const post = {
        marker : JSON.parse(req.body.marker),
        hashTag : JSON.parse(req.body.hashTag),
        size : req.body.size,
        residence : req.body.residence,
        style : req.body.style,
        space : req.body.space,
        comment : req.body.comment
    }

    const image = req.file;

    await postService.createPost( userId, post, image );

    return res.status(200).json({ message: "post success" });
})

const getFollowsPosts = asyncWrap( async(req, res) => {
    const userId = req.user.id;
    const { limit, offset } = req.query;

    if ( !limit || !offset ) throw new BaseError( "KEY_ERROR", 400 );
    const posts = await postService.getFollowsPosts( userId, parseInt(limit), parseInt(offset) );

    res.status(200).send({ posts });
}) 

const getPostDetail = asyncWrap( async(req, res) => {
    const { postId } = req.params;

    const post = await postService.getPostDetail( postId );
    
    return res.status(200).json({ post });
})

module.exports = {
    getPostsList,
    createPost,
    getFollowsPosts,
    getPostDetail
}