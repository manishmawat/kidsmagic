# Math Practice - Production Ready App

A modern, responsive React 19 web application for interactive math practice built with Vite, TypeScript, Tailwind CSS, and React Router.

## 🎯 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Fully Responsive**: Mobile-first design that works on all devices
- **Local Storage**: Persistent progress tracking with no backend required
- **Clean Architecture**: Well-organized folder structure for scalability
- **UI Components**: Pre-built shadcn/ui components with Tailwind CSS
- **State Management**: Context API ready (can be extended with Zustand)
- **Accessibility**: WCAG compliant components and practices
- **Developer Experience**: ESLint, Prettier, TypeScript strict mode

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Header, Footer, Container)
│   └── ui/             # shadcn/ui components (Button, Card, etc)
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── QuestsPage.tsx
│   ├── StatsPage.tsx
│   ├── SettingsPage.tsx
│   └── NotFoundPage.tsx
├── layouts/            # Layout components
│   └── MainLayout.tsx
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useTimer.ts
│   └── index.ts
├── context/            # React Context for state
│   └── AppContext.tsx
├── services/           # Business logic services
│   ├── storageService.ts
│   └── userService.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── cn.ts          # Class name merging utility
│   ├── formatters.ts  # Formatting utilities
│   └── index.ts
├── router/             # React Router configuration
│   └── index.tsx
├── styles/             # Global and component styles
│   ├── globals.css
│   └── animations.css
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173`

### Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint TypeScript and ESLint
npm run lint

# Fix lint issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without changes
npm run format:check

# Type check without emitting
npm run type-check
```

## 🎨 Architecture & Design Patterns

### State Management

The app uses React Context API for global state. Located in `src/context/AppContext.tsx`:

- User data
- App settings
- Statistics
- Loading states

Easy to extend with Zustand if needed for more complex state management.

### Storage

The `storageService` in `src/services/` handles all LocalStorage operations:
- Prefixes all keys with `math-practice:` to avoid conflicts
- Provides type-safe get/set/remove operations
- Includes error handling

### Custom Hooks

Reusable hooks available in `src/hooks/`:
- `useLocalStorage`: Easy localStorage management with reactive state
- `useTimer`: Timer management with start/stop/reset controls

### TypeScript Types

All types are defined in `src/types/index.ts`:
- User, ProgressRecord, Quest, Statistics, AppSettings

## 🎯 Routing

React Router is configured in `src/router/index.tsx`:

- `/` - Home page with overview
- `/quests` - Browse and start math quests
- `/stats` - View performance statistics
- `/settings` - Customize app settings
- `*` - 404 Not Found page

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui Components**: Pre-built accessible components
- **CSS Variables**: Theme support with light/dark mode variables
- **Responsive**: Mobile-first, responsive design with breakpoints

### Theme Customization

Tailwind theme is configured in `tailwind.config.ts`. Modify colors and spacing there.

CSS custom properties are in `src/styles/globals.css`:
```css
--primary, --secondary, --accent, --destructive, --muted, etc.
```

## 🧹 Code Quality

- **ESLint**: Configured in `eslint.config.js` with TypeScript and React rules
- **Prettier**: Code formatter configured in `prettier.config.js`
- **TypeScript**: Strict mode enabled with no `any` types allowed
- **No Duplicated Code**: Components and utilities are reusable

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Flexible layouts using CSS Grid and Flexbox
- Touch-friendly interface elements

## 🔐 Best Practices

✅ Functional components only
✅ Strong TypeScript typing
✅ No `any` types
✅ Reusable components
✅ Clean code and file organization
✅ Keep files under 300 lines
✅ Accessibility considerations (ARIA labels, semantic HTML)
✅ LocalStorage for persistence
✅ No external APIs or backend dependencies

## 🚀 Next Steps - Math Logic Implementation

To implement math functionality:

1. Create `src/services/mathService.ts` for problem generation
2. Create a `PracticePage.tsx` for the active quiz interface
3. Add problem-solving components in `src/components/practice/`
4. Extend types to include problem and answer data
5. Update `userService` to track answers and scoring
6. Create hooks for quiz session management

## 📝 File Size Guidelines

All components follow a max ~300 line guideline for maintainability:
- Small components: < 100 lines
- Medium components: 100-200 lines  
- Large components: 200-300 lines
- Over 300 lines: Consider splitting into smaller components

## 🤝 Contributing

When adding new features:

1. Follow the established folder structure
2. Create reusable components
3. Add TypeScript types for new data models
4. Use path aliases (`@/...`) for imports
5. Keep components focused and single-responsibility
6. Add proper error handling

## 📄 License

MIT

---

**Happy coding! 🧮✨**
