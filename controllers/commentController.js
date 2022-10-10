const { commentService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler")


const postComment = asyncWrap( async(req, res) => {
    const userId = req.user.id
    const { postId, comment } = req.body

    if (!postId || !comment) {
        const error = new Error("KEY ERROR");
        error.statusCode = 400;
        throw error;
    }
    await commentService.postComment(userId, postId, comment);

    const comments = await commentService.getComment(postId, userId, 5, 0 );

    return res.status(200).json({ message: "Create Comment Success", comments: comments });
})

const getComment = asyncWrap ( async(req,res) => {

    const { postId, userId, limit, offset} = req.query

    if (!postId || !limit || !offset){
        const error = new Error("KEY ERROR");
        throw error;
    } 
    const comments = await commentService.getComment(postId, userId, +limit, +offset)
    return res.status(200).json({comments})
})

const deleteComment = asyncWrap( async(req, res) => {
    const userId = req.user.id
    const {commentId } = req.query
    
    if (!userId || !commentId) {
        const error = new Error("KEY ERROR");
        error.statusCode = 400;
        throw error;
    }
    await commentService.deleteComment( userId, commentId )
    return res.status(200).json({message: "Delete Success"})
})

module.exports = {
    postComment,
    deleteComment,
    getComment
}