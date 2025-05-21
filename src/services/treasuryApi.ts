import { TreasuryMetrics, ApiError } from '../types/treasury';

/**
 * Base API URL
 */
const API_BASE_URL = 'https://mint.meghamgarg.com';

/**
 * Treasury API endpoints
 */
const ENDPOINTS = {
  METRICS: `${API_BASE_URL}/metrics/treasury`,
};

/**
 * Fetches treasury metrics data
 * @returns A promise that resolves to treasury metrics data
 * @throws {ApiError} If there's an error fetching the data
 */
export const fetchTreasuryMetrics = async (): Promise<TreasuryMetrics> => {
  try {
    const response = await fetch(ENDPOINTS.METRICS);
    
    if (!response.ok) {
      const error: ApiError = {
        message: `Failed to fetch treasury metrics: ${response.statusText}`,
        status: response.status,
      };
      throw error;
    }
    
    const data = await response.json();
    
    // Sanitize the data with Number()
    return {
      tvl: Number(data.tvl),
      apy: Number(data.apy)
    };
  } catch (error) {
    // If it's already an ApiError, rethrow it
    if (error && typeof error === 'object' && 'status' in error) {
      throw error;
    }
    
    // Otherwise, create a generic ApiError
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred while fetching treasury metrics',
    };
    
    throw apiError;
  }
};