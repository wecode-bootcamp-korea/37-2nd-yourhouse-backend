import { dataSource } from "../config/typeormConfig";
import axios from "axios";
import request from "supertest";
import { Express } from "express-serve-static-core";
import { createApp } from "../app";
import { KakaoInfo, ResponseKaKaoToken } from "../types/KakaoInfo";
import { typeormSeed } from "./seeds";

let app: Express;
jest.mock("axios");

beforeAll(async () => {
  app = createApp();
  await dataSource.initialize();
  typeormSeed();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("user E2E", () => {
  // 성공
  it("소셜 로그인 성공 시 jwt, nickname, profileImage를 반환한다.", async () => {
    const KakaoAccessToken: ResponseKaKaoToken = {
      access_token: "accesstoken",
      token_type: "access_token",
      refresh_token: "RefreshTopken",
      scope: "profile_image, nickname",
    };
    const KakaoUserInfo: KakaoInfo = {
      id: 1234567,
      kakao_account: {
        email: "kisuk623@gmail.com",
        profile: {
          nickname: "기석",
          profile_image_url: "http://naver.com",
        },
      },
    };

    // 카카오 api mocking
    const axiosPostSpy = jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: KakaoAccessToken });
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: KakaoUserInfo });

    const result = await request(app).get("/user/auth").query({ code: "kakaocode" });

    expect(result.status).toBe(200);
    expect(result.body.nickname).toBe("기석");
    expect(result.body.profileImage).toBe("http://naver.com");
  });
});
