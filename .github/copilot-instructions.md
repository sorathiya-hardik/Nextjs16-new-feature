# GitHub Copilot Instructions

This file provides context and guidelines for GitHub Copilot when assisting with this Next.js 16 Features Demo project.

## Project Overview

This is a **Next.js 16 demonstration project** showcasing the latest features including Cache Components, Refined Caching APIs, proxy.ts, Smart Routing, and React 19 support. The project uses TypeScript, Tailwind CSS, and follows a clean, white-themed UI design.

## Technology Stack

- **Framework**: Next.js 16.1.6 with Turbopack
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x (white theme only, NO dark mode)
- **Build Tool**: Turbopack (default)
- **Compiler**: React Compiler 1.0.0 (enabled)

## Code Style & Conventions

### TypeScript

- Always use TypeScript for new files
- Define proper types and interfaces
- Avoid `any` type - use `unknown` or specific types
- Use `type` for object shapes, `interface` for extensible contracts

### React Components

- **Always** use functional components with hooks
- Use `"use client"` directive for client components
- Use `"use cache"` directive for cached server components
- Prefer named exports for utilities, default export for page components
- Keep components focused and single-responsibility

### Styling

- **CRITICAL**: Only use **white/light theme** - NO dark mode classes
- Use Tailwind CSS utility classes exclusively
- Follow this color scheme:
  - Backgrounds: `bg-white`, `bg-gray-50`, `bg-blue-50`, etc.
  - Text: `text-gray-900`, `text-gray-700`, `text-blue-600`
  - Borders: `border-gray-200`, `border-blue-200`
- **NEVER** use: `dark:`, `bg-gray-900`, `text-white` (except for code blocks)

### File Structure

```
app/
├── feature-name/
│   └── page.tsx              # Feature page (default export)
├── api/
│   └── endpoint/
│       └── route.ts          # API route handlers
├── layout.tsx                # Root layout
├── page.tsx                  # Homepage
└── globals.css               # Global styles
```

## Next.js 16 Features Implementation

### 1. Cache Components (`"use cache"`)

```typescript
"use cache";

export default async function CachedPage() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

- Place directive at **top of file**
- Works for entire component
- Automatic cache key generation

### 2. Caching APIs

```typescript
import { revalidateTag, updateTag, refresh } from "next/cache";

// Eventual consistency
await revalidateTag("blog", "max");

// Immediate update (Server Actions only)
await updateTag("user");

// Refresh uncached data only
await refresh();
```

### 3. proxy.ts (replaces middleware.ts)

```typescript
// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
```

- **Function-based**, not config object
- Runs on **Node.js runtime** (not Edge)

### 4. Smart Routing

- Layout deduplication happens automatically
- Incremental prefetching enabled by default
- No configuration needed

### 5. React 19 Features

```typescript
"use client";
import { useTransition } from "react";

export default function Component() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      // Non-blocking update
    });
  }
}
```

## Configuration Files

### next.config.ts

```typescript
const nextConfig = {
  cacheComponents: true, // Enable Cache Components
  reactCompiler: true, // Enable React Compiler
};
```

### Key Rules

- Keep config minimal and focused
- Document any non-obvious settings
- Always enable `cacheComponents` and `reactCompiler`

## Component Patterns

### Page Component Template

```typescript
import Link from "next/link";

export default function FeaturePage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Feature Title
          </h1>
          <p className="text-lg text-gray-600">
            Feature description
          </p>
        </div>

        {/* Content sections */}
      </div>
    </div>
  );
}
```

### Feature Card Pattern (Homepage)

```typescript
<Link
  href="/feature-name"
  className="block bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-6"
>
  <h2 className="text-2xl font-bold text-gray-900 mb-2">
    Feature Name
  </h2>
  <p className="text-gray-600 mb-4">
    Brief description
  </p>
  <span className="text-blue-600 hover:underline">
    Learn more →
  </span>
</Link>
```

### Code Example Block Pattern

```typescript
<div className="bg-gray-800 rounded-lg p-6">
  <h3 className="text-lg font-bold text-white mb-3">Code Example</h3>
  <pre className="text-sm text-gray-100 overflow-x-auto">
    <code>{`// Your code here`}</code>
  </pre>
</div>
```

## Common Pitfalls to Avoid

❌ **DON'T**:

- Use dark mode classes (`dark:*`)
- Use array index as key in `.map()`
- Import unused dependencies
- Use `var` or `let` when `const` works
- Create middleware.ts (use proxy.ts instead)
- Use React's `cache()` function (use `"use cache"` directive)

✅ **DO**:

- Use white theme colors exclusively
- Use descriptive keys in `.map()`
- Keep dependencies minimal
- Use `const` by default
- Use proxy.ts for request interception
- Use `"use cache"` directive for caching

## API Routes

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true });
}
```

## Testing Patterns

When generating test-related code:

- Use modern testing practices
- Focus on user behavior, not implementation
- Test accessibility where applicable

## Documentation Standards

- Include JSDoc comments for complex functions
- Add inline comments for non-obvious logic
- Keep comments concise and meaningful
- Update README.md when adding features

## Adding New Features

When adding a new Next.js 16 feature demo:

1. Create `app/feature-name/page.tsx`
2. Follow the page component template
3. Add feature card to `app/page.tsx`
4. Update `README.md` features section
5. Use white theme throughout
6. Include practical examples
7. Add explanations and use cases

## Error Handling

```typescript
// Client components
"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h2>
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

## Performance Considerations

- Use `"use cache"` for static content
- Enable React Compiler for automatic optimization
- Leverage Smart Routing for better prefetching
- Use `revalidateTag()` for cache invalidation
- Avoid unnecessary re-renders

## Accessibility

- Use semantic HTML elements
- Include proper ARIA labels where needed
- Ensure keyboard navigation works
- Maintain good color contrast (already handled by white theme)

## Git Commit Messages

Follow Conventional Commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `chore:` - Maintenance

## Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

---

**Last Updated**: February 2026
**Project Version**: 0.1.0
