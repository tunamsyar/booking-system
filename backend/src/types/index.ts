export interface Room {
  id: number;
  name: string;
  capacity: number;
}

export interface Booking {
  id: number;
  userId: string;
  roomId: number;
  timeSlot: string;
  date: string;
}

export interface BookingWithRoomName extends Booking {
  roomName: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface RoomWithAvailability extends Room {
  availableSlots: TimeSlot[];
}

export interface CreateBookingRequest {
  userId: string;
  roomId: number;
  timeSlot: string;
  date?: string;
}
