const { postDao } = require("../models");
const { post } = require("../routes");

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

module.exports ={
  posts,
  follows,
  addFollow,
  deleteFollow,
}