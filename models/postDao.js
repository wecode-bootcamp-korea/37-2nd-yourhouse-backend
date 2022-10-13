const { BaseError } = require("../util/error")
const appDataSource = require("./datasource")

const posts = async(userId, sort, color, roomsize, residence, style, space, limit, offset )=> {
    const queries ={ userId, sort, color, roomsize, residence, style, space, limit, offset}
    try{
    function filterBuilder(criteria) {
        let sql = ``;
        let fieldArr = [];
        if (criteria.length === 0) return sql;
        for (var item of criteria) {
          fieldArr.push(item.value);
          sql = fieldArr.join(item.condition);
          fieldArr = [sql];
        }
        return ` WHERE ${sql}`;
      }
   
    const criterias = [
         {
          field: 'color',
          value: ` C.id in (`+ String(color) + `)`,
          condition: ` AND `,
        },
        {
          field: 'roomsize',
          value: ` PI.room_size_id in (`+ String(roomsize) + `)`,
          condition: ` AND `,
        },
        {
          field: 'residence',
          value: ` PI.resicence_id in (`+ String(residence) + `)`,
          condition: ` AND `,
        },
        {
            field: 'style',
            value: ` PI.style_id in (`+ String(residence) + `)`,
            condition: ` AND `,
        },
        {
          field: 'space',
          value: ` PI.space_id in (`+ String(space) + `)`,
          condition: ` AND `,
        },
      ];
  
    const newCriteria = criterias.filter((cr) => queries.hasOwnProperty(cr.field) && queries[cr.field] !== undefined)
    
    const whereClause = filterBuilder(newCriteria)
        
    const sortSet = {
        current : 'current',
        likes : 'likes'
    }
      

    if(sort == sortSet.current){sort =`P.id DESC`}
    else if(sort == sortSet.likes){sort = `likesNum DESC, p,id DESC`}

  
    const posts = await appDataSource.query(       
        ` 
            SELECT 
                P.id,
                U1.description,
                U1.profile_image,
                U1.nickname,
                CAST(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_OBJECT('inPostId', PI.id, 'image', PI.image, 'desc', PI.description)), "]") as JSON) as postinfo,
                CAST(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_OBJECT('commentId', C.id, 'comment', C.comment, 'postId', C.post_id, 'nickname', U2.nickname, 'profile', U2.profile_image)), "]")  as JSON) as commentInfo,
                COUNT (DISTINCT U2.id) AS commentsNum,
                COUNT (DISTINCT U3.id) AS likesNum,
                CASE WHEN L2.user_id = ? THEN 1 ELSE 0 END as likeEx, 
                P.create_at
            FROM posts as P
            INNER JOIN posts_infomations as PI
            ON PI.post_id = P.id
            INNER JOIN posts_products_infomations PPI
            ON PPI.post_info_id = PI.id
            INNER JOIN products PD
            ON PD.id = PPI.product_id
            INNER JOIN users as U1
            ON P.user_id = U1.id
            INNER JOIN comments C
            ON P.id = C.post_id
            INNER JOIN users as U2
            ON U2.id = C.user_id
            INNER JOIN likes as L
            ON P.id = L.post_id
            INNER JOIN users as U3
            ON U3.id = L.user_id
            LEFT JOIN likes L2
            ON L2.post_id = P.id 
            AND L2.user_id = ? 
            ${ whereClause }
            GROUP BY P.id
            ORDER BY ${sort} 
            limit ?
            offset ?
            `, [userId, userId, limit, offset]
        )
        return posts
    }catch(err) {
        throw new BaseError(500, `INVALID_DATA_INPUT`);
    }    
}

const follows = async(userId, limit, offset) => {
    try{
    const follows = await appDataSource.query(
        `
        SELECT
            P.id,
            U1.profile_image,
            U1.nickname,
            CAST(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_OBJECT('inPostId', PI.id, 'image', PI.image, 'desc', PI.description)), "]") as JSON) as postinfo,
            COUNT (DISTINCT U2.id) AS commentsNum,
            COUNT (DISTINCT U3.id) AS likesNum,
            CASE WHEN L2.user_id = ? THEN 1 ELSE 0 END as likeEx, 
            P.create_at
            FROM posts as P
            INNER JOIN posts_infomations as PI
            ON PI.post_id = P.id
            INNER JOIN posts_products_infomations PPI
            ON PPI.post_info_id = PI.id
            INNER JOIN products PD
            ON PD.id = PPI.product_id
            INNER JOIN users as U1
            ON P.user_id = U1.id
            INNER JOIN follows as F
            ON F.follow_id = U1.id
            INNER JOIN comments C
            ON P.id = C.post_id
            INNER JOIN users as U2
            ON U2.id = C.user_id
            INNER JOIN likes as L
            ON P.id = L.post_id
            INNER JOIN users as U3
            ON U3.id = L.user_id
            LEFT JOIN likes L2
            ON L2.post_id = P.id 
            AND L2.user_id = ? 
            GROUP BY P.id
            ORDER BY P.create_at DESC 
            limit ?
            offset ?
    `, [userId, userId, limit, offset]
    )
    return follows
    }
    catch(err) {
        console.log(err)
        throw new BaseError(500,`INVALID_DATA_INPUT`);
    }
}

const addFollow = async(followerId, writerId) => {
    try{
        const result = await appDataSource.query(
            `
                INSERT INTO follows(
                    follow_id,
                    follower_id
                )VALUES (?, ?)
            `, [writerId, followerId]
        )
        return result
    }catch{
        console.log(err)
        throw new BaseError(500, `INVALID_DATA_INPUT`);
    }
}

const deleteFollow = async(userId) => {
    try{
    const deleteFollow = await appDataSource.query(
        `
            DELETE FROM follows
            WHERE follower_id =?
        `, [userId]
    )
    return deleteFollow
    }catch{
        console.log(err)
        throw new BaseError(500, `INVALID_DATA_INPUT`);
    }
}

module.exports = {
    posts,
    follows,
    addFollow,
    deleteFollow,
}

///case and then 이나 분리 하기 유저아이디.
// 작성자 프로필 (이미지, 유저 닉네입)
// 글 사진 1개 description, 좋아요 개수, 댓글 개수만
// 정렬은? 글 작성순