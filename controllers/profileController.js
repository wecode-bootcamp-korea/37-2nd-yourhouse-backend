const { profileService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler")


const getProfile = asyncWrap( async(req, res) => {
    const userId = req.user.id
    
    const profile = await profileService.getProfile( userId );

    return res.status(200).json({ profile });
})

const getMyPosts = asyncWrap( async(req, res) => {
    const userId = req.user.id
    
    const posts = await profileService.getMyPosts( userId );

    return res.status(200).json({ posts })
})

const getLikePosts = asyncWrap( async(req, res) => {
    const userId = req.user.id

    const posts = await profileService.getLikePosts( userId );

    return res.status(200).json({ posts });
})


module.exports = {
    getProfile,
    getMyPosts,
    getLikePosts
}