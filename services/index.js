const pingService = require("./pingService");
const userService = require("./userService");
const profileService = require("./profileService");
const searchService = require("./searchService")
const likeService = require("./likeService")
const postService = require("./postService");
const commentService = require("./commentService");

module.exports = {
    pingService,
    userService,
    likeService,
    profileService,
    searchService,
    postService,
    commentService
}