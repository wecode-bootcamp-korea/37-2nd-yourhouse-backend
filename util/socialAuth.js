// const axios = require("axios");

// class SocialAuth{
//     constructor(code,clientId,redirectUri){
//         this.code = code;
//         this.clientId = clientId;
//         this.redirectUri = redirectUri
//     }

//     async getKakaoToken() {
//         const { data } = await axios({
//             method: "POST",
//             url: "https://kauth.kakao.com/oauth/token",
//             headers:{"content-type":"application/x-www-form-urlencoded;charset=urf-8"},
//             data: `grant_type=authorization_code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&code=${this.code}`
//         })

//         return data.access_token
//     }

//     async getKaKaoUserInfo(token) {
//         const { data } = await axios({
//             url:"https://kapi.kakao.com/v2/user/me",
//             headers:{ Authorization: `Bearer ${token}` }
//         })

//         return data
//     }
// }

// module.exports = { SocialAuth }
