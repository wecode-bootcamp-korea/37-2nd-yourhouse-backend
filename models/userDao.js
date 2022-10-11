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

module.exports = {
    createUser,
    getUserToEmail,
    getUserById
}