const { postDao } = require("../models")

const posts= async (sort, color, roomsize, residence, style, space, limit, offset) => {
    return await postDao.posts(sort, color, roomsize, residence, style, space, limit, offset);
  };

module.exports ={
  posts,
}