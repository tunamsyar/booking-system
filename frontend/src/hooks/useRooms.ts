import { useEffect } from 'react';
import { useApi } from './useApi';
import { apiService } from '../services/api';
import { RoomWithAvailability } from '../types';

export function useRooms() {
  const api = useApi<RoomWithAvailability[]>();

  const loadRooms = async () => {
    try {
      await api.execute(() => apiService.getRooms());
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return {
    rooms: api.data || [],
    loading: api.loading,
    error: api.error,
    refetch: loadRooms,
  };
}
