import { injectable, inject } from 'inversify';
import { IBookingRepository } from '../repositories/BookingRepository';
import { IRoomService } from './RoomService';
import { TYPES } from '../container/types';
import { BookingWithRoomName, CreateBookingRequest } from '../types';
import { ConflictError, NotFoundError } from '../errors';

export interface IBookingService {
  createBooking(request: CreateBookingRequest): Promise<BookingWithRoomName>;
  getUserBookings(userId: string): Promise<BookingWithRoomName[]>;
  isSlotAvailable(roomId: number, timeSlot: string, date: string): Promise<boolean>;
}

@injectable()
export class BookingService implements IBookingService {
  constructor(
    @inject(TYPES.BookingRepository) private bookingRepository: IBookingRepository,
    @inject(TYPES.RoomService) private roomService: IRoomService
  ) { }

  async createBooking(request: CreateBookingRequest): Promise<BookingWithRoomName> {
    const { userId, roomId, timeSlot, date = this.getTodayDateString() } = request;

    // Validate room exists
    const room = await this.roomService.getRoomById(roomId);
    if (!room) {
      throw new NotFoundError('Room not found');
    }

    const normalizedTime = this.normalizeTimeString(timeSlot);

    // Check availability
    const isAvailable = await this.bookingRepository.isSlotAvailable(roomId, normalizedTime, date);
    if (!isAvailable) {
      throw new ConflictError('Time slot is already booked');
    }

    // Create booking
    const booking = await this.bookingRepository.create({
      userId,
      roomId,
      timeSlot: normalizedTime,
      date
    });

    return {
      ...booking,
      roomName: room.name
    };
  }

  async getUserBookings(userId: string): Promise<BookingWithRoomName[]> {
    const bookings = await this.bookingRepository.findByUser(userId);
    return bookings.map(booking => ({
      ...booking,
      roomName: booking.room.name
    }));
  }

  async isSlotAvailable(roomId: number, timeSlot: string, date: string): Promise<boolean> {
    return this.bookingRepository.isSlotAvailable(roomId, timeSlot, date);
  }

  private getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }

  private normalizeTimeString(time: string): string {
    const [h, m] = time.split(":").map(Number);
    if (
      Number.isNaN(h) || Number.isNaN(m) ||
      h < 0 || h > 23 ||
      m < 0 || m > 59
    ) {
      throw new Error(`Invalid time format: ${time}`);
    }
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  }
}
