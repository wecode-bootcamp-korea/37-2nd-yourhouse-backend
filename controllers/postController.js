const { postService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler");
const { BaseError } = require("../util/error");

const posts = asyncWrap( async(req, res) => {
    const  userId  = req.user.id
    console.log(req.query)
    const { sort, color, roomsize, residence, style, space,limit, offset} = req.query
    if (!limit || !offset) {
        throw new BaseError(400, "KEY_ERROR");
      }
    const posts = await postService.posts( userId, parseInt(sort), color, roomsize, residence, style, space, parseInt(limit), parseInt(offset));

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
    const userId = req.user.id
    const { writerId } = req.query
    
    if (!writerId){
        throw new BaseError(400, "KEY_ERROR");
    }

    const followPost = await postService.addFollow(userId, writerId)

    res.status(201).json({ followPost, message : "SUCCESS_FOLLOWING"})
})

const deleteFollow = asyncWrap( async(req, res) =>{
    const userId = req.user.id
    const { writerId } = req.query

    if (!writerId){
        throw new BaseError(400, "KEY_ERROR");
    }
    
    await postService.deleteFollow(userId, writerId)

    res.status(204).json({message : "SUCCESS_DELETE"})
})

module.exports = {
    posts,
    follows,
    addFollow,
    deleteFollow,
}