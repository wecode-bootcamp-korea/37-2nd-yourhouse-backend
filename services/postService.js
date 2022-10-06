const { postDao } = require("../models");
const { post } = require("../routes");

const posts= async ( userId, sort, color, roomsize, residence, style, space, limit, offset) => {
    return await postDao.posts( userId, sort, color, roomsize, residence, style, space, limit, offset);
  };
const follows = async (userId, limit, offset) => {
  return await postDao.follows(userId, limit, offset)
}

const addFollow = async (followerId, writerId) => {
  return await postDao.addFollow(followerId, writerId)
}

const deleteFollow = async (userId) => {
  return await postDao.deleteFollow(userId)
}

module.exports ={
  posts,
  follows,
  addFollow,
  deleteFollow,
}