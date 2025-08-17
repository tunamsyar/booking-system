import { injectable, inject } from 'inversify';
import { DataSource, Repository } from 'typeorm';
import { Booking } from '../entities/Booking';
import { TYPES } from '../container/types';

export interface IBookingRepository {
  create(bookingData: Omit<Booking, 'id' | 'room'>): Promise<Booking>;
  findByUser(userId: string): Promise<Booking[]>;
  findByRoomAndDate(roomId: number, date: string): Promise<Booking[]>;
  isSlotAvailable(roomId: number, timeSlot: string, date: string): Promise<boolean>;
}

@injectable()
export class BookingRepository implements IBookingRepository {
  private repository: Repository<Booking>;

  constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
    this.repository = dataSource.getRepository(Booking);
  }

  async create(bookingData: Omit<Booking, 'id' | 'room'>): Promise<Booking> {
    const booking = this.repository.create(bookingData);
    return this.repository.save(booking);
  }

  async findByUser(userId: string): Promise<Booking[]> {
    return this.repository.find({
      where: { userId },
      relations: ['room'],
      order: {
        date: 'ASC',
        timeSlot: 'ASC'
      }
    });
  }

  async findByRoomAndDate(roomId: number, date: string): Promise<Booking[]> {
    return this.repository.find({
      where: { roomId, date }
    });
  }

  async isSlotAvailable(roomId: number, timeSlot: string, date: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { roomId, timeSlot, date }
    });

    return count === 0;
  }
}
