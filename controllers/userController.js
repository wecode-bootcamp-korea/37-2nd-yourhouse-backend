const { userService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler")


const authUser = asyncWrap( async(req, res) => {
    const [accessToken, nickname] = await userService.authUser(req.query.code);

    return res.status(200).json({ accessToken, nickname});
})


module.exports = {
    authUser
}