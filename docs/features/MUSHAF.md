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
│       └── Basmala.tsx           # Bismillah display with font support
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

## State Management

### Navigation Store

```

```
