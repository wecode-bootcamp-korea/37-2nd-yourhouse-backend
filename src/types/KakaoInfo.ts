export interface KakaoInfo {
  id: number;
  email: string;
  kakao_account: KakaoAccount;
}

interface KakaoAccount {
  profile: KakaoProfile;
}

interface KakaoProfile {
  nickname: string;
  profile_image_url: string;
}
