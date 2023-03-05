import { NextFunction, Request, Response } from "express";
import { PingService } from "../services/PingService";

export class PingController {
  private readonly pingService = new PingService();

  public async pingTest(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.pingService.pingTest();

      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
