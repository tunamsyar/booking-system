import React from "react";
import { RoomWithAvailability, TimeSlot } from "../types";
import PeopleIcon from "../assets/svg/PeopleIcon";

interface RoomCardProps {
  room: RoomWithAvailability;
  onBooking: (roomId: number, timeSlot: string) => Promise<void>;
  bookingInProgress: string | null;
  getSlotButtonClass: (slot: TimeSlot, roomId: number) => string;
  getSlotButtonText: (slot: TimeSlot, roomId: number) => string;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onBooking,
  bookingInProgress,
  getSlotButtonClass,
  getSlotButtonText,
}) => {
  const availableCount = room.availableSlots.filter(
    (slot) => slot.available
  ).length;

  return (
    <div className="room-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
        <div className="inline-flex items-center mt-1 text-sm text-gray-600">
          <PeopleIcon />
          <span>Capacity: {room.capacity} people</span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          {availableCount} of {room.availableSlots.length} slots available
        </p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Available Times
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {room.availableSlots.map((slot) => {
            const slotKey = `${room.id}-${slot.time}`;
            const isBookingThisSlot = bookingInProgress === slotKey;
            const isDisabled = !slot.available || isBookingThisSlot;

            return (
              <button
                key={slot.time}
                onClick={() => !isDisabled && onBooking(room.id, slot.time)}
                disabled={isDisabled}
                className={getSlotButtonClass(slot, room.id)}
                title={
                  !slot.available
                    ? "This slot is already booked"
                    : isBookingThisSlot
                    ? "Booking in progress..."
                    : `Book ${room.name} at ${slot.time}`
                }
              >
                {getSlotButtonText(slot, room.id)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
