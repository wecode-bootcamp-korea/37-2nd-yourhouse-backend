import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./UserEntity";
import { PostInfoEntity } from "./PostInfoEntity";
import { LikeEntity } from "./LikeEntity";
import { CommentEntity } from "./CommentEntity";

@Entity("posts")
export class PostEntity {
  @PrimaryGeneratedColumn({ comment: "게시글 인덱스" })
  id!: number;

  @Column({ type: "int", comment: "유저 참조id", name: "user_id" })
  userId!: number;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user!: UserEntity;

  @OneToMany(() => PostInfoEntity, (postInfo) => postInfo.post)
  postInfo!: PostInfoEntity[];

  @OneToMany(() => LikeEntity, (likes) => likes.post)
  likes!: LikeEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.post)
  comments!: CommentEntity[];
}
