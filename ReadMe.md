# Treasury Counter

<div align="center">
  <img src="public/globe.svg" alt="Mint Treasury" width="150" />
  <h3>Real-time Treasury Metrics Visualization</h3>
</div>

## 🚀 Overview

Treasury Counter is a high-performance component that displays key protocol metrics with beautiful spring animations. It shows the Total Value Locked (TVL) and Annual Percentage Yield (APY) with smooth counting animations and proper number formatting.

## ✨ Features

- **Spring Animations**: Smooth counting animations from 0 to final values using react-spring
- **Responsive Design**: Optimized for both desktop (1440×900) and mobile (375×812)
- **Accessibility**: ARIA attributes for screen readers
- **Error Handling**: Robust error handling with graceful fallbacks
- **Enterprise Architecture**: Separation of concerns with service layer
- **Type Safety**: Comprehensive TypeScript types throughout the codebase

## 📊 Demo

The Treasury Counter is live at `/treasury` and fetches its data from:

```
https://mint.meghamgarg.com/metrics/treasury
```

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Animation**: react-spring
- **UI**: Custom components
- **Error Handling**: React Error Boundaries

## 📁 Project Structure

```
.
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.tsx            # Error boundary component
│   │   ├── TreasuryCounter.tsx          # The main counter component
│   │   └── TreasuryCounter.module.css   # Styles for counter component
│   ├── pages/
│   │   ├── _app.tsx                     # Next.js app wrapper
│   │   ├── _document.tsx                # Next.js document setup
│   │   ├── index.tsx                    # Home page
│   │   └── treasury.tsx                 # Treasury metrics page
│   ├── services/
│   │   └── treasuryApi.ts               # API service for treasury data
│   ├── styles/
│   │   └── globals.css                  # Global styles
│   └── types/
│       └── treasury.ts                  # TypeScript types for treasury data
├── .eslintrc.json             # ESLint configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── ReadMe.md                  # Project documentation
```

## 💻 Getting Started

### Prerequisites

- Node.js (v22.11.0 or newer)
- Yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/siddhaprotocol/treasury-counter.git
   cd treasury-counter
   ```

2. Install dependencies

   ```bash
   yarn install
   ```

3. Start the development server

   ```bash
   yarn dev
   ```

4. Open your browser and navigate to
   ```
   http://localhost:3000/treasury
   ```

## 🏗️ Component Architecture

### TreasuryCounter

The main component is responsible for:

1. Fetching treasury metrics from the API
2. Animating the values from 0 to their final values
3. Formatting numbers properly (commas for TVL, one decimal place for APY)
4. Providing proper accessibility attributes

```tsx
<div className={styles.container}>
  <div className={styles.metric}>
    <div className={styles.label}>Total Value Locked</div>
    <span className={styles.value} aria-live="polite" aria-atomic="true">
      $<animated.span>{formattedTvl}</animated.span>
    </span>
  </div>

  <div className={styles.metric}>
    <div className={styles.label}>Annual Percentage Yield</div>
    <span className={styles.value} aria-live="polite" aria-atomic="true">
      <animated.span>{formattedApy}</animated.span>
    </span>
  </div>
</div>
```

### API Service

The API service separates data fetching logic from the component:

```typescript
export const fetchTreasuryMetrics = async (): Promise<TreasuryMetrics> => {
  try {
    const response = await fetch(API_ENDPOINTS.TREASURY_METRICS);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return {
      tvl: Number(data.tvl),
      apy: Number(data.apy),
    };
  } catch (error) {
    console.error("Failed to fetch treasury metrics:", error);
    throw error;
  }
};
```

## 🎨 Styling

The component uses CSS Modules for scoped styling. Key style features:

- Dark background (#0D0F23)
- Light text (#FFFFFF)
- Accent color for APY (#00C374)
- Responsive layout with fluid sizing
- Clean typography with consistent spacing

## 🔄 Animation

The animation is powered by react-spring to create smooth, spring-based transitions:

- Animation starts at 0 and counts up to the actual value
- Spring configuration provides natural-feeling motion
- Animation completes within 1.5 seconds
- Both metrics animate simultaneously

## 🛡️ Error Handling

The implementation includes robust error handling:

- API errors are caught and logged
- Error boundary catches runtime errors
- Graceful degradation (component doesn't render on error)
- Detailed error messages for debugging

## 💯 Best Practices

- **Separation of Concerns**: API logic is separate from UI components
- **TypeScript**: Comprehensive type definitions
- **Error Handling**: Robust error boundaries and fallbacks
- **Accessibility**: ARIA attributes and semantic markup
- **Responsive Design**: Works on all screen sizes
- **Clean Code**: Well-organized, commented code
- **Optimized Rendering**: Efficient state management

## 📈 Future Enhancements

- Add more treasury metrics as they become available
- Implement dark/light theme support
- Add localization for international number formats
- Create animated transitions between data updates
- Integrate with wallet connection for personalized metrics
