import { dataSource } from "../config/typeormConfig";
import { UserEntity } from "../entities/UserEntity";

export async function typeormSeed() {
  // 유저 seed
  await dataSource.getRepository(UserEntity).insert([
    {
      social_id: 123456,
      email: "kisuk333@gmail.com",
      profile_image: "http://naver.com",
      nickname: "기석",
    },
    {
      social_id: 1234569,
      email: "gildong623@naver.com",
      profile_image: "http://naver.com",
      nickname: "홍길동",
    },
    {
      social_id: 123452,
      email: "kisuk623@kakao.com",
      profile_image: "http://naver.com",
      nickname: "기석2",
    },
  ]);
}
