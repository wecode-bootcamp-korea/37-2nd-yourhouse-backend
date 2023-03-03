import { createApp } from "./app";

/**
 * 서버 실행
 */
const serverStart = () => {
  const app = createApp();

  const options = {
    port: Number(process.env.PORT) || 3000,
  };
  // 서버 시작
  app.listen(options.port, () => {
    console.log(`Server on! Port : ${options.port}`);
  });
};

serverStart();
