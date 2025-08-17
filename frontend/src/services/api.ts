import { RoomWithAvailability, Booking, CreateBookingRequest } from '../types';
import { API_BASE_URL, MOCK_USER_ID } from '../utils/constants';
import { ApiErrorHandler } from '../utils/ApiErrorHandler';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': MOCK_USER_ID, // Change this to play around with other user view
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      return await ApiErrorHandler.handleResponse(response);
    } catch (error) {
      ApiErrorHandler.handleError(error);
    }
  }

  async getRooms(): Promise<RoomWithAvailability[]> {
    return this.request<RoomWithAvailability[]>('/rooms');
  }

  async createBooking(booking: CreateBookingRequest): Promise<Booking> {
    return this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  }

  async getUserBookings(): Promise<Booking[]> {
    return this.request<Booking[]>('/bookings');
  }

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
