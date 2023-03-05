import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostInfoEntity } from "./PostInfoEntity";
import { ProductEntity } from "./ProductEntity";

@Entity("post_products")
export class PostProductEntity {
  @PrimaryGeneratedColumn({ comment: "게시글 제품 인덱스" })
  id!: number;

  @Column({ type: "int", comment: "제품 X좌표" })
  offsetX!: number;

  @Column({ type: "int", comment: "제품 Y좌표" })
  offsetY!: number;

  @Column({ type: "int", comment: "게시글 정보 참조id", name: "post_info_id" })
  postInfoId!: number;

  @Column({ type: "int", comment: "제품 참조id", name: "product_id" })
  productId!: number;

  @ManyToOne(() => PostInfoEntity, (postInfo) => postInfo.products)
  postInfo!: PostInfoEntity;

  @ManyToOne(() => ProductEntity, (product) => product.posts)
  product!: ProductEntity;
}
