const { BaseError } = require("../util/error");
const { database, appDataSource } = require("./datasource");

const getPostsList = async (
  userId,
  sort,
  color,
  roomsize,
  residence,
  style,
  space,
  limit,
  offset
) => {
  const queries = {
    userId,
    sort,
    color,
    roomsize,
    residence,
    style,
    space,
    limit,
    offset,
  };
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
      field: "color",
      value: ` C.id in (` + String(color) + `)`,
      condition: ` AND `,
    },
    {
      field: "roomsize",
      value: ` PI.room_size_id in (` + String(roomsize) + `)`,
      condition: ` AND `,
    },
    {
      field: "residence",
      value: ` PI.residence_id in (` + String(residence) + `)`,
      condition: ` AND `,
    },
    {
      field: "style",
      value: ` PI.style_id in (` + String(style) + `)`,
      condition: ` AND `,
    },
    {
      field: "space",
      value: ` PI.space_id in (` + String(space) + `)`,
      condition: ` AND `,
    },
  ];

  const newCriteria = criterias.filter(
    (cr) => queries.hasOwnProperty(cr.field) && queries[cr.field] !== undefined
  );

  const whereClause = filterBuilder(newCriteria);

  const sortSet = {
    current: 1,
    likes: 2,
  };
  if (sort == sortSet.current || !sort) {
    sort = `P.id DESC`;
  } else if (sort == sortSet.likes) {
    sort = `likesNum DESC, P.id DESC`;
  }
  const result = await database.query(
    `SELECT 
            P.id,
            U1.id writerId,
            U1.description,
            U1.profile_image,
            U1.nickname,
            CAST(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_OBJECT('inPostId', PI.id, 'image', PI.image, 'desc', PI.description)), "]") as JSON) as postinfo,
            CAST(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_OBJECT('commentId', C.id, 'comment', C.comment, 'postId', C.post_id, 'nickname', U2.nickname, 'profile', U2.profile_image)), "]")  as JSON) as commentInfo,
            (SELECT
                COUNT(*)
            FROM comments 
            WHERE P.id = comments.post_id) AS commentsNum,
            (SELECT
                COUNT(*)
            FROM likes
            WHERE likes.post_id = P.id) AS likesNum,
            CASE WHEN L2.user_id = ? THEN 1 ELSE 0 END as likeEx,
            CASE WHEN F.follow_id = ? THEN 1 ELSE 0 END as followEx,  
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
        LEFT JOIN comments C
        ON P.id = C.post_id
        LEFT JOIN users as U2
        ON U2.id = C.user_id
        LEFT JOIN likes as L
        ON P.id = L.post_id
        LEFT JOIN users as U3
        ON U3.id = L.user_id
        LEFT JOIN likes L2
        ON L2.post_id = P.id 
        AND L2.user_id = ?
        LEFT JOIN follows as F
        ON F.follower_id = P.user_id
        AND F.follow_id = ?
        ${whereClause}
        GROUP BY P.id
        limit 20
        offset 0`,
    [userId, userId, userId, userId, limit, offset]
  );

  return result.fetchAll();
};

const getFollowsList = async (userId, limit, offset) => {
  const result = await database.query(
    `SELECT
            P.id AS postId,
            U1.id as writerId,
            U1.profile_image,
            U1.nickname,
            CAST(CONCAT("[", GROUP_CONCAT(DISTINCT JSON_OBJECT('inPostId', PI.id, 'image', PI.image, 'desc', PI.description)), "]") as JSON) as postinfo,
            COUNT (DISTINCT U2.id) AS commentsNum,
            COUNT (DISTINCT U3.id) AS likesNum,
            CASE WHEN L2.user_id = ? THEN 1 ELSE 0 END as likeEx,
            CASE WHEN F.follow_id = ? THEN 1 ELSE 0 END as followEx,  
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
        LEFT JOIN comments C
        ON P.id = C.post_id
        LEFT JOIN users as U2
        ON U2.id = C.user_id
        LEFT JOIN likes as L
        ON P.id = L.post_id
        LEFT JOIN users as U3
        ON U3.id = L.user_id
        LEFT JOIN likes L2
        ON L2.post_id = P.id 
        AND L2.user_id = ?
        INNER JOIN follows as F
        ON F.follower_id = P.user_id
        AND F.follow_id = ? 
        GROUP BY P.id
        ORDER BY P.id DESC 
        limit ?
        offset ?`,
    [userId, userId, userId, userId, limit, offset]
  );

  return result.fetchAll();
};

