import { useEffect, useState, useCallback } from 'react';
import { useApi } from './useApi';
import { apiService } from '../services/api';
import { Booking, CreateBookingRequest } from '../types';

export function useBookings() {
  const api = useApi<Booking[]>();
  const [bookingInProgress, setBookingInProgress] = useState<string | null>(null);

  const loadBookings = async () => {
    try {
      await api.execute(() => apiService.getUserBookings());
    } catch (error) {
      console.error('Failed to load bookings:', error);
    }
  };

  const createBooking = useCallback(async (bookingRequest: CreateBookingRequest) => {
    const slotKey = `${bookingRequest.roomId}-${bookingRequest.timeSlot}`;
    setBookingInProgress(slotKey);

    try {
      await apiService.createBooking(bookingRequest);
      await loadBookings();
      return true;
    } catch (error) {
      throw error;
    } finally {
      setBookingInProgress(null);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, []);

  return {
    bookings: api.data || [],
    loading: api.loading,
    error: api.error,
    bookingInProgress,
    createBooking,
    refetch: loadBookings,
  };
}
