import { injectable, inject } from 'inversify';
import { IRoomRepository } from '../repositories/RoomRepository';
import { IBookingRepository } from '../repositories/BookingRepository';
import { TYPES } from '../container/types';
import { Room } from '../entities/Room';
import { RoomWithAvailability, TimeSlot } from '../types';
import { InternalServiceError } from '../errors';

export interface IRoomService {
  getAllRooms(): Promise<Room[]>;
  getRoomById(id: number): Promise<Room | null>;
  getRoomsWithAvailability(date?: string): Promise<RoomWithAvailability[]>;
}

@injectable()
export class RoomService implements IRoomService {
  private readonly timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  constructor(
    @inject(TYPES.RoomRepository) private roomRepository: IRoomRepository,
    @inject(TYPES.BookingRepository) private bookingRepository: IBookingRepository
  ) { }

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.findAll();
  }

  async getRoomById(id: number): Promise<Room | null> {
    return this.roomRepository.findById(id);
  }

  async getRoomsWithAvailability(date?: string): Promise<RoomWithAvailability[]> {
    const targetDate = date || this.getTodayDateString();
    try {
      const rooms = await this.roomRepository.findAll();
      const roomsWithAvailability: RoomWithAvailability[] = await Promise.all(
        rooms.map(async (room) => {
          const availableSlots: TimeSlot[] = await Promise.all(
            this.timeSlots.map(async (time) => {
              const available = await this.bookingRepository.isSlotAvailable(
                room.id,
                time,
                targetDate
              );
              return { time, available };
            })
          );

          return {
            ...room,
            availableSlots
          };
        })
      );

      return roomsWithAvailability;
    }
    catch(error){
      throw new InternalServiceError('Failed to fetch room availability')
    }
  }

  private getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }
}
