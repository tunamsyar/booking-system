import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { IBookingService } from '../services/BookingService';
import { TYPES } from '../container/types';
import { BadRequestError } from '../errors';

export interface IBookingController {
  createBooking(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserBookings(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@injectable()
export class BookingController implements IBookingController {
  constructor(@inject(TYPES.BookingService) private bookingService: IBookingService) { }

  async createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { roomId, timeSlot } = req.body;
      const userId = req.headers['x-user-id'] as string;

      if (!userId) {
        throw new BadRequestError('User ID is required in headers')
      }

      if (!roomId || !timeSlot) {
        throw new BadRequestError('Room ID and time slot are required')
      }

      const booking = await this.bookingService.createBooking({
        userId,
        roomId,
        timeSlot
      });

      res.status(201).json(booking);
    } catch (error) {
      console.error('Error creating booking:', error);
      next(error)
    }
  }

  async getUserBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.headers['x-user-id'] as string;

      if (!userId) {
        throw new BadRequestError('User ID is required in headers')
      }

      const bookings = await this.bookingService.getUserBookings(userId);
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      next(error);
    }
  }
}
