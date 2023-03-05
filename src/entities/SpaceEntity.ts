import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PostInfoEntity } from "./PostInfoEntity";

@Entity("spaces")
export class SpaceEntity {
  @PrimaryGeneratedColumn({ comment: "공간 인덱스" })
  id!: number;

  @Column({ type: "varchar", comment: "공간 타입" })
  type!: string;

  @OneToMany(() => PostInfoEntity, (postInfo) => postInfo.space)
  postInfo!: PostInfoEntity;
}
