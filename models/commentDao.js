const appDataSource = require('./dataSource')

const postComment = async (userId, postId, comment) => {
    await appDataSource.query (
        `INSERT INTO comments(
            user_id,
            post_id,
            comment
        )VALUES(?, ? ,?)`,
        [userId, postId, comment]
    )
}

const getComment = async (postId, userId, limit, offset) => {

    const result = await appDataSource.query (
        `SELECT
            c.id,
            c.comment,
            c.post_id,
            c.user_id,
            u.profile_image,
            u.nickname,
        CASE WHEN c.user_id = ?
            THEN 1
            ELSE 0
            END AS commentEx
        FROM comments c
        INNER JOIN users u ON c.user_id = u.id
        WHERE c.post_id = ?
        ORDER BY id desc LIMIT ? OFFSET ? `,
       [ userId, postId, limit, offset]
    ) 
    return result
}

const deleteComment = async( userId, commentId ) => {
    const result = await appDataSource.query(
        `DELETE FROM comments c
        WHERE c.user_id = ?
        AND c.id = ? `,
        [ userId, commentId ]
    )

    return result
}

module.exports = {
    postComment,
    getComment,
    deleteComment
}