import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("follows")
export class FollowEntity {
  @PrimaryGeneratedColumn({ comment: "팔로우 인덱스" })
  id!: number;

  @Column({ type: "int", comment: "팔로우 신청한 유저id", name: "follow_id" })
  followId!: number;

  @Column({
    type: "int",
    comment: "팔로우 신청 받은 유저id",
    name: "followed_id",
  })
  followedId!: number;

  @ManyToOne(() => UserEntity, (user) => user.follows)
  followUser!: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followers)
  followerUser!: UserEntity;
}
