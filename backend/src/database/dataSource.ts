import { DataSource } from 'typeorm';
import { Room } from '../entities/Room';
import { Booking } from '../entities/Booking';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.join(__dirname, '../../bookings.db'),
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  entities: [Room, Booking],
  migrations: [],
  subscribers: [],
});

export const initializeSampleData = async (dataSource: DataSource) => {
  const roomRepository = dataSource.getRepository(Room);

  const existingRooms = await roomRepository.count();
  if (existingRooms === 0) {
    const sampleRooms = [
      { name: 'Conference Room A', capacity: 8 },
      { name: 'Meeting Room B', capacity: 4 },
      { name: 'Huddle Space C', capacity: 2 }
    ];

    const rooms = roomRepository.create(sampleRooms);
    await roomRepository.save(rooms);
    console.log('Sample rooms inserted');
  }
};
