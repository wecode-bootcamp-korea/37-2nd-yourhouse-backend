import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostInfoEntity } from "./PostInfoEntity";

@Entity("room_sizes")
export class RoomSizeEntity {
  @PrimaryGeneratedColumn({ comment: "룸 사이즈 인덱스" })
  id!: number;

  @Column({ type: "varchar", comment: "룸 사이즈" })
  size!: string;

  @OneToMany(() => PostInfoEntity, (postInfo) => postInfo.roomSize)
  postInfo!: PostInfoEntity[];
}
