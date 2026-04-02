---
description: "Use when writing React components and pages in src/app/**/*.tsx. Provides Next.js framework-specific rules for page components, layouts, and client/server boundary patterns."
name: "Frontend App Pages"
applyTo: "src/app/**/*.tsx"
---

# Frontend Component Guidelines

Rules specific to React components in the `src/components/` directory. These rules extend and override general workspace instructions when working on component files.

## Component Architecture

- **Composition over inheritance**: Build components by combining smaller, focused components
- **Single Responsibility Principle**: Each component should have one clear purpose
- **Props interface**: Always define a `Props` interface for component parameters
  ```typescript
  interface Props {
    children?: React.ReactNode;
    className?: string;
    // other props
  }
  ```
- **Avoid prop drilling**: Use React Context for deeply nested prop passing
- **Memoization**: Use `React.memo` or `useMemo` for expensive computations only when profiler confirms necessity

## State Management

- Prefer local state with `useState` for component-level UI state
- Lift state to parent/context when multiple components need it
- Avoid Redux/Zustand unless data is truly global application state
- Keep derived state calculated on render—don't store it separately
- Use `useCallback` and `useReducer` sparingly (profile first)

## Client vs Server Component Split

- Mark interactive components with `"use client"`
- Keep data fetching in server components and pass as props
- Server components are the default—only add `"use client"` when needed
- Never use client-only hooks in server components
- Example split pattern:

  ```typescript
  // server-component.tsx (no directive)
  async function DataContainer() {
    const data = await fetchData();
    return <ClientDisplay data={data} />;
  }

  // client-component.tsx
  "use client";
  export function ClientDisplay({ data }) {
    const [filter, setFilter] = useState("");
    return <div>{/* render with filter state */}</div>;
  }
  ```

## Testing Requirements

- Each component at `src/components/` should have corresponding tests in `src/components/__tests__/`
- Test user interactions, not implementation details
- Use `@testing-library/react` for component testing
- Minimum coverage: 80% for components
- Test accessibility features (`aria-*` attributes, keyboard navigation)

## Accessibility (a11y)

- Always include semantic HTML: `<button>`, `<form>`, `<nav>`, etc., not `<div onClick>`
- Add `aria-label` or `aria-describedby` to icon-only buttons and interactive elements
- Ensure color contrast ratio ≥ 4.5:1 for text (already handled by white theme)
- Include `alt` text for meaningful images, empty string for decorative images
- Test keyboard navigation: Tab, Enter, Escape should all work
- Use `aria-live` for dynamic content updates

## Styling in Components

- Use Tailwind CSS utility classes exclusively via `className` prop
- **NO inline styles** with `style` prop (except for dynamic values unavoidable with CSS-in-JS)
- **WHITE THEME ONLY**: Never use `dark:` prefix
- Accept `className` in Props and merge with component defaults:
  ```typescript
  export function Button({ className, ...props }: Props) {
    return (
      <button
        className={`px-4 py-2 bg-blue-600 text-white rounded ${className}`}
        {...props}
      />
    );
  }
  ```
- Use consistent spacing: `p-4`, `gap-3`, `mt-6` (stick to Tailwind default scale)

## Performance

- Avoid unnecessary re-renders with proper dependency arrays in `useEffect`
- Lazy load heavy components with `React.lazy()` + `Suspense` for route-level code splitting
- Don't destructure deeply nested objects in function signatures—destructure inside function
- Check React DevTools Profiler for unexpected rerenders before optimizing

## Error Handling

- Wrap async operations with try-catch and display error state
- Provide user-friendly error messages (no stack traces in UI)
- Don't silently swallow errors—log to console in development
- Create Error Boundary wrapper for fatal component errors

## Documentation

- Add JSDoc comments to complex components:
  ```typescript
  /**
   * Renders a paginated list with filter options.
   * @param items - Array of data to display
   * @param onSelect - Callback when item is selected
   */
  export function List({ items, onSelect }: Props) {}
  ```
- Document non-obvious props in the interface definition
- Link to design system or component storybook if available

## Naming Conventions

- Component files: PascalCase (`Button.tsx`, `UserCard.tsx`)
- Component functions: PascalCase matching filename
- Props interfaces: `{ComponentName}Props` (e.g., `ButtonProps`)
- Event handlers: `handle{EventName}` (e.g., `handleClick`, `handleSubmit`)
- Boolean props: prefix with `is` or `has` (e.g., `isDisabled`, `hasIcon`)

## Import Organization

```typescript
// 1. React imports
import { useState, useEffect, ReactNode } from "react";

// 2. Third-party imports
import clsx from "clsx";

// 3. Internal components
import { Button } from ".";
import { useTheme } from "@/hooks";

// 4. Utilities & constants
import { formatDate } from "@/utils";

// 5. Styles (if separate file)
import styles from "./Component.module.css";
```

## File Organization

```
src/components/
├── common/                   # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Modal.tsx
├── layout/                   # Layout wrapper components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── features/                 # Feature-specific components
│   ├── UserProfile/
│   │   ├── UserCard.tsx
│   │   └── UserForm.tsx
│   └── Settings/
│       └── SettingsPanel.tsx
├── __tests__/                # Component tests
│   └── Button.test.tsx
└── index.ts                  # Named exports for directory
```

## Common Pitfalls to Avoid

❌ **DON'T**:

- Create components that do too much (violates SRP)
- Use `any` type for props—always define Props interface
- Access DOM directly with `ref` when possible to use uncontrolled components
- Create new objects/arrays on every render without memoization
- Use index as key in lists—use unique, stable identifiers

✅ **DO**:

- Keep components small and composable (< 300 lines ideally)
- Use TypeScript strict mode—define all prop types explicitly
- Lift state only when multiple components need it
- Use the `as` prop pattern for polymorphic components
- Return null or fragment for optional rendering, not empty string

## Examples

### Simple Component

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded font-semibold transition";
  const variantStyles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-gray-900 hover:bg-gray-300";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {label}
    </button>
  );
}
```

### Container/Presentation Split

```typescript
// ProfileContainer.tsx - server component for data
async function ProfileContainer({ userId }: { userId: string }) {
  const user = await fetchUser(userId);
  return <ProfileCard user={user} />;
}

// ProfileCard.tsx - client component for interaction
"use client";
interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  return <div>{/* render with edit state */}</div>;
}
```
