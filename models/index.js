const userDao = require("./userDao");
const profileDao = require("./profileDao");
const searchDao = require("./searchDao");
const postDao = require("./postDao")
const commentDao = require('./commentDao');
const likeDao = require("./likeDao")
const appDataSource = require('./dataSource');
const postingDao = require('./postingDao');

module.exports = {
    userDao,
    profileDao,
    searchDao,
    postDao,
    likeDao,
    commentDao,
    commentDao,
    appDataSource,
    postingDao
}