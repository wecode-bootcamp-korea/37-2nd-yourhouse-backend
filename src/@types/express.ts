import { Express } from "express-serve-static-core";
import { UserEntity } from "../entities/UserEntity";

declare global {
  namespace Express {
    interface Request {
      user: UserEntity;
    }
  }
}
