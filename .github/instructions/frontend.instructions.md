---
description: "Use when writing React page components and layouts in app/**/*.tsx. Provides Next.js 16-specific rules for page structure, layout composition, caching, and client/server boundaries."
name: "Frontend App Pages"
applyTo: "app/**/*.tsx"
---

# Frontend App Page Guidelines

Rules specific to Next.js page components and layouts in the `app/` directory. These rules extend and override general workspace instructions when working on page files.

## Page Component Structure

- **Default exports**: Page components should use default export (e.g., `export default function Page()`)
- **Layout hierarchy**: Use nested folders to organize pages; auto-nesting works with layouts
- **Server by default**: Page components are server components unless marked with `"use client"`
- **Data fetching at page level**: Fetch data in server pages or layouts, pass as props to client components
- **Use cache directive**: For static/cached pages, add `"use cache"` directive at top:

  ```typescript
  "use cache";

  export default async function CachedPage() {
    const data = await fetchData();
    return <div>{/* content */}</div>;
  }
  ```

## Layout Composition

- **Root layout** (`app/layout.tsx`): Global styles, metadata, providers (auth, themes)
- **Segment layouts**: Create `layout.tsx` in feature folders to define UI boundaries
- **Use metadata**: Define page titles and descriptions:
  ```typescript
  export const metadata = {
    title: "Feature Name",
    description: "Feature description",
  };
  ```
- **Providers in layout**: Database clients, auth, analytics—place in layout
- **Dynamic segments**: Use `[param]` for dynamic routes (e.g., `[id]/page.tsx`)

## Client vs Server Page Boundaries

- **Default to server**: Pages are server components by default
- **Mark interactive pages with "use client"**: Only when page needs user interaction
- **Data fetching in server pages**: Use `async` functions to fetch data
- **Pass data down**: Fetch at page level, pass to child client components as props
- **Avoid prop drilling**: Use layout wrapping for shared state instead
- Pattern example:

  ```typescript
  // app/posts/page.tsx (server)
  async function Page() {
    const posts = await fetchPosts();
    return <PostList initialPosts={posts} />;
  }

  // src/components/PostList.tsx (client if interactive)
  "use client";
  export function PostList({ initialPosts }) {
    const [filter, setFilter] = useState("");
    return <div>{/* filtered view */}</div>;
  }
  ```

## Accessibility (a11y)

- Always include semantic HTML: `<button>`, `<form>`, `<nav>`, etc., not `<div onClick>`
- Add `aria-label` or `aria-describedby` to icon-only buttons and interactive elements
- Ensure color contrast ratio ≥ 4.5:1 for text (already handled by white theme)
- Include `alt` text for meaningful images, empty string for decorative images
- Test keyboard navigation: Tab, Enter, Escape should all work
- Use `aria-live` for dynamic content updates

## Styling in Pages

- Use Tailwind CSS utility classes exclusively via `className` prop
- **NO inline styles** with `style` prop (except for dynamic values)
- **WHITE THEME ONLY**: Never use `dark:` prefix
- Follow this color scheme:
  - Backgrounds: `bg-white`, `bg-gray-50`, `bg-blue-50`
  - Text: `text-gray-900`, `text-gray-700`, `text-blue-600`
  - Borders: `border-gray-200`, `border-blue-200`
- Use consistent spacing: `p-4`, `gap-3`, `mt-6` (Tailwind default scale)

## Performance Optimization

- Use `"use cache"` directive for static pages
- Implement cache invalidation with `revalidateTag()` for dynamic data
- Lazy load heavy sections with `React.lazy()` + `Suspense`
- Use Next.js Image component for images (not `<img>`)
- Prefetch critical pages with `<Link prefetch>`
- Monitor Core Web Vitals: LCP, FID, CLS

## Error Handling for Pages

- Create `error.tsx` in page folder for error boundaries
- Create `not-found.tsx` for 404 pages
- Create `loading.tsx` for Suspense fallbacks
- Provide user-friendly error messages
- Log errors for debugging
- Pattern:
  ```typescript
  // app/posts/error.tsx
  "use client";
  export default function Error({ error, reset }) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold text-red-600">Error loading posts</h2>
        <button onClick={reset}>Try again</button>
      </div>
    );
  }
  ```

## Testing Requirements

- Page components should have integration tests in `__tests__/` folder
- Test user workflows and page interactions, not implementation details
- Use `@testing-library/react` for testing page rendering and interactions
- Minimum coverage: 70% for pages
- Test accessibility features and keyboard navigation across pages

## Documentation for Pages

- Add JSDoc comments to data fetching functions:
  ```typescript
  /**
   * Fetch all published posts
   * @param limit - Number of posts to fetch (default: 10)
   * @returns Array of posts with title and content
   */
  async function fetchPosts(limit = 10) {}
  ```
- Document page purpose in comments if non-obvious
- Link to design system in layout

## Naming Conventions

- Page files: Always `page.tsx` in feature folder
- Layout files: Always `layout.tsx`
- Error boundaries: `error.tsx`
- Not found: `not-found.tsx`
- Loading: `loading.tsx`
- Route handlers: `route.ts` (not .tsx)
- Feature folders: kebab-case (e.g., `cache-components`, `react-19`)

## File Organization for Pages

```
app/
├── layout.tsx                    # Root layout
├── page.tsx                      # Homepage
├── globals.css
├── feature-name/
│   ├── layout.tsx               # Feature segment layout
│   ├── page.tsx                 # Feature page
│   ├── error.tsx                # Error boundary
│   ├── loading.tsx              # Suspense fallback
│   └── [id]/
│       └── page.tsx             # Dynamic route
└── api/
    └── endpoint/
        └── route.ts             # API handler
```

**Key points:**

- Each folder = URL segment
- `page.tsx` defines the route
- `layout.tsx` wraps pages in that segment
- Use `[param]` for dynamic segments
