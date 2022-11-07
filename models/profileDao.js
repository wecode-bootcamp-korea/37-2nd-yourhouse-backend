const { database } = require("./dataSource");


const getProfile = async( userId ) => {
    const result = await database.query(
        `SELECT
        users.nickname,
            users.profile_image,
            (SELECT
                COUNT(*)
            FROM follows 
            WHERE follow_id = users.id) AS follow,
            (SELECT
                COUNT(*)
            FROM follows
            WHERE follower_id = users.id) AS follower,
            (SELECT
                COUNT(*)
            FROM likes
            WHERE user_id = users.id) AS likes
        FROM users
        WHERE users.id = ?`,
        [ userId ]
    )

    return result.fetchOne();
}

const getMyPosts = async( userId ) => {
    const result = await database.query(
        `SELECT
            users.nickname,
            users.profile_image,
            posts.id AS postId,
            JSON_ARRAYAGG(JSON_OBJECT("image", pi.image, "description", pi.description)) AS postInfo,
            (SELECT
                COUNT(*)
            FROM likes
            WHERE posts.id = likes.post_id) AS likes,
            (SELECT
                COUNT(*)
        FROM comments
        WHERE comments.post_id = posts.id) AS comments,
        CASE WHEN likes.user_id = ?
            THEN 1 
            ELSE 0 
            END AS likeEx
        FROM users INNER JOIN posts ON users.id = posts.user_id
        INNER JOIN posts_infomations AS pi ON posts.id = pi.post_id
        LEFT JOIN likes ON likes.post_id = posts.id AND likes.user_id = ?
        WHERE users.id = ?
        GROUP BY posts.id, likes.user_id`,
        [ userId, userId, userId ]
    )

    return result.fetchAll();
}

const getLikePosts = async( userId ) => {
    const result = await database.query(
        `SELECT
            users.nickname,
            users.profile_image,
            posts.id AS postId,
            JSON_ARRAYAGG(JSON_OBJECT("image", pi.image, "description", pi.description)) AS postInfo,
            (SELECT
                COUNT(*)
            FROM likes
            WHERE posts.id = likes.post_id) AS likes,
            (SELECT
                COUNT(*)
        FROM comments
        WHERE comments.post_id = posts.id) AS comments,
        CASE WHEN likes.user_id = ?
            THEN 1 
            ELSE 0 
            END AS likeEx
        FROM users INNER JOIN posts ON users.id = posts.user_id
        INNER JOIN posts_infomations AS pi ON posts.id = pi.post_id
        LEFT JOIN likes ON likes.post_id = posts.id AND likes.user_id = ?
        WHERE likes.user_id = ?
        GROUP BY posts.id, likes.user_id`,
        [ userId, userId, userId ]
    )
    
    return result.fetchAll();
}


module.exports = {
    getProfile,
    getMyPosts,
    getLikePosts
}