import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { RoomList } from "./components/RoomList";
import { MyBookings } from "./components/MyBookings";
import { useBookings } from "./hooks/useBookings";
import { ViewType } from "./types";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("rooms");
  const { bookings } = useBookings();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        bookingCount={bookings.length}
      />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentView === "rooms" ? <RoomList /> : <MyBookings />}
      </main>
    </div>
  );
}

export default App;
