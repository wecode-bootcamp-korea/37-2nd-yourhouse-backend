const appDataSource = require("./datasource")

const posts = async(sort, color, roomsize, residence, style, space, limit, offset)=> {
    let filters = 'WHERE'
    if (color !== undefined ){
        filters += ` C.id in (`+ String(color) + `)`};
    if(roomsize !== undefined && filters == 'WHERE'){
        filters += ` RS.id in (`+ String(roomsize)+`)`}
    else if(roomsize !== undefined && filters !== 'WHERE'){
        filters += ` AND RS.id in (` + String(roomsize) + `)`}
		if(style !== undefined && filters == 'WHERE'){
        filters += ` S.id in (` + String(style) + `)`}
    else if(style !== undefined && filters !== 'WHERE'){
        filters += ` AND S.id in (` + String(style) + `)`}
    if(residence !== undefined && filters == 'WHERE'){
        filters += ` R.id in (` + String(residence)+`)`}
    else if(residence !== undefined && filters !== 'WHERE'){
        filters += ` AND R.id in (` + String(residence) + `)`}
    if(space !== undefined && filters == 'WHERE'){
        filters += ` SP.id in (` + String(space) + `)`}
    else if(space !== undefined && filters !=='WHERE'){
        filters +=` AND SP.id in (` + String(space) + `)`}
    
    if( color == undefined && roomsize ==undefined && style ==undefined && residence ==undefined && space ==undefined){
        filters =''
    }
//상항연산자 아이디어 활용해보자
    console.log(typeof(sort))
    const sortSet = {
        current : 'current',
        likes : 'likes'
    }
    if(sort == sortSet.current){sort =`P.id DESC`}
    console.log(sort)  
        // else if (sort = sortSet.likes){
        //     sort =`likesNum`
        // }
    

    
   
    // else if(sort =='좋아요' ){
    //        const sortSet = {
    //    lowPrice : 'price ace'
    //    }
    // }

    const posts = await appDataSource.query(       
        ` 
            SELECT DISTINCT
                P.id,
                U.description,
                U.profile_image,
                U.nickname, 
                P.create_at
            FROM posts as P
            JOIN posts_infomations as PI
            ON PI.post_id = P.id
            JOIN room_sizes as RS
            ON RS.id = PI.room_size_id
            JOIN posts_products_infomations PPI
            ON PPI.post_info_id = PI.id
            JOIN products PD
            ON PD.id = PPI.product_id
            JOIN colors as C
            ON C.id = PD.color_id
            JOIN styles as S
            ON S.id = PI.style_id
            JOIN residences as R
            ON R.id = PI.residence_id
            JOIN spaces as SP
            ON SP.id = PI.space_id
            JOIN users as U
            ON P.user_id = U.id
            ${filters} 
            order by ${sort} 
            limit ?, ?
            `, [limit, offset]
        )
        console.log(posts)
        return posts
    }
    //product가 연결안됨 그안에 컬러있음 알터 테이블필요
   
module.exports = {
    posts
}

///////////////idea 저장///////////////// 
// let pagenaiton = ''
    
//     pagenation += pagenaiton + (`limit = ${limit} offset = ${offset}`)


 // for(i=0 ; i < posts.length ; i++){
        //     const postsIndex = posts[i]
        //     const postId  = Object.entries(postsIndex)[0]
        //     const postIdNum = Object.entries(postId)[1]
        
        //     const commentsNum = await appDataSource.query (
        //         `
        //             SELECT 
        //                 COUNT(*) as commentsNumber
        //             FROM comments c 
        //             JOIN posts p
        //             ON p.id = c.post_id
        //             WHERE p.id = ?
        //         `, [postIdNum]
        //         )
        //     posts[i].commentsNum = number(commentsNum)
            
        //     const likesNum = await appDataSource.query(
        //         `
        //             SELECT
        //                 CONUNt(*) as likesNumber
        //             FROM likes L
        //             JOIN posts P
        //             ON P.id = L.post_id
        //             WHERE P.id = ?
        //         `,[postIdNum]
        //     )    
        //     posts[i].likesNum = number(likesNum)
        
        //     const firstPostInfo = await appDataSource.query(
        //         `
        //             SELECT 
        //                 P.id
        //                 comment,
        //                 image,
        //                 description
        //             FROM posts p
        //             JOIN posts_informations PI
        //             ON p.id = PI.post_id
        //             JOIN comments C
        //             ON p.id = C.post_id
        //             WHERE p.id = ?
        //             AND PI.id = 1
        //         `, [postId]
        //     )
        //     posts[i].firstPostInfo = firstPostInfo
        // }

        // if(sort == 2) {
        //     const likeSortPosts = posts.sort((a, b) => (a.likesNum > b.likesNum ? 1 : -1))
        //     const likePosts = likeSortPosts.slice(offset, (offset+limit))
        //     return likePosts
        // }