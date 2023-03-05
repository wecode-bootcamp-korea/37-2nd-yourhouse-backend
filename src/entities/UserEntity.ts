import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: "유저 인덱스" })
  id!: number;

  @Column({ type: "bigint", comment: "소셜로그인 id" })
  social_id!: number;

  @Column({ type: "varchar", comment: "이메일" })
  email!: string;

  @Column({ type: "varchar", comment: "닉네임" })
  nickname!: string;

  @Column({ type: "varchar", comment: "프로필 이미지" })
  profile_image!: string;

  @Column({ type: "varchar", comment: "자기소개" })
  description!: string;
}
