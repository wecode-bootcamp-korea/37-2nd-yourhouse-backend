import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { PostEntity } from "./PostEntity";

@Entity("comments")
export class CommentEntity {
  @PrimaryGeneratedColumn({ comment: "댓글 인덱스" })
  id!: number;

  @Column({ type: "varchar", comment: "코멘트" })
  comment!: string;

  @Column({ type: "int", comment: "유저 참조id", name: "user_id" })
  userId!: number;

  @Column({ type: "int", comment: "게시글 참조id", name: "post_id" })
  postId!: number;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user!: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post!: PostEntity;
}
