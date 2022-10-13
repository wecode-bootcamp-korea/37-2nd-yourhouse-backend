const { postingDao } = require('../models')

const createPost = async (userId, post, image) => {
    await postingDao.createPost(userId, post, image)
}

module.exports = {
    createPost
}


