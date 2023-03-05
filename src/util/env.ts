import dotenv from "dotenv";
dotenv.config();

/**
 * env 의존성 주입 클래스
 */
export class Env {
  private static env: Env | null = null;

  // env 주입
  public static getInstance() {
    if (this.env === null) this.env = new Env();

    return this.env;
  }

  // env 가져오기
  public getEnv(target: string) {
    const env = process.env[target];
    if (typeof env === "undefined") {
      throw new Error(`${target} 환경변수가 존재하지 않습니다.`);
    }

    return env;
  }
}
