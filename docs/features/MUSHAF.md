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
│   │   ├── SurahView.tsx          # Surah reading view
│   │   ├── SearchView.tsx         # Search interface
│   │   └── SettingsView.tsx       # Settings panel
│   └── ui/
│       ├── AyahRenderer.tsx        # Ayah display
│       ├── SurahHeader.tsx        # Surah information
│       └── Basmala.tsx           # Bismillah display
├── hooks/
│   ├── useMushafData.ts          # Data management
│   ├── useMushafSearch.ts        # Search functionality
│   └── useMushafNavigation.ts    # Navigation control
├── store/
│   ├── useMushafNavigationStore.ts # Navigation state
│   ├── useMushafSettingsStore.ts   # Settings state
│   └── useQuranSearchStore.ts     # Search state
├── utils/
│   ├── mushaf-data.ts            # Data processing
│   └── mushaf-search.ts          # Search utilities
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

## State Management

### Navigation Store

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

## Community Guidelines

1. **Code Contributions**

   - Follow Arabic naming conventions
   - Add bilingual comments (Arabic/English)
   - Consider local user needs

2. **Feature Requests**

   - Focus on community benefits
   - Consider local usage patterns
   - Maintain accessibility

3. **Documentation**
   - Keep documentation bilingual
   - Include local context
   - Use clear examples

## Getting Help

- 📧 Email: support@quran-mr.com
- 💬 WhatsApp: [Community Support](https://wa.me/22242049074)
- 🌐 Website: [qurane-mr.vercel.app](https://qurane-mr.vercel.app)

## Join Our Community

We welcome all contributions from the Mauritanian community and beyond. Whether you're a developer, designer, scholar, or enthusiast, there's a place for you in our project.

1. **Start Contributing**

   - Check our [Issues](https://github.com/ahmed-abdat/quran-mr/issues)
   - Join our [Discussions](https://github.com/ahmed-abdat/quran-mr/discussions)
   - Contact us on [WhatsApp](https://wa.me/22242049074)

2. **Share Your Knowledge**
   - Help others learn
   - Share your expertise
   - Suggest improvements

Together, we can build a better platform for our community. Join us in this rewarding journey! 🌟

---

<div align="center">

Built with ❤️ by the Mauritanian community, for the Ummah.

</div>
