import axios from "axios";
import jwt from "jsonwebtoken";
import { Env } from "../util/env";

export class AuthService {
  private readonly env = Env.getInstance();

  /**
   * KAKAO accessToken 획득
   */
  public async getKaKaoToken(code: string) {
    const { data } = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=urf-8",
      },
      data: `grant_type=authorization_code&client_id=${this.env.getEnv(
        "KAKAO_CLIENTID"
      )}&redirect_uri=${this.env.getEnv("KAKAO_REDIRECTURI")}&code=${code}`,
    });

    return data;
  }

  /**
   * KAKAO 유저 정보 획득
   */
  public async getKaKaoUserInfo(token: string) {
    const { data } = await axios({
      url: "https://kapi.kakao.com/v2/user/me",
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }

  public createJwt(userId: number) {
    return jwt.sign({ user_id: userId }, this.env.getEnv("JWT_SECRET"));
  }
}
