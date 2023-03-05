import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./ProductEntity";

@Entity("colors")
export class ColorEntity {
  @PrimaryGeneratedColumn({ comment: "색상 인덱스" })
  id!: number;

  @Column({ type: "varchar", comment: "색상" })
  color!: string;

  @OneToMany(() => ProductEntity, (product) => product.color)
  products!: ProductEntity[];
}
