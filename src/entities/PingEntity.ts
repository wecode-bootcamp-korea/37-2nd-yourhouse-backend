import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ping")
export class PingEntity {
  @PrimaryGeneratedColumn({ comment: "핑 인덱스 id" })
  id!: number;

  @Column({
    type: "varchar",
    comment: "콘텐츠",
    nullable: false,
  })
  content!: string;
}
