# 🧮 Math Practice App

A production-ready React 19 web application for interactive math practice. Built with modern technologies, best practices, and an extensible architecture.

## ✨ Tech Stack

- **React** 19 - UI framework
- **TypeScript** - Type safety and developer experience  
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** 7 - Client-side routing
- **shadcn/ui** - Pre-built, accessible UI components
- **Zustand/Context API** - State management ready
- **ESLint & Prettier** - Code quality and formatting

## 🎯 Key Features

✅ **Responsive Design** - Mobile-first, works on all devices  
✅ **LocalStorage Persistence** - Progress saved automatically  
✅ **No Backend Required** - Static web app, deploy anywhere  
✅ **Type-Safe** - Full TypeScript with strict mode  
✅ **Accessible** - WCAG compliant components  
✅ **Scalable Architecture** - Ready to grow with your needs  
✅ **Developer Friendly** - Great DX with hot reload and tooling

## 📦 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

## 📁 Project Structure

```
math-practice-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Shared components (Header, Footer, Container)
│   │   └── ui/             # shadcn/ui styled components
│   ├── pages/              # Page components (routes)
│   ├── layouts/            # Layout wrapper components
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React Context for state
│   ├── services/           # Business logic & LocalStorage
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── styles/             # Global CSS and Tailwind
│   ├── router/             # React Router configuration
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config with path aliases
├── eslint.config.js        # ESLint rules
├── prettier.config.js      # Prettier formatting
└── package.json            # Dependencies & scripts
```

## 🚀 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |
| `npm run type-check` | TypeScript type checking |

## 🎨 Pages & Routing

- **Home** (`/`) - Welcome screen with quick stats
- **Quests** (`/quests`) - Browse available math exercises  
- **Stats** (`/stats`) - Track performance and progress
- **Settings** (`/settings`) - Customize app experience
- **404** (`*`) - Not found page

## 🛠️ Architecture

### State Management

Uses React Context API for user data, settings, statistics, and loading states. Ready to extend with Zustand.

### Data Persistence

All LocalStorage operations handled via `userService` - type-safe with error handling.

### Reusable Components & Hooks

- UI components: Button, Card, Container
- Common components: Header, Footer
- Custom hooks: useLocalStorage, useTimer
- Utility functions: cn(), formatTime(), calculateAccuracy()

## 🎯 Next Steps - Implement Math Logic

1. Create Math Engine (`src/services/mathService.ts`)
2. Build Practice Page (`src/pages/PracticePage.tsx`)
3. Add Problem Components (`src/components/practice/`)
4. Extend Data Models (`src/types/index.ts`)
5. Update Services to track sessions

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed guide.

## 🌓 Dark Mode

Theme support with CSS variables - light, dark, or auto modes.

## 🚢 Deployment

Deploy `dist/` folder to Vercel, Netlify, GitHub Pages, Azure Static Web Apps, or AWS S3.

## 📚 Resources

- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Vite Guide](https://vitejs.dev)

## 📄 License

MIT

---

**Ready to build amazing math practice experiences! 🚀**

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed development guide.
