import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./PostEntity";
import { LikeEntity } from "./LikeEntity";
import { FollowEntity } from "./FollowEntity";
import { CommentEntity } from "./CommentEntity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: "유저 인덱스" })
  id!: number;

  @Column({ type: "bigint", comment: "소셜로그인 id" })
  social_id!: number;

  @Column({ type: "varchar", comment: "이메일", unique: true })
  email!: string;

  @Column({ type: "varchar", comment: "닉네임" })
  nickname!: string;

  @Column({ type: "varchar", comment: "프로필 이미지" })
  profile_image!: string;

  @Column({ type: "varchar", comment: "자기소개", nullable: true })
  description!: string;

  @OneToMany(() => PostEntity, (posts) => posts.user)
  posts!: PostEntity[];

  @OneToMany(() => LikeEntity, (likes) => likes.user)
  likes!: LikeEntity[];

  @OneToMany(() => FollowEntity, (follows) => follows.followUser)
  follows!: FollowEntity[];

  @OneToMany(() => FollowEntity, (followers) => followers.followerUser)
  followers!: FollowEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.user)
  comments!: CommentEntity[];
}
