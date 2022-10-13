const {appDataSource} = require('./dataSource')

const createPost = async(userId, postData, image) => {

    const queryRunner = appDataSource.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{

        const post = await queryRunner.query(
            `INSERT INTO posts(
                user_id
            ) VALUES( ? )
            `,
            [userId]
        )


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
            [postData.size, postData.residence, postData.style, postData.space, post.insertId, image.location, postData.comment]
        )

    
        let bulkHastagData = "";
        for ( i=0; i < postData.hashTag.length; i++){
            bulkHastagData += `("${postData.hashTag[i]}",${postInfo.insertId}),`
        }
    
        bulkHastagData = bulkHastagData.slice(0,-1)
    
        await queryRunner.query(
            `INSERT INTO hashtags(
                name,
                post_info_id
            ) VALUES` + bulkHastagData
        )
        
    
        await queryRunner.query(
            `INSERT INTO posts_products_infomations(
                post_info_id,
                product_id,
                offsetX,
                offsetY
            ) VALUES (?,?,?,?)`,
            [postInfo.insertId, postData.marker.productId, postData.marker.x, postData.marker.y]
        )


        await queryRunner.commitTransaction()

    } catch(err){
        console.log(err)
        await queryRunner.rollbackTransaction();
        const error = new Error(`ROLLBACK : ${err.message}`);
        error.statusCode = 400;
        throw error;

    } finally{
        await queryRunner.release();
    }
    

}


module.exports = {
    createPost,
}