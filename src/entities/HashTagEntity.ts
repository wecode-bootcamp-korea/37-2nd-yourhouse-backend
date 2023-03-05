import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostInfoEntity } from "./PostInfoEntity";

@Entity("hashtags")
export class HashTagsEntity {
  @PrimaryGeneratedColumn({ comment: "해쉬태그 인덱스" })
  id!: number;

  @Column({ type: "varchar", comment: "해쉬태그 명" })
  name!: string;

  @Column({ type: "int", comment: "게시글 정보 참조id", name: "post_info_id" })
  postInfoId!: number;

  @ManyToOne(() => PostInfoEntity, (postInfo) => postInfo.hashtags)
  postInfo!: PostInfoEntity;
}
