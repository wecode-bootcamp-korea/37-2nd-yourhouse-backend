const { likeService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler")

const addLike = asyncWrap( async(req, res) => {
    const userId = req.user.id
    const postId = req.query.postId

    await likeService.addLike(userId, postId);
    
    return res.status(201).json({ message: "SUCCESS_ADD_LIKE" });
})

const deleteLike = asyncWrap( async(req, res)=>{
    const userId = req.user.id
    const postId = req.query.postId
    
    await likeService.deleteLike(userId, postId);
    
    return res.status(204).json({ message: "DELETE_ADD_LIKE" });
})

module.exports = {
    addLike,
    deleteLike,
}