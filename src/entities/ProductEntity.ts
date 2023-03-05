import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ColorEntity } from "./ColorEntity";
import { PostProductEntity } from "./PostProductEntity";

@Entity("products")
export class ProductEntity {
  @PrimaryGeneratedColumn({ comment: "제품 인덱스" })
  id!: number;

  @Column({ type: "varchar", comment: "제품 명" })
  name!: string;

  @Column({ type: "varchar", comment: "제품 설명" })
  description!: string;

  @Column({ type: "varchar", comment: "제품 이미지" })
  image!: string;

  @Column({ type: "int", comment: "색상 참조id", name: "color_id" })
  colorId!: number;

  @ManyToOne(() => ColorEntity, (color) => color.products)
  color!: ColorEntity;

  @OneToMany(() => PostProductEntity, (post) => post.product)
  posts!: PostProductEntity[];
}
