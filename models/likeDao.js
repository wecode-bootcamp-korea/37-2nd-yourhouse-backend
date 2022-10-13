const appDataSource = require("./dataSource");

const addLike = async(userId, postId) => { 
    
    const addLikeLaws = (await appDataSource.query(
        `
            INSERT INTO likes(
                post_id,
                user_id,
            )VALUES(?,?)
        `,[userId, postId]
    )).affectedRows 

    if (addLikeLaws !==0 && addLikeLaws !==1) throw new Error('UNEXPECTED_NUMBER_OF_RECORDS_ADDED')

    return addlikeLaws
}

const deleteLike = async(userId, postId) => {
    const deleteLikeLaws =( await appDataSource.query(
        `
            DELETE FROM likes
            WHERE user_id = ?
            AND post_id = ?
        `,[userId, postId]
    )).affectedRows

    if (deleteLikeLaws !== 0 && deleteLikeLaws !== 1) throw new Error('UNEXPECTED_NUMBER_OF_RECORDS_DELETED')

    return deleteLikeLaws
}

module.exports = {
    addLike,
    deleteLike,
}