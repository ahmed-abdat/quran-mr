<div align="center">

**بسم الله الرحمن الرحيم**

</div>

# مصحف موريتانيا | Mushaf Mauritania Feature Documentation

## Overview

The Mushaf feature provides a complete Quran reading experience tailored for the Mauritanian community, with special attention to local reading preferences and styles. Our goal is to create a platform that preserves and promotes the rich Quranic tradition of Mauritania.

### Community Goals

- 🎯 Preserve Mauritanian Quranic traditions
- 📚 Support local reading styles and preferences
- 🤝 Enable community contributions and feedback
- 🌍 Make the Quran accessible to all Mauritanians

## Directory Structure

```
features/mushaf/
├── components/
│   ├── containers/
│   │   └── MushafContainer.tsx      # Main container
│   ├── layouts/
│   │   ├── MushafLayout.tsx        # Main layout
│   │   ├── NavigationBar.tsx       # Top navigation
│   │   └── BottomBar.tsx          # Bottom navigation
│   ├── views/
│   │   ├── SurahMushafView.tsx    # Enhanced Surah reading view
│   │   ├── SearchView.tsx         # Search interface
│   │   └── SettingsView.tsx       # Settings panel
│   └── ui/
│       ├── AyahRenderer.tsx        # Ayah display with highlighting
│       ├── SurahHeader.tsx        # Surah information
│       ├── Basmala.tsx           # Bismillah display with font support
│       └── SurahNavigation.tsx    # Surah navigation with auto-hide
├── hooks/
│   ├── useMushafData.ts          # Data management
│   ├── useMushafSearch.ts        # Search functionality
│   └── useMushafNavigation.ts    # Navigation control
├── store/
│   ├── useMushafNavigationStore.ts # Navigation state
│   ├── useMushafSettingsStore.ts   # Settings & font state
│   └── useQuranSearchStore.ts     # Search state
├── utils/
│   ├── text-highlight.ts         # Safe text highlighting
│   ├── font-utils.ts            # Font management
│   ├── mushaf-data.ts           # Data processing
│   └── mushaf-search.ts         # Search utilities
└── types/
    └── index.ts                  # Type definitions
```

## Future Community Features

We plan to implement features specifically for the Mauritanian community:

1. **Local Recitation Styles**

   - Support for Warsh recitation
   - Integration of local Quranic schools' styles
   - Community-contributed recitations

2. **Learning Tools**

   - Traditional Mauritanian teaching methods
   - Local scholars' interpretations
   - Community study circles

3. **Community Engagement**
   - Feedback system for improvements
   - Community contributions portal
   - Local events integration

## Contributing to the Project

### For Developers

1. **Setup Development Environment**

   ```bash
   git clone https://github.com/ahmed-abdat/quran-mr.git
   cd quran-mr
   npm install
   npm run dev
   ```

2. **Understanding the Codebase**

   - Review the component structure
   - Check existing implementations
   - Read the documentation

3. **Making Contributions**
   - Pick an issue to work on
   - Follow the coding standards
   - Submit pull requests

### For Non-Developers

1. **Content Contribution**

   - Help with Arabic text verification
   - Provide feedback on UI/UX
   - Suggest new features

2. **Community Support**

   - Share the application
   - Report issues
   - Provide feedback

3. **Documentation**
   - Help improve documentation
   - Translate content
   - Write user guides

## Core Components

### MushafContainer

```typescript
/**
 * Main container for the Mushaf feature.
 * Handles:
 * - Data initialization
 * - View routing
 * - State management
 */
```

### MushafLayout

```typescript
/**
 * Main layout component.
 * Provides:
 * - Navigation bars
 * - Content area
 * - UI visibility control
 */
```

### SurahMushafView

```typescript
/**
 * Enhanced Surah reading view with:
 * - Safe text highlighting without dangerouslySetInnerHTML
 * - Adaptive layout (separate/continuous modes)
 * - Font type support
 * - Smooth scrolling and animations
 * - Search result highlighting
 */
interface SurahMushafViewProps {
  surah: Surah;
}
```

### Text Highlighting

```typescript
/**
 * Safe text highlighting utility
 * Features:
 * - No dangerouslySetInnerHTML
 * - Segment-based highlighting
 * - Search term matching
 * - Clean text processing
 */
interface TextSegment {
  text: string;
  isHighlighted: boolean;
}
```

### Font Management

```typescript
/**
 * Font utilities for Uthmanic script
 * Features:
 * - Multiple font variations
 * - Dynamic font loading
 * - Responsive font sizing
 * - Font class management
 */
function getFontClass(fontType: string): string;
```

### Basmala Component

```typescript
/**
 * Enhanced Basmala component
 * Features:
 * - Conditional rendering
 * - Font type support
 * - Responsive design
 * - Optimized performance
 */
interface BasmalaProps {
  surahId: number;
}
```

### Surah Navigation Component

```typescript
/**
 * SurahNavigation component
 *
 * Provides minimal navigation controls for moving between surahs with focus mode support.
 * Features:
 * - Previous/next surah navigation
 * - Auto-hiding UI based on mouse movement
 * - Keyboard navigation (ArrowLeft/ArrowRight)
 * - Focus mode compatibility
 */
interface SurahNavigationProps {
  surah: Surah;
}
```

#### Features

- **Minimal UI**: Clean, floating navigation bar that doesn't distract from reading
- **Auto-hide Behavior**: Automatically hides when inactive to maximize reading space
- **RTL Navigation Support**: Right-to-left navigation compliant with Arabic reading direction
- **Keyboard Shortcuts**: Support for keyboard navigation (Arrow keys)
- **Focus Mode Compatibility**: Respects the global UI visibility settings
- **Visual Feedback**: Hover and focus states for better user experience
- **Contextual Information**: Shows current surah position and adjacent surah names

#### Implementation

The SurahNavigation component is implemented as a UI component that:

1. Shows the current surah's position out of 114
2. Provides navigation buttons for previous and next surahs
3. Displays tooltips with adjacent surah names
4. Automatically hides after 2 seconds of inactivity
5. Reappears on mouse movement
6. Supports keyboard shortcuts for navigation

#### Usage

```tsx
import { SurahNavigation } from "@/features/quran/components/ui/SurahNavigation";

<SurahNavigation surah={currentSurah} />;
```

#### Technical Details

- **State Management**

  - Uses `useMushafNavigationStore` for surah navigation
  - Uses `useMushafSettingsStore` to respect UI visibility settings
  - Uses `useMushafData` to retrieve adjacent surah information

- **Keyboard Navigation**

  - **Right Arrow** (→): In RTL mode, navigates to the previous surah
  - **Left Arrow** (←): In RTL mode, navigates to the next surah
  - Skips navigation when focus is on input elements

- **Styling**

  - Uses a semi-transparent, backdrop-blurred container
  - Implements smooth transitions and subtle hover effects
  - Maintains a consistent visual language with other UI components
  - Applies responsive sizing and spacing

- **Accessibility**

  - Provides tooltips for navigation buttons
  - Uses ARIA attributes for better screen reader support
  - Supports keyboard navigation
  - Maintains sufficient contrast for text readability

- **Future Enhancements**
  - Jump to Specific Surah: Add a dropdown or quick-access menu
  - Remember Position: Save and restore reading position within a surah
  - Enhanced Gestures: Add swipe gestures for touch devices
  - Progress Indicator: Show reading progress through the current surah

## State Management

### Navigation Store

```

```
