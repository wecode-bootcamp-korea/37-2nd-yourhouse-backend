import axios from "axios";
import jwt from "jsonwebtoken";
import { KakaoInfo, ResponseKaKaoToken } from "../types/KakaoInfo";
import { Env } from "../util/env";

export class AuthService {
  private readonly env = Env.getInstance();

  /**
   * 카카오 소셜 로그인 유저 정보 획득
   */
  public async getKakaoUserInfo(code: string): Promise<KakaoInfo> {
    const { access_token } = await this.getKaKaoToken(code);
    const userInfo: KakaoInfo = await this.getKakaoUser(access_token);

    return userInfo;
  }

  /**
   * KAKAO accessToken 획득
   */
  private async getKaKaoToken(code: string): Promise<ResponseKaKaoToken> {
    const { data } = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      `grant_type=authorization_code&client_id=${this.env.getEnv(
        "KAKAO_CLIENTID"
      )}&redirect_uri=${this.env.getEnv("KAKAO_REDIRECTURI")}&code=${code}`
    );

    return data;
  }

  /**
   * KAKAO 유저 정보 획득
   */
  private async getKakaoUser(token: string): Promise<KakaoInfo> {
    const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public createJwt(userId: number): string {
    return jwt.sign({ user_id: userId }, this.env.getEnv("JWT_SECRET"));
  }
}
