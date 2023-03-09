import { NextFunction, Request, Response } from "express";
import { Env } from "../util/env";
import { BaseError } from "../util/BaseError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";

/**
 * Jwt 인증 인가 / 유저 정보 전달
 */
const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
  const env = Env.getInstance();
  const userRepository = new UserRepository();

  const auth = req.headers.authorization;

  // 헤더에 토큰이 없을 때
  if (!auth) {
    throw new BaseError("Dont find token", 403);
  }

  try {
    const verifyToken = jwt.verify(auth, env.getEnv("JWT_SECRET")) as JwtPayload;

    const user = await userRepository.findOne({ where: { id: verifyToken.user_id } });

    // 일치하는 유저 정보가 없을 때
    if (!user) {
      throw new BaseError("INVALID_USER", 403);
    }

    // req.user 에 유저 정보 할당
    req.user = user;
  } catch (error) {
    console.error(error);
    throw error;
  }

  next();
};

/**
 * 로그인 하지 않아도 되는 권한에 유저 정보 확인
 */
const getUserInfoByJwt = async (req: Request, res: Response, next: NextFunction) => {
  const env = Env.getInstance();
  const userRepository = new UserRepository();

  const auth = req.headers.authorization;

  if (!auth) {
    return next();
  }
  try {
    const verifyToken = jwt.verify(auth, env.getEnv("JWT_SECRET")) as JwtPayload;
    const user = await userRepository.findOne({ where: { id: verifyToken.user_id } });
    if (!user) {
      return next();
    }

    req.user = user;
  } catch (error) {
    next();
  }

  next();
};

export { verifyJwt, getUserInfoByJwt };
