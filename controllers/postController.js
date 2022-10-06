const { postService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler");
const { BaseError } = require("../util/error");

const posts = asyncWrap( async(req, res) => {
    const  userId  = req.user.id
    const { sort, color, roomsize, residence, style, space,limit, offset} = req.query
    if (!limit || !offset) {
        throw new BaseError(400, "KEY_ERROR");
      }
    const posts = await postService.posts( userId, sort, color, roomsize, residence, style, space, parseInt(limit), parseInt(offset));

    res.status(200).send({list : posts})
})

const follows = asyncWrap( async(req, res) => {
    const userId = req.user.id
    const { limit, offset } = req.query

    if (!limit || !offset) {
        throw new BaseError(400, "KEY_ERROR");
    }
    const follows =await postService.follows(userId, parseInt(limit), parseInt(offset));

    res.status(200).send({posts : follows})
}) 

const addFollow = asyncWrap( async(req, res) => {
    const followerId = req.user.id
    const { writerId } = req.body
    
    if (!writerId){
        throw new BaseError(400, "KEY_ERROR");
    }

    const followPost = await postService.addFollow(followerId, writerId, postId)

    res.status(201).json({ followPost, message : "SUCCESS_FOLLOWING"})
})

const deleteFollow = asyncWrap( async(req, res) =>{
    const userId = req.user.id
    
    await postService.deleteFollow(userId)

    res.status(204).json({message : "SUCCESS_DELETE"})
})

module.exports = {
    posts,
    follows,
    addFollow,
    deleteFollow,
}