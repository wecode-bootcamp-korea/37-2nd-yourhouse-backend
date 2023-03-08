export interface KakaoInfo {
  id: number;
  kakao_account: KakaoAccount;
}

interface KakaoAccount {
  profile: KakaoProfile;
  email: string;
}

interface KakaoProfile {
  nickname: string;
  profile_image_url: string;
}

export interface ResponseKaKaoToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  scope: string;
}
