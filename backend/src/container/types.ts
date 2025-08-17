export const TYPES = {
  // Data Source
  DataSource: Symbol.for('DataSource'),

  // Repositories
  RoomRepository: Symbol.for('RoomRepository'),
  BookingRepository: Symbol.for('BookingRepository'),

  // Services
  RoomService: Symbol.for('RoomService'),
  BookingService: Symbol.for('BookingService'),

  // Controllers
  RoomController: Symbol.for('RoomController'),
  BookingController: Symbol.for('BookingController')
} as const;
