const jwt = require("jsonwebtoken");
const { userDao } = require("../models");
const { BaseError } = require("../util/error");
const { SocialAuth } = require("../util/socialAuth");

const authUser = async ( code ) => {
    
    const auth = new SocialAuth(code, process.env.clientId, process.env.redirectUri);

    const accessToken = await auth.getKakaoToken();
    const userInfo = await auth.getKaKaoUserInfo(accessToken)
    
    if ( !userInfo.kakao_account.email || !userInfo.kakao_account.profile.nickname ) throw new BaseError("KEY_ERROR", 400);
    
    let user = await userDao.getUserToSocial(userInfo.id);

    if ( !user ) {
        await userDao.createUser(userInfo)
        user = await userDao.getUserToSocial(userInfo.id);
    } 
    return [jwt.sign({ user_id: user.id }, process.env.TOKKENSECRET), user.nickname]
    
}


module.exports = {
    authUser
}