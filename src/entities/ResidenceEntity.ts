import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostInfoEntity } from "./PostInfoEntity";

@Entity("residences")
export class ResidenceEntity {
  @PrimaryGeneratedColumn({ comment: "주거공간 인덱스" })
  id!: number;

  @Column({ type: "varchar", comment: "주거 공간 타입" })
  type!: string;

  @OneToMany(() => PostInfoEntity, (postInfo) => postInfo.residence)
  postInfo!: PostInfoEntity[];
}
