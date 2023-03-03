import { PingRepository } from "../repositories/PingRepository";

export class PingService {
  private readonly pingRepository = new PingRepository();

  public pingTest() {
    return this.pingRepository.getPing();
  }
}
