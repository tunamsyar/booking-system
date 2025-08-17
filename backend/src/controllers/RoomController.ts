import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { IRoomService } from '../services/RoomService';
import { TYPES } from '../container/types';

export interface IRoomController {
  getAllRooms(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@injectable()
export class RoomController implements IRoomController {
  constructor(@inject(TYPES.RoomService) private roomService: IRoomService) { }

  async getAllRooms(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rooms = await this.roomService.getRoomsWithAvailability();
      res.json(rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      next(error)
    }
  }
}
