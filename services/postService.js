// const { postDao } = require("../models");
// const { BaseError } = require("../util/error");

// const getPostsList = async ( userId, sort, color, roomsize, residence, style, space, limit, offset) => {

//     return await postDao.getPostsList( userId, sort, color, roomsize, residence, style, space, limit, offset);
// };

// const getFollowsPosts = async ( userId, limit, offset ) => {

//     return await postDao.getFollowsList( userId, limit, offset );
// }

// const createPost = async ( userId, post, image ) => {

//     return await postDao.createPost( userId, post, image );
// }

// const getPostDetail = async ( postId ) => {
//     const postExists = await postDao.getPostExists( postId );

//     if ( !postExists ) throw new BaseError( "Post does not exist", 400 );

//     const post = await postDao.getPostDetail( postId );

//     for(const el of post){
//         el.hashtags = await postDao.getHashTag( el.id )
//     }

//     return post;
// }

// module.exports = {
//     getPostsList,
//     getFollowsPosts,
//     createPost,
//     getPostDetail
// }
