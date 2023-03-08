import { DeepPartial, FindOneOptions } from "typeorm";
import { dataSource } from "../config/typeormConfig";
import { UserEntity } from "../entities/UserEntity";

export class UserRepository {
  private readonly userRepository = dataSource.getRepository(UserEntity);

  public async findOne(
    options: FindOneOptions<UserEntity>
  ): Promise<UserEntity | null> {
    return await this.userRepository.findOne(options);
  }

  public async save(entity: DeepPartial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.save(entity);
  }
}
