// src/utils/constants.ts
export const API_BASE_URL = 'http://localhost:3001/api';
export const MOCK_USER_ID = 'user123';

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SLOT_UNAVAILABLE: 'This time slot is no longer available.',
  ROOM_NOT_FOUND: 'Room not found.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;
