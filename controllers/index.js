const pingController = require("./pingController");
const userController = require("./userController");
const profileController = require("./profileController");
const commentController = require("./commentController");
const searchController = require("./searchController");
const postController = require("./postController")
const likeController = require("./likeController")
const postingController = require("./postingController")

module.exports = {
    pingController,
    userController,
    postController,
    profileController,
    searchController,
    likeController,
    commentController,
    postingController
}