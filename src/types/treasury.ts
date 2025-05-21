/**
 * Treasury metrics interface
 */
export interface TreasuryMetrics {
  /** Total Value Locked in USD */
  tvl: number;
  /** Annual Percentage Yield */
  apy: number;
}

/**
 * API response status
 */
export type ApiStatus = "idle" | "loading" | "success" | "error";

/**
 * API error interface
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
