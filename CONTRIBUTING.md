<div align="center">

**بسم الله الرحمن الرحيم**

</div>

# Contributing to مصحف موريتانيا | Mushaf Mauritania

Thank you for your interest in contributing to Mushaf Mauritania! This guide will help you get started with contributing to our project.

## 🎯 Upcoming Features & Improvements

We have exciting plans to enhance the application. Here are some areas where we need your help:

### 1. Progressive Web App (PWA)

- Implement offline functionality
- Add install prompts
- Enable push notifications
- Optimize caching strategies

### 2. Desktop Layout Enhancement

- Create responsive desktop layouts
- Add keyboard shortcuts
- Improve navigation for larger screens
- Optimize reading experience

### 3. Audio Integration

- Support for multiple Qurra'a (قراء)
- Verse-by-verse playback
- Continuous playback mode
- Audio quality options

### 4. Additional Features

- Advanced bookmarking system
- Personal notes and annotations
- Multi-language support
- Social sharing capabilities
- And much more, إن شاء الله

## 📋 Quick Start

1. **Fork and Clone**

   ```bash
   git clone https://github.com/ahmed-abdat/quran-mr.git
   cd quran-mr
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🎯 How to Contribute

### 1. Find Something to Work On

- Check our <a href="https://github.com/ahmed-abdat/quran-mr/issues" target="_blank" rel="noopener noreferrer">Issues</a>
- Look for `good first issue` labels
- <a href="https://wa.me/22242049074" target="_blank" rel="noopener noreferrer">Contact us on WhatsApp</a> for questions

### 2. Make Your Changes

1. Create a new branch

   ```bash
   git checkout -b fix/your-feature-name
   ```

2. Make your changes

   - Keep changes focused and small
   - Follow our code style
   - Add comments to explain complex logic
   - Test your changes thoroughly

3. Commit your changes
   ```bash
   git add .
   git commit -m "fix: describe your changes"
   ```

### 3. Submit Your Changes

1. Push to your fork

   ```bash
   git push origin fix/your-feature-name
   ```

2. Create a Pull Request
   - Fill out the PR template
   - Link related issues
   - Add a clear description
   - Include screenshots for UI changes

## 📝 Code Style Guide

### File Structure

```
src/
├── app/                # routes
├── components/         # UI components
├── features/          # Feature modules
└── data/              # Global data
└── lib/               # Utility functions
```

### Component Guidelines

1. **Keep Components Simple**

   ```tsx
   // Good
   function SearchBox({ onSearch }: { onSearch: (text: string) => void }) {
     return (
       <input
         type="text"
         onChange={(e) => onSearch(e.target.value)}
         placeholder="البحث..."
         className="search-input"
       />
     );
   }
   ```

2. **Use Clear Names**

   ```tsx
   // Good
   function AyahDisplay({ ayahText, surahName }: AyahDisplayProps) {
     return (
       <div className="ayah-container">
         <p className="ayah-text">{ayahText}</p>
         <span className="surah-name">{surahName}</span>
       </div>
     );
   }
   ```

3. **Add Comments for Complex Logic**
   ```tsx
   // Calculate the ayah position based on the page dimensions and scroll position
   function calculateAyahPosition(
     ayahIndex: number,
     pageHeight: number
   ): number {
     // Your implementation here
     return position;
   }
   ```

### Naming Conventions

- **Files**: Use kebab-case

  ```
  search-box.ts
  ayah-display.ts
  ```

- **Components**: Use PascalCase

  ```tsx
  export function SearchBox() {}
  export function AyahDisplay() {}
  ```

- **Functions**: Use camelCase
  ```tsx
  function handleSearch() {}
  function updateAyahPosition() {}
  ```

### Branch Names

Use descriptive branch names with prefixes:

- `feat/` for new features
  ```bash
  feat/search-improvements
  ```
- `fix/` for bug fixes
  ```bash
  fix/ayah-highlighting
  ```
- `docs/` for documentation
  ```bash
  docs/contributing-guide
  ```

### Commit Messages

Write clear commit messages:

```bash
# Format
type: short description

# Examples
feat: add advanced search functionality
fix: correct ayah highlighting
docs: update contributing guide
```

## 🌟 Best Practices

1. **Keep Changes Small**

   - Focus on one feature or fix at a time
   - Split large changes into smaller PRs
   - Make incremental improvements

2. **Write Good Comments**

   - Explain why, not what
   - Document complex logic
   - Keep comments up to date
   - Use JSDoc for function documentation

3. **Follow Existing Patterns**

   - Look at similar components
   - Use existing utility functions
   - Match the project's style
   - Maintain consistency

4. **Ask for Help**
   - Create a Discussion for questions
   - Ask for clarification on issues
   - Request code reviews early
   - Be open to feedback

## 💡 Tips for Success

- Test your changes thoroughly before submitting
- Update documentation when needed
- Respond to review comments promptly
- Be patient and respectful
- Contact us on WhatsApp if you need help
- Follow the project's coding standards

## 🚫 Common Mistakes to Avoid

- Don't submit large, unrelated changes
- Don't skip documentation
- Don't ignore code style guidelines
- Don't forget to test your changes
- Don't submit breaking changes without discussion
- Don't leave console.log statements in your code

---

<div align="center">

Thank you for helping make Mushaf Mauritania better! ❤️

Need help? <a href="https://wa.me/22242049074" target="_blank" rel="noopener noreferrer">Contact us on WhatsApp</a>

<a href="https://qurane-mr.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo</a> | <a href="https://github.com/ahmed-abdat/quran-mr/issues" target="_blank" rel="noopener noreferrer">Report Bug</a>

</div>