const getPostDetail = async (postId) => {
  const result = await database.query(
    `SELECT
            posts.id AS postId,
            pi.id,
            pi.image AS main_pic_url,
            pi.description AS text,
            JSON_ARRAYAGG(JSON_OBJECT("productId", products.id, "name", products.name, "description", products.description, "sub_pic_url", products.image,"offset_X", ppi.offsetX, "offset_Y", ppi.offsetY)) AS products,
            rm.size AS room_size,
            res.type AS residence,
            st.style,
            sp.type AS space,
            (SELECT
                COUNT(*)
            FROM comments
            WHERE posts.id = comments.post_id) AS commentsQuantity
        FROM posts
        INNER JOIN posts_infomations AS pi ON posts.id = pi.post_id
        INNER JOIN room_sizes AS rm ON pi.room_size_id = rm.id
        INNER JOIN residences AS res ON pi.residence_id = res.id
        INNER JOIN styles AS st ON pi.style_id = st.id
        INNER JOIN spaces AS sp ON pi.space_id = sp.id
        LEFT JOIN posts_products_infomations AS ppi ON pi.id = ppi.post_info_id
        LEFT JOIN products ON ppi.product_id = products.id
        WHERE posts.id = ?
        GROUP BY pi.id`,
    [postId]
  );

  return result.fetchAll();
};

const getHashTag = async (id) => {
  const result = await database.query(
    `SELECT
            JSON_ARRAYAGG(name) AS hashTag
        FROM hashtags
        WHERE post_info_id = ?`,
    [id]
  );

  return result.fetchOne().hashTag;
};

const getPostExists = async (id) => {
  const result = await database.query(
    `SELECT EXISTS(
            SELECT
                *
            FROM posts
            WHERE posts.id = ?) AS result`,
    [id]
  );

  return result.isExists();
};

const createPost = async (userId, postData, image) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const post = await queryRunner.query(
      `INSERT INTO posts(
                user_id
            ) VALUES( ? )
            `,
      [userId]
    );

    const postInfo = await queryRunner.query(
      `INSERT INTO posts_infomations(
                room_size_id,
                residence_id,
                style_id,
                space_id,
                post_id,
                image,
                description
            ) VALUES( ?, ?, ?, ?, ?, ?, ?)
            `,
      [
        postData.size,
        postData.residence,
        postData.style,
        postData.space,
        post.insertId,
        image.location,
        postData.comment,
      ]
    );

    let bulkHastagData = "";
    for (i = 0; i < postData.hashTag.length; i++) {
      bulkHastagData += `("${postData.hashTag[i]}",${postInfo.insertId}),`;
    }

    bulkHastagData = bulkHastagData.slice(0, -1);

    await queryRunner.query(
      `INSERT INTO hashtags(
                name,
                post_info_id
            ) VALUES` + bulkHastagData
    );

    await queryRunner.query(
      `INSERT INTO posts_products_infomations(
                post_info_id,
                product_id,
                offsetX,
                offsetY
            ) VALUES (?,?,?,?)`,
      [
        postInfo.insertId,
        postData.marker.productId,
        postData.marker.x,
        postData.marker.y,
      ]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    console.log(err);
    await queryRunner.rollbackTransaction();
    const error = new BaseError(`ROLLBACK : ${err.message}`, 400);
    throw error;
  } finally {
    await queryRunner.release();
  }
};
module.exports = {
  getPostsList,
  getFollowsList,
  getPostDetail,
  getHashTag,
  getPostExists,
  createPost,
};
