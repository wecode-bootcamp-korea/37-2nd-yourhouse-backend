// const jwt = require("jsonwebtoken");
// const { userDao } = require("../models");
// const { BaseError } = require("../util/error");

// const loginRequired = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization;
//         const { user_id } = jwt.verify(token, process.env.TOKKENSECRET);

//         const user = await userDao.getUserById( user_id )

//         if ( !user ) return res.status(403).json({ message: "INVALID_USER"})

//         req.user = user;
//         return next();
//     } catch (err) {
//         console.log(err)
//         next( new BaseError("INVALID_TOKEN", 400) );
//     }
// }

// const getUserId = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization;
//         if ( !token ) {
//             req.user = 0;
//             return next();
//         }

//         const { user_id } = jwt.verify(token, process.env.TOKKENSECRET);

//         const user = await userDao.getUserById( user_id )
//         req.user = user;

//         return next();
//     } catch(err) {
//         req.user = 0
//         next();
//     }
// }

// module.exports = {
//     loginRequired,
//     getUserId
// }
