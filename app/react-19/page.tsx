/**
 * Next.js 16 - React 19 Support (incl. Compiler)
 */

"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

export default function React19Page() {
  const [isPending, startTransition] = useTransition();
  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
  const [filterText, setFilterText] = useState("");

  const handleFilter = (text: string) => {
    setFilterText(text);
    startTransition(() => {
      // Simulate heavy filtering operation
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase()),
      );
      // In real app, this could be expensive rendering
      console.log("Filtered items:", filtered);
    });
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filterText.toLowerCase()),
  );

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
            ⚛️ React 19 Support (incl. Compiler)
          </h1>
          <p className="text-lg text-gray-600">
            Next.js 16 natively supports React 19 features and the stable React
            Compiler
          </p>
        </div>

        {/* Key Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 React 19 Features in Next.js 16
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-lg">🎬</span>
                <a
                  href="https://react.dev/reference/react/useTransition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Transitions
                </a>
              </h3>
              <p className="text-sm text-gray-700">
                Animate elements that update inside a Transition or navigation.
                Provides smooth UI updates without blocking user interactions.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <a
                  href="https://react.dev/reference/react/experimental_useEffectEvent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  useEffectEvent
                </a>
              </h3>
              <p className="text-sm text-gray-700">
                Extract non-reactive logic from Effects into reusable Effect
                Event functions. Helps separate reactive and non-reactive code
                in useEffect.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-lg">👁️</span>
                <a
                  href="https://react.dev/reference/react/Activity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Activity
                </a>
              </h3>
              <p className="text-sm text-gray-700">
                Render &quot;background activity&quot; by hiding UI with
                display: none while maintaining state and cleaning up Effects.
                Perfect for offscreen content that needs to preserve state.
              </p>
            </div>
          </div>
        </div>

        {/* React Compiler */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🚀 React Compiler (Stable)
          </h2>
          <p className="text-gray-700 mb-4">
            The <strong>React Compiler</strong> is now stable, enabling
            automatic memoization and fewer unnecessary re-renders, especially
            beneficial in large apps.
          </p>

          <div className="bg-white rounded-lg border border-purple-200 p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              ✨ What it does:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  <strong>Automatic Memoization:</strong> No need for manual
                  useMemo, useCallback, or React.memo
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  <strong>Fewer Re-renders:</strong> Components only re-render
                  when truly necessary
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  <strong>Performance Gains:</strong> Especially noticeable in
                  large applications with complex component trees
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-900">
              <strong>⚠️ Note:</strong> The reactCompiler configuration option
              has been promoted from experimental to stable. It is{" "}
              <strong>not enabled by default</strong> as Next.js continues
              gathering build performance data across different application
              types.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-2">next.config.ts</p>
            <pre className="text-sm text-gray-100 overflow-x-auto">
              <code>{`const nextConfig = {
  reactCompiler: true, // Enable React Compiler
};

export default nextConfig;`}</code>
            </pre>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🧪 Live Demo: View Transitions (useTransition)
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Type to filter items. The transition keeps the UI responsive even
            during expensive operations.
          </p>

          <input
            type="text"
            value={filterText}
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="Type to filter..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
          />

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            {isPending && (
              <p className="text-sm text-blue-600 mb-2">⏳ Filtering...</p>
            )}
            <div className="space-y-2">
              {filteredItems.length === 0 ? (
                <p className="text-gray-500 text-sm">No items found</p>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item}
                    className="bg-blue-50 border border-blue-200 p-3 rounded"
                  >
                    <span className="text-gray-900 font-medium">{item}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Real-world Use Cases */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            💡 Real-World Use Cases
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-green-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                🎬 View Transitions
              </h3>
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> Animating a product card expanding
                into a full product detail page during navigation, creating
                smooth visual continuity.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-green-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                ⚡ useEffectEvent
              </h3>
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> Analytics tracking that reads current
                user preferences without triggering effect re-runs when
                preferences change.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-green-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">👁️ Activity</h3>
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> Keeping a background chat connection
                alive when user switches tabs, without visible UI overhead.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-green-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                🚀 React Compiler
              </h3>
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> Large dashboard with 50+ widgets.
                Compiler ensures updating one widget doesn&apos;t cause
                unnecessary re-renders of others, improving performance by
                30-50%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
