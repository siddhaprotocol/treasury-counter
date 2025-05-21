import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { fetchTreasuryMetrics } from "../services/treasuryApi";
import { TreasuryMetrics, ApiStatus, ApiError } from "../types/treasury";
import styles from "./TreasuryCounter.module.css";

/**
 * TreasuryCounter Component
 *
 * Displays animated treasury metrics (TVL and APY) fetched from the API
 */
export default function TreasuryCounter() {
  // State for metrics data, loading status, and errors
  const [metrics, setMetrics] = useState<TreasuryMetrics | null>(null);
  const [status, setStatus] = useState<ApiStatus>("idle");
  const [error, setError] = useState<ApiError | null>(null);

  // Animation springs
  const tvlSpring = useSpring({
    from: { value: 0 },
    to: { value: metrics?.tvl || 0 },
    config: { tension: 170, friction: 26 },
    reset: !!metrics, // Reset when metrics change
  });

  const apySpring = useSpring({
    from: { value: 0 },
    to: { value: metrics?.apy || 0 },
    config: { tension: 170, friction: 26 },
    reset: !!metrics, // Reset when metrics change
  });

  // Fetch data on component mount
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setStatus("loading");
        setError(null);

        const data = await fetchTreasuryMetrics();
        setMetrics(data);
        setStatus("success");
      } catch (err) {
        console.error("Failed to fetch treasury data:", err);
        setError(err as ApiError);
        setStatus("error");
      }
    };

    loadMetrics();
  }, []);

  // Log errors but don't render the component if there was an error
  useEffect(() => {
    if (error) {
      console.error("Treasury counter error:", error.message);
    }
  }, [error]);

  // Don't render the component if there's no data or there was an error
  if (status === "error" || !metrics) return null;

  // Format the TVL value with commas
  const formattedTvl = tvlSpring.value.to((value) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(value);
  });

  // Format the APY value with one decimal place
  const formattedApy = apySpring.value.to((value) => {
    return `${value.toFixed(1)} %`;
  });

  return (
    <div className={styles.container} data-testid="treasury-counter">
      <div className={styles.metric}>
        <div className={styles.label}>Total Value Locked</div>
        <span
          className={styles.value + " " + styles.tvlValue}
          aria-live="polite"
          aria-atomic="true"
          data-testid="tvl-value"
        >
          $<animated.span>{formattedTvl}</animated.span>
        </span>
      </div>

      <div className={styles.metric}>
        <div className={styles.label}>Annual Percentage Yield</div>
        <span
          className={styles.value + " " + styles.apyValue}
          aria-live="polite"
          aria-atomic="true"
          data-testid="apy-value"
        >
          <animated.span>{formattedApy}</animated.span>
        </span>
      </div>
    </div>
  );
}
