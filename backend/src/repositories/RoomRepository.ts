import { injectable, inject } from 'inversify';
import { DataSource, Repository } from 'typeorm';
import { Room } from '../entities/Room';
import { TYPES } from '../container/types';

export interface IRoomRepository {
  findAll(): Promise<Room[]>;
  findById(id: number): Promise<Room | null>;
}

@injectable()
export class RoomRepository implements IRoomRepository {
  private repository: Repository<Room>;

  constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
    this.repository = dataSource.getRepository(Room);
  }

  async findAll(): Promise<Room[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Room | null> {
    return this.repository.findOne({ where: { id } });
  }
}
