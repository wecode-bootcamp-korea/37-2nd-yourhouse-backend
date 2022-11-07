const { database } = require("./dataSource");


const createUser = async ( user ) => {
    const result = await database.query(
        `INSERT INTO users(
            social_id,
            email,
            nickname,
            profile_image
        ) VALUES ( ?, ?, ?, ? )`,
        [ user.id, user.kakao_account.email, user.kakao_account.profile.nickname, user.kakao_account.profile.profile_image_url ]
    )

    return result.getLastInsertId();
}

const getUserToEmail = async ( email ) => {
    const result = await database.query(
        `SELECT
            *
        FROM users
        WHERE email = ?`,
        [ email ]
    )

    return result.fetchOne();
}

const getUserById = async ( id ) => {
    const result = await database.query(
        `SELECT
            *
        FROM users
        WHERE id = ?`,
        [ id ]
    )
    
    return result.fetchOne();
}

const addFollow = async(userId, writerId) => {
    const result = await database.query(
        `INSERT INTO follows(
            follow_id,
            follower_id
        )VALUES (?, ?)`,
        [userId, writerId]
    )

    return result.getLastInsertId();
}

const deleteFollow = async(userId, writerId) => {
    const result = await database.query(
        `DELETE FROM follows
        WHERE follow_id = ?
        AND follower_id = ?`, 
        [userId, writerId]
    )

    return result.getAffectdRows();
}

const addLike = async(userId, postId) => { 
    const result = await database.query(
        `INSERT INTO likes(
            post_id,
            user_id
        )VALUES (?, ?)`,
        [ postId, userId]
    )

    return result.getLastInsertId();
}

const deleteLike = async(userId, postId) => {
    const result = await database.query(
        `DELETE FROM likes
        WHERE user_id = ?
        AND post_id = ?`,
        [userId, postId]
    )

    return result.getAffectdRows();
}


module.exports = {
    createUser,
    getUserToEmail,
    getUserById,
    addFollow,
    deleteFollow,
    addLike,
    deleteLike
}