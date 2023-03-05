import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { SignInDto } from "../dtos/SignInDto";
import { UserService } from "../services/UserService";

export class UserController {
  private readonly userService = new UserService();

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const querySchema = Joi.object({
        code: Joi.string().required(),
      });

      const query = await querySchema.validateAsync(req.query);

      const result = await this.userService.signIn(query);

      res.status(200).json({ ...result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
