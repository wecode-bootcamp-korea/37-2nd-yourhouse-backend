const { postDao } = require("../models");
const { BaseError } = require("../util/error");


const posts= async ( userId, sort, color, roomsize, residence, style, space, limit, offset) => {
    return await postDao.posts( userId, sort, color, roomsize, residence, style, space, limit, offset);
  };
const follows = async (userId, limit, offset) => {
  return await postDao.follows(userId, limit, offset)
}

const addFollow = async (userId, writerId) => {
  return await postDao.addFollow(userId, writerId)
}

const deleteFollow = async (userId, writerId) => {
  return await postDao.deleteFollow(userId, writerId)
}

const getPostDetail = async ( postId ) => {
    const postExists = await postDao.getPostExists( postId );
    console.log(postExists)
    if ( !postExists ) throw new BaseError("Post does not exist",400)

    const post = await postDao.getPostDetail( postId );
    
    for(const el of post){
        el.hashtags = await postDao.getHashTag(el.id)
    }

    return post
}


module.exports = {
    posts,
    follows,
    addFollow,
    deleteFollow,
    getPostDetail
}