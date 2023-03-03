// const jwt = require("jsonwebtoken");
// const { userDao } = require("../models");
// const { BaseError } = require("../util/error");
// const { SocialAuth } = require("../util/socialAuth");

// const authUser = async ( code ) => {
//     const auth = new SocialAuth( code, process.env.clientId, process.env.redirectUri );

//     const accessToken = await auth.getKakaoToken();
//     const userInfo = await auth.getKaKaoUserInfo( accessToken );

//     if ( !userInfo.kakao_account.email || !userInfo.kakao_account.profile.nickname ) throw new BaseError("KEY_ERROR", 400);

//     let user = await userDao.getUserToEmail( userInfo.kakao_account.email );
//     if ( !user ) {
//         await userDao.createUser( userInfo );
//         user = await userDao.getUserToEmail( userInfo.kakao_account.email );
//     }

//     return [ jwt.sign({ user_id: user.id }, process.env.TOKKENSECRET), user.nickname, user.profile_image ];
// }

// const addFollow = async ( userId, writerId ) => {

//     return await userDao.addFollow( userId, writerId );
// }

// const deleteFollow = async ( userId, writerId ) => {

//     return await userDao.deleteFollow( userId, writerId );
// }

// const addLike = async ( userId, postId ) => {

//     return await userDao.addLike( userId, postId );
// }

// const deleteLike = async ( userId, postId ) => {

//     return await userDao.deleteLike( userId, postId );
// }

// module.exports = {
//     authUser,
//     addFollow,
//     deleteFollow,
//     addLike,
//     deleteLike
// }
