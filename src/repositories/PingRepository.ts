import { dataSource } from "../config/config";
import { PingEntity } from "../entities/PingEntity";

export class PingRepository {
  private readonly pingRepository = dataSource.getRepository(PingEntity);

  public async getPing() {
    return this.pingRepository.findOne({});
  }
}
