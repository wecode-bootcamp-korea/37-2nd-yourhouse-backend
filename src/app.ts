import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes";
import { dataSource } from "./config/typeormConfig";
dotenv.config();

/**
 * 서버 생성
 */
const createApp = () => {
  const app = express();

  // TypeORM DB 연결
  if (process.env.NODE_ENV !== "test") {
    dataSource
      .initialize()
      .then(() => {
        console.log("Database initialize!!");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  app.use(router);

  // 지정하지 않은 엔드포인트 에러 처리
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json("ERR_NOT_FOUND");
  });

  // 전역 에러 핸들링
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // 에러 메소드, 엔드포인트 수집
    const errorMessage = `ERROR ${req.method} - ${req.path}`;
    console.error(errorMessage);

    // 에러 코드 존재 유무
    if (err.errorCode) {
      res.status(err.status).json(err);
    } else {
      res.status(err.status || 500).json({ message: err.message || "ERROR_UNKNOWN" });
    }
  });

  return app;
};

export { createApp };
