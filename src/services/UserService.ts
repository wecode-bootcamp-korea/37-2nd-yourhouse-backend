import { UserRepository } from "../repositories/UserRepository";
import { ResponseSignInDto, SignInDto } from "../dtos/SignInDto";
import { AuthService } from "./AuthService";
import { BaseError } from "../util/BaseError";
import { KakaoInfo } from "../types/KakaoInfo";

export class UserService {
  private readonly userRepository = new UserRepository();
  private readonly authService = new AuthService();

  /**
   * 소셜 로그인 / 회원가입
   */
  public async signIn({ code }: SignInDto): Promise<ResponseSignInDto> {
    // 카카오 소셜 로그인 / 유저 정보 획득
    const kakaoToken = await this.authService.getKaKaoToken(code);
    const userInfo: KakaoInfo = await this.authService.getKaKaoUserInfo(
      kakaoToken
    );

    // 유저 정보가 없을 경우
    if (!userInfo.kakao_account) {
      throw new BaseError("KEY_ERROR", 400);
    }

    // 회원가입 여부 확인
    let user = await this.userRepository.findOne({
      where: { email: userInfo.email },
    });

    // 회원가입되지 않은 유저의 경우
    if (!user) {
      // 회원 가입 후 유저 정보 반환
      user = await this.userRepository.save({
        social_id: userInfo.id,
        email: userInfo.email,
        nickname: userInfo.kakao_account.profile.nickname,
        profile_image: userInfo.kakao_account.profile.profile_image_url,
      });
    }

    // Jwt 토큰 발급
    const accessToken = this.authService.createJwt(user.id);

    return {
      accessToken,
      nickname: user.nickname,
      profileImage: user.profile_image,
    };
  }
}
