const { commentDao } = require("../models")

const postComment = async (userId, productId, comment) => {

    return await commentDao.postComment( userId, productId, comment );
}

const getComment = async ( postId, userId, limit, offset) => {

    return await commentDao.getComment( postId, userId, limit, offset );
}

const deleteComment = async (userId, commentId) => {

    return await commentDao.deleteComment( userId, commentId );
}

module.exports = {
    postComment,
    getComment,
    deleteComment
}