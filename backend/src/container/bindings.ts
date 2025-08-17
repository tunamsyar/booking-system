import { DataSource } from 'typeorm';
import { container } from './Container';
import { TYPES } from './types';
import { AppDataSource } from '../database/dataSource';

// Repositories
import { IRoomRepository, RoomRepository } from '../repositories/RoomRepository';
import { IBookingRepository, BookingRepository } from '../repositories/BookingRepository';

// Services
import { IRoomService, RoomService } from '../services/RoomService';
import { IBookingService, BookingService } from '../services/BookingService';

// Controllers
import { IRoomController, RoomController } from '../controllers/RoomController';
import { IBookingController, BookingController } from '../controllers/BookingController';

export const configureContainer = () => {
  // Data Source
  container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource);

  // Repositories
  container.bind<IRoomRepository>(TYPES.RoomRepository).to(RoomRepository);
  container.bind<IBookingRepository>(TYPES.BookingRepository).to(BookingRepository);

  // Services
  container.bind<IRoomService>(TYPES.RoomService).to(RoomService);
  container.bind<IBookingService>(TYPES.BookingService).to(BookingService);

  // Controllers
  container.bind<IRoomController>(TYPES.RoomController).to(RoomController);
  container.bind<IBookingController>(TYPES.BookingController).to(BookingController);
};
