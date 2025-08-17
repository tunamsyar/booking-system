import React from "react";
import { useBookings } from "../hooks/useBookings";
import { Booking } from "../types";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import LockIcon from "../assets/svg/LockIcon";
import ClockIcon from "../assets/svg/ClockIcon";
import CalendarIcon from "../assets/svg/CalendarIcon";

export const MyBookings: React.FC = () => {
  const { bookings, loading, error, refetch } = useBookings();

  if (loading) {
    return <LoadingSpinner message="Loading your bookings..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const todayBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return bookingDate.toDateString() === today.toDateString();
  });

  const futureBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return bookingDate > today;
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h2>
        <p className="text-gray-600">
          You have {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <LockIcon />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-500">
            Go to Available Rooms to make your first booking
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {todayBookings.length > 0 && (
            <BookingSection title="Today's Bookings" bookings={todayBookings} />
          )}

          {futureBookings.length > 0 && (
            <BookingSection title="Future Bookings" bookings={futureBookings} />
          )}
        </div>
      )}
    </div>
  );
};

interface BookingSectionProps {
  title: string;
  bookings: Booking[];
}

const BookingSection: React.FC<BookingSectionProps> = ({ title, bookings }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isToday = (dateString: string) => {
    const bookingDate = new Date(dateString);
    const today = new Date();
    return bookingDate.toDateString() === today.toDateString();
  };

  const renderTodayText = (date: string) => {
    if (isToday(date)) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Today
        </span>
      )
    }
  }

  return (
    <div className="booking-card">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900">{booking.roomName}</h4>
        {renderTodayText(booking.date)}
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <ClockIcon className="w-4 h-4 mr-2" />
          {booking.timeSlot}
        </div>

        <div className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {formatDate(booking.date)}
        </div>
      </div>
    </div>
  );
};
