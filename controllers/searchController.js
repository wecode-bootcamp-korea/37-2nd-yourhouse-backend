const { searchService } = require("../services");
const { asyncWrap } = require("../middleware/errorHandler");
const { BaseError } = require("../util/error");


const getPostsByNav = asyncWrap( async(req, res) => {
    const { post } = req.query;

    if ( !post ) throw new BaseError( "KEY_ERROR", 400 );

    const postInfo = await searchService.getPostsByNav( post );

    return res.status(200).json({ postInfo });
})

const getProducts = asyncWrap( async(req, res) => {
    const { product } = req.query;

    if ( !product ) throw new BaseError( "KEY_ERROR", 400 );

    const products = await searchService.getProducts( product );

    return res.status(200).json({ products });
})

const getPostLists = asyncWrap( async(req, res) => {
    const userId = req.user.id;
    const { post } = req.query;

    if ( !post ) throw new BaseError( "KEY_ERROR", 400 );

    const posts = await searchService.getPostLists( post, userId );

    return res.status(200).json({ posts });
})


module.exports = {
    getPostsByNav,
    getProducts,
    getPostLists
}