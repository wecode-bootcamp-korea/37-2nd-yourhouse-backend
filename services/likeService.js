const { likeDao } = require("../models");
const { BaseError } = require("../util/error");

const addLike = async (userId, postId) => {
    const addLike = await likeDao.addLike(userId, postId)
    
    if(!postId){
        throw new BaseError(400, "KEY_ERROR")
    }
    
    return addLike
}

const deleteLike = async (userId, postId) => {
    const deleteLike = await likeDao.deleteLike(userId, postId)
    
    if(!postId){
        throw new BaseError(400, "KEY_ERROR")
    }
    
    return deleteLike
}
module.exports ={
    addLike,
    deleteLike,
}