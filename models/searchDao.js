const { database } = require("./dataSource");


const getPostInfoByNav = async( post ) => {
    const result = await database.query(
        `SELECT
            description
        FROM posts_infomations
        WHERE description LIKE "%${post}%"`,
    )

    return result.fetchAll();
}

const getProducts = async( product ) => {
    const result = await database.query(
        `SELECT
            *
        FROM products
        WHERE description LIKE "%${product}%"`,
    )

    return result.fetchAll();
}

const getPostLists = async( post, userId ) => {
    const result = await database.query(
        `SELECT
            users.nickname,
            users.profile_image,
            posts.id AS postId,
            JSON_ARRAYAGG(JSON_OBJECT("image", PI.image, "description", PI.description)) AS postInfo,
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
        INNER JOIN posts_infomations AS PI ON posts.id = PI.post_id
        LEFT JOIN likes ON likes.post_id = posts.id AND likes.user_id = ?
        WHERE users.nickname LIKE "%${post}%" OR PI.description LIKE "%${post}%"
        GROUP BY posts.id, likes.user_id`,
        [ userId, userId ]
    )

    return result.fetchAll();
}


module.exports = {
    getPostInfoByNav,
    getProducts,
    getPostLists,
}