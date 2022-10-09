const jwt = require("jsonwebtoken");
const { userDao } = require("../models");
const { BaseError } = require("../util/error");


const loginRequired = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        const { user_id } = jwt.verify(token, process.env.TOKKENSECRET);

        const user = await userDao.getUserById( user_id )

        if ( !user ) return res.status(403).json({ message: "INVALID_USER"})

        req.user = user;
        return next();
    } catch (err) {
        const error = new BaseError("INVALID_TOKEN", 400);
        next(error)
    }
}


module.exports = loginRequired