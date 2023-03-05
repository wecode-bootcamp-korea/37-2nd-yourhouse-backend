import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostInfoEntity } from "./PostInfoEntity";

@Entity("styles")
export class StyleEntity {
  @PrimaryGeneratedColumn({ comment: "스타일 인덱스" })
  id!: number;

  @Column({ type: "varchar", comment: "스타일 명" })
  style!: string;

  @OneToMany(() => PostInfoEntity, (postInfo) => postInfo.style)
  postInfo!: PostInfoEntity[];
}
