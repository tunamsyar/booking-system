import { ERROR_MESSAGES } from './constants'

export class ApiErrorHandler {
  static async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: `HTTP ${response.status}`,
      }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    return response.json();
  }

  static handleError(error: unknown): never {
    if (error instanceof TypeError) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
  }
}
