const { userService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler")


const authUser = asyncWrap( async(req, res) => {
    const [ accessToken, nickname, profileImage ] = await userService.authUser( req.query.code );

    return res.status(200).json({ accessToken, nickname, profileImage });
})

const addFollow = asyncWrap( async(req, res) => {
    const userId = req.user.id;
    const { writerId } = req.query;
    
    if (!writerId) throw new BaseError( "KEY_ERROR", 400 );

    await userService.addFollow( userId, writerId );

    res.status(201).json({ message : "SUCCESS_FOLLOWING" });
})

const deleteFollow = asyncWrap( async(req, res) =>{
    const userId = req.user.id;
    const { writerId } = req.query;

    if (!writerId) throw new BaseError( "KEY_ERROR", 400 );
    
    await userService.deleteFollow( userId, writerId );

    res.status(204).json({ message : "SUCCESS_DELETE" });
})

const addLike = asyncWrap( async(req, res) => {
    const userId = req.user.id;
    const postId = req.query.postId;

    await userService.addLike( userId, postId );
    
    return res.status(201).json({ message: "SUCCESS_ADD_LIKE" });
})

const deleteLike = asyncWrap( async(req, res)=>{
    const userId = req.user.id;
    const postId = req.query.postId;
    
    await userService.deleteLike( userId, postId );
    
    return res.status(204).json({ message: "DELETE_ADD_LIKE" });
})


module.exports = {
    authUser,
    addFollow,
    deleteFollow,
    addLike,
    deleteLike
}