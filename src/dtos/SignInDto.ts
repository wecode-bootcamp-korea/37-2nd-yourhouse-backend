// 소셜 로그인 토큰
export class SignInDto {
  code!: string;
}

// 소셜로그인 반환값
export class ResponseSignInDto {
  accessToken!: string;

  nickname!: string;

  profileImage!: string;
}
