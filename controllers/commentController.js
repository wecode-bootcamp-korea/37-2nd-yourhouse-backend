const { commentService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler");
const { BaseError } = require("../util/error");


const postComment = asyncWrap( async(req, res) => {
    const userId = req.user.id;
    const { postId, comment } = req.body;

    if ( !postId || !comment ) throw new BaseError( "KEY ERROR", 400 );

    await commentService.postComment( userId, postId, comment );

    const comments = await commentService.getComment( postId, userId, 5, 0 );

    return res.status(200).json({ message: "Create Comment Success", comments });
})

const getComments = asyncWrap ( async(req,res) => {
    const userId = req.user.id;
    const { postId, limit, offset} = req.query;

    if ( !postId || !limit || !offset ) throw new BaseError( "KEY ERROR", 400 );

    const comments = await commentService.getComment( postId, userId, +limit, +offset );
    return res.status(200).json({ comments });
})

const deleteComment = asyncWrap( async(req, res) => {
    const userId = req.user.id;
    const { commentId } = req.query;
    
    if ( !commentId ) throw new BaseError( "KEY ERROR", 400 );
    
    const comments = await commentService.deleteComment( userId, commentId );
    return res.status(200).json({ message: "Delete Success", comments });
})


module.exports = {
    postComment,
    deleteComment,
    getComments
}