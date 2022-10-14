const {database} = require("./dataSource");

const addLike = async(userId, postId) => { 
    
    const result = await database.query(
        `
            INSERT INTO likes(
                post_id,
                user_id
            )VALUES(?,?)
        `,[ postId, userId]
    )
    return result.getLastInsertId()
}

const deleteLike = async(userId, postId) => {
    const result =( await database.query(
        `
            DELETE FROM likes
            WHERE user_id = ?
            AND post_id = ?
        `,[userId, postId]
    ))

    // if (result.getAffectdRows() !== 0 && result.getAffectdRows() !== 1) throw new Error('UNEXPECTED_NUMBER_OF_RECORDS_DELETED')

    return result.getAffectdRows()
}

module.exports = {
    addLike,
    deleteLike
}