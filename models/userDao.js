const appDataSource = require("./dataSource");


const createUser = async ( user ) => {
    return await appDataSource.query(
        `INSERT INTO users(
            social_id,
            email,
            nickname,
            profile_image
        ) VALUES ( ?, ?, ?, ? )`,
        [ user.id, user.kakao_account.email, user.kakao_account.profile.nickname, user.kakao_account.profile.profile_image_url ]
    )
}

const getUserToSocial = async ( socialId ) => {
    const [ user ] = await appDataSource.query(
        `SELECT
            *
        FROM users
        WHERE social_id = ?`,
        [ socialId ]
    )
    return user
}

const getUserById = async ( id ) => {
    const [ user ] = await appDataSource.query(
        `SELECT
            *
        FROM users
        WHERE id = ?`,
        [ id ]
    )
    return user;
}

module.exports = {
    createUser,
    getUserToSocial,
    getUserById
}