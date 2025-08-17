import React from "react";
import { ViewType } from "../types";
import NavButton from "./NavButton";

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  bookingCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
  bookingCount,
}) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Meeting Room Booking
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <NavButton
              label="Available Rooms"
              view="rooms"
              currentView={currentView}
              onViewChange={onViewChange}
            />

            <NavButton
              label="My Bookings"
              view="bookings"
              currentView={currentView}
              onViewChange={onViewChange}
              badgeCount={bookingCount}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
