import { Geist } from "next/font/google";
import TreasuryCounter from "../components/TreasuryCounter";
import ErrorBoundary from "../components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Treasury Page Component
 * 
 * Displays the TreasuryCounter component wrapped in an ErrorBoundary
 */
export default function Treasury() {
  return (
    <div
      className={`${geistSans.className} grid min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      style={{ backgroundColor: "#0D0F23" }}
      data-testid="treasury-page"
    >
      <main className="flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Treasury Metrics</h1>
          <ErrorBoundary
            fallback={
              <div className="text-white text-center p-4 bg-red-900/30 rounded-lg">
                <p>Unable to load treasury data. Please try again later.</p>
              </div>
            }
            onError={(error) => {
              console.error("Treasury page error:", error);
            }}
          >
            <TreasuryCounter />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}