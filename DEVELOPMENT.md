# Math Practice App - Development Guide

## Development Workflow

### Starting Development

```bash
npm run dev
```

This starts the Vite development server with hot module replacement (HMR).

### Code Quality

Before committing code:

```bash
# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint

# Fix auto-fixable lint issues
npm run lint:fix

# Format code
npm run format
```

## Component Development

### Creating a New Component

1. **Decide the category**: `ui/`, `common/`, or feature-specific folder
2. **Create component file** with `.tsx` extension
3. **Add TypeScript types** for props
4. **Export from appropriate index file**

Example:
```typescript
// src/components/common/MyComponent.tsx
import React from 'react'

interface MyComponentProps {
  title: string
  onClick?: () => void
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return <div onClick={onClick}>{title}</div>
}
```

### Component Best Practices

- Use functional components with hooks
- Keep components under 300 lines
- Export from barrel files (index.ts)
- Use TypeScript strict typing (no `any`)
- Add JSDoc comments for complex logic
- Keep component styling in Tailwind classes
- Use composition over prop drilling

## Adding New Pages

1. Create file in `src/pages/`
2. Export from `src/pages/index.ts`
3. Add route in `src/router/index.tsx`
4. Add navigation link if needed in `Header.tsx`

## Adding New Services

1. Create in `src/services/`
2. Export from `src/services/index.ts`
3. Import with: `import { serviceName } from '@/services'`

Example service:
```typescript
export const myService = {
  method(): ReturnType {
    // implementation
  }
}
```

## Adding Custom Hooks

1. Create in `src/hooks/`
2. Export from `src/hooks/index.ts`
3. Hook naming: `use*` (e.g., `useCustomHook`)

Example hook:
```typescript
export function useCustomHook() {
  const [state, setState] = useState<Type>(initial)
  // implementation
  return { state, setState }
}
```

## Styling Guidelines

### Using Tailwind CSS

- Use Tailwind utility classes for styling
- Use `cn()` utility for conditional classes:
  ```typescript
  import { cn } from '@/utils'
  
  <div className={cn('base-class', isActive && 'active-class')} />
  ```

### Adding New Components

For complex component sets, add to `src/components/ui/`:

```typescript
import { cn } from '@/utils'

export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('base', className)} {...props} />
  )
)
Component.displayName = 'Component'
```

## State Management

### Using Context

Import and wrap your app:
```typescript
import { AppProvider } from '@/context'

export const App = () => {
  return (
    <AppProvider>
      {/* app content */}
    </AppProvider>
  )
}
```

Use in components:
```typescript
import { useApp } from '@/context'

export const MyComponent = () => {
  const { user, settings } = useApp()
  // use context
}
```

### Extending Context

Edit `src/context/AppContext.tsx` to add more state/methods.

## LocalStorage Persistence

Use the `useLocalStorage` hook:
```typescript
import { useLocalStorage } from '@/hooks'

export const MyComponent = () => {
  const [value, setValue] = useLocalStorage('my-key', defaultValue)
  // value persists across sessions
}
```

Or use the service directly:
```typescript
import { userService } from '@/services'

// Get data
const user = userService.getOrCreateUser()

// Update data
userService.updateUser({ name: 'New Name' })

// Save progress
const record = { id: '1', userId: user.id, ... }
userService.saveProgressRecord(record)
```

## Common Patterns

### Conditional Rendering

```typescript
{loading ? <Spinner /> : <Content />}

{items.length > 0 && <ItemList items={items} />}

{error && <ErrorMessage error={error} />}
```

### Event Handling

```typescript
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies])

<button onClick={handleClick}>Click me</button>
```

### Form Handling

```typescript
const [formData, setFormData] = useState({})

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }))
}

<input name="field" onChange={handleChange} />
```

## Debugging

### Browser DevTools

- Use React DevTools browser extension
- Check Network tab for API calls
- Use Console for logging

### TypeScript

- VS Code shows inline errors
- Run `npm run type-check` to validate
- Check for red squiggles in editor

### Performance

- Use React DevTools Profiler
- Check component render counts
- Optimize with `useMemo` and `useCallback`

## Building for Production

```bash
npm run build
```

Creates an optimized build in the `dist/` folder.

Preview locally:
```bash
npm run preview
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

Vite only exposes variables starting with `VITE_`.

## Troubleshooting

### Import Path Issues

- Use path alias `@/` for imports from `src/`
- Check tsconfig.json and vite.config.ts for alias setup

### Styling Not Applied

- Check for typos in class names
- Verify Tailwind CSS config includes file in content array
- Browser cache: hard refresh (Ctrl+Shift+R)

### Hot Reload Not Working

- Check if file is being edited outside of `src/`
- Restart dev server: stop and run `npm run dev` again

### TypeScript Errors

```bash
npm run type-check  # See all errors
npm run lint:fix    # Auto-fix what's possible
```

---

Happy coding! 🎉
