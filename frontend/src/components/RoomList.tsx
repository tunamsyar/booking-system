import React, { useState } from "react";
import { useRooms } from "../hooks/useRooms";
import { useBookings } from "../hooks/useBookings";
import { TimeSlot } from "../types";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { RoomCard } from "./RoomCard";

export const RoomList: React.FC = () => {
  const { rooms, loading, error, refetch } = useRooms();
  const { createBooking, bookingInProgress } = useBookings();
  const [bookingError, setBookingError] = useState<string | null>(null);

  const handleBooking = async (roomId: number, timeSlot: string) => {
    setBookingError(null);

    try {
      await createBooking({ roomId, timeSlot });
      await refetch();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Booking failed";
      setBookingError(errorMessage);
    }
  };

  const getSlotButtonClass = (slot: TimeSlot, roomId: number) => {
    const slotKey = `${roomId}-${slot.time}`;
    const isBookingThisSlot = bookingInProgress === slotKey;

    if (isBookingThisSlot) {
      return "time-slot-button time-slot-booking";
    }

    if (!slot.available) {
      return "time-slot-button time-slot-unavailable";
    }

    return "time-slot-button time-slot-available";
  };

  const getSlotButtonText = (slot: TimeSlot, roomId: number) => {
    const slotKey = `${roomId}-${slot.time}`;
    const isBookingThisSlot = bookingInProgress === slotKey;

    if (isBookingThisSlot) {
      return "Booking...";
    }

    return slot.time;
  };

  if (loading) {
    return <LoadingSpinner message="Loading available rooms..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const renderErrorMessage = (bookingError: string | null ) => {
    if (bookingError) {
      return (
        <ErrorMessage
          message={bookingError}
          onRetry={() => setBookingError(null)}
        />
      );
    }
  };

  const renderNoAvailableRooms = (roomLength: number) => {
    if(roomLength === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No rooms available</p>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Available Meeting Rooms
        </h2>
        <p className="text-gray-600">
          Click on an available time slot to book it
        </p>
      </div>
      {renderErrorMessage(bookingError)}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onBooking={handleBooking}
            bookingInProgress={bookingInProgress}
            getSlotButtonClass={getSlotButtonClass}
            getSlotButtonText={getSlotButtonText}
          />
        ))}
      </div>

      {renderNoAvailableRooms(rooms.length)}
    </div>
  );
};
