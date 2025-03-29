<div align="center">

**بسم الله الرحمن الرحيم**

</div>

# Mushaf Mauritania Codebase Documentation

## Overview

This document provides a comprehensive guide to the technical architecture and implementation details of the Mushaf Mauritania project.

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI & Radix UI
- **State Management**: Zustand
- **Form Validation**: Zod

## Project Structure

```
src/
├── app/                # Next.js app router pages
├── components/         # Shared UI components
├── features/          # Feature-based modules
│   └── mushaf/        # Main Mushaf feature
├── lib/               # Shared utilities
└── data/              # Static data and assets
```

## Core Features Implementation

### 1. Progressive Web App (PWA)

```typescript
// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  // your next config
});
```

### 2. Audio Integration

```typescript
interface AudioPlayerState {
  isPlaying: boolean;
  currentAyah: number;
  currentQari: string;
  volume: number;
  playbackRate: number;
}

const useAudioPlayerStore = create<AudioPlayerState>()((set) => ({
  // Implementation
}));
```

### 3. Desktop Layout

```typescript
// components/layouts/MushafLayout.tsx
export function MushafLayout({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className={cn("flex", isDesktop ? "flex-row" : "flex-col")}>
      {/* Implementation */}
    </div>
  );
}
```

## Text Highlighting

### 1. Safe Text Highlighting

```typescript
// features/quran/utils/text-highlight.ts
interface TextSegment {
  text: string;
  isHighlighted: boolean;
}

export function highlightTextSafely(
  text: string,
  query: string
): TextSegment[] {
  // Safely highlights text without using dangerouslySetInnerHTML
  // Returns array of text segments with highlight information
}
```

### 2. Font Management

```typescript
// features/quran/utils/font-utils.ts
export function getFontClass(fontType: string): string {
  // Returns appropriate font class based on font type
  // Supports multiple Uthmanic font variations
}
```

## State Management

### 1. Navigation Store

```typescript
interface MushafNavigationState {
  activeView: MushafView;
  activeSurahId?: number;
  activeAyahId?: number;
  // Actions
  setActiveView: (view: MushafView) => void;
  setActiveSurah: (id?: number) => void;
  setActiveAyah: (id?: number) => void;
}
```

### 2. Settings Store

```typescript
interface MushafSettingsState {
  fontSize: number;
  displayMode: "separate" | "continuous";
  fontType: string;
  isUIVisible: boolean;
  theme: "light" | "dark";
  // Actions
  setFontSize: (size: number) => void;
  setFontType: (type: string) => void;
  toggleDisplayMode: () => void;
  toggleUIVisibility: () => void;
  setTheme: (theme: "light" | "dark") => void;
}
```

### 3. Search Store

```typescript
interface QuranSearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  // Actions
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}
```

## Component Architecture

### 1. SurahMushafView

```typescript
// features/quran/components/views/SurahMushafView.tsx
interface SurahMushafViewProps {
  surah: Surah;
}

export function SurahMushafView({ surah }: SurahMushafViewProps) {
  // Displays complete surah with:
  // - Adaptive layout (separate/continuous modes)
  // - Text highlighting for search results
  // - Smooth scrolling to ayahs
  // - Reading mode optimizations
}
```

### 2. Basmala

```typescript
// features/quran/components/ui/Basmala.tsx
interface BasmalaProps {
  surahId: number;
}

export function Basmala({ surahId }: BasmalaProps) {
  // Displays Bismillah with:
  // - Conditional rendering based on surah
  // - Font type support
  // - Responsive styling
}
```

## Data Flow

1. **Data Loading**

   ```typescript
   // hooks/useMushafData.ts
   export function useMushafData() {
     // Implementation
   }
   ```

2. **State Updates**
   ```typescript
   // store/useMushafNavigationStore.ts
   export const useMushafNavigationStore = create<MushafNavigationState>()(
     (set) => ({
       // Implementation
     })
   );
   ```

## Performance Optimizations

1. **Code Splitting**

   ```typescript
   // Dynamic imports for heavy components
   const AudioPlayer = dynamic(() => import("./AudioPlayer"), {
     loading: () => <AudioPlayerSkeleton />,
   });
   ```

2. **Image Optimization**
   ```typescript
   // next.config.js
   module.exports = {
     images: {
       domains: ["your-cdn.com"],
       formats: ["image/avif", "image/webp"],
     },
   };
   ```

## Accessibility

1. **ARIA Labels**

   ```typescript
   <button aria-label="التالي" onClick={handleNext}>
     {/* Implementation */}
   </button>
   ```

2. **Keyboard Navigation**
   ```typescript
   function handleKeyPress(e: KeyboardEvent) {
     // Implementation
   }
   ```

## Error Handling

```typescript
// utils/error-handling.ts
export function handleMushafError(error: MushafError): void {
  // Implementation
}
```

## Security Considerations

1. **Input Sanitization**

   ```typescript
   function sanitizeUserInput(input: string): string {
     // Implementation
   }
   ```

2. **API Protection**
   ```typescript
   // middleware.ts
   export function middleware(req: NextRequest) {
     // Implementation
   }
   ```

## Deployment

```bash
# Production build
npm run build

# Start production server
npm start
```

## Contributing Code

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Shadcn UI Documentation](https://ui.shadcn.com)

---

<div align="center">

For more detailed information about specific features, please refer to the respective feature documentation in the `docs/features/` directory.

</div>
