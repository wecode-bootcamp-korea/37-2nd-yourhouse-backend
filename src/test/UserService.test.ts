import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";
import axios from "axios";
import { ResponseKaKaoToken } from "../types/KakaoInfo";
import { KakaoInfo } from "../types/KakaoInfo";
import { UserRepository } from "../repositories/UserRepository";

describe("UserService 유저 비즈니스 로직", () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let authService: AuthService;

  jest.mock("axios");
  beforeEach(() => {
    userService = new UserService();
    userRepository = new UserRepository();
    authService = new AuthService();
    jest.resetAllMocks();
  });

  describe("signIn() 소셜 로그인", () => {
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
    const existingUser: any = {
      id: 1,
      social_id: 1234567,
      email: "kisuk623@gmail.com",
      profile_image: "http://naver.com",
      nickname: "기석",
      description: "",
    };

    // 성공
    it("소셜 로그인 성공 시 jwt 토큰, nickname, profileImage를 반환한다.", async () => {
      const axiosPostSpy = jest
        .spyOn(axios, "post")
        .mockResolvedValue({ data: KakaoAccessToken });
      const axiosGetSpy = jest
        .spyOn(axios, "get")
        .mockResolvedValue({ data: KakaoUserInfo });
      UserRepository.prototype.findOne = jest.fn();
      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, "findOne")
        .mockResolvedValue(null);
      UserRepository.prototype.save = jest.fn();
      const userRepositorySaveSpy = jest
        .spyOn(userRepository, "save")
        .mockResolvedValue(existingUser);
      AuthService.prototype.createJwt = jest.fn();
      const authServiceCreateJwtSpy = jest
        .spyOn(authService, "createJwt")
        .mockReturnValue("eyasd");

      const result = await userService.signIn({ code: "accesscode" });

      expect(result).toEqual({
        accessToken: "eyasd",
        nickname: "기석",
        profileImage: "http://naver.com",
      });
    });
  });
});
