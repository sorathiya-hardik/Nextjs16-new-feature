/**
 * Next.js 16 - Enhanced Routing and Navigation
 * Complete overhaul making page transitions leaner and faster
 */

import Link from "next/link";

export default function SmartRoutingPage() {
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
            🧭 Smarter Routing & Navigation
          </h1>
          <p className="text-lg text-gray-600">
            Next.js 16 introduces <strong>layout deduplication</strong> and{" "}
            <strong>incremental prefetching</strong> to make navigation faster
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            ✨ No Code Changes Required
          </h2>
          <p className="text-gray-700">
            These performance improvements work <strong>automatically</strong> —
            they require no code modifications.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            1. Layout Deduplication
          </h2>
          <p className="text-gray-700 mb-4">
            When prefetching multiple URLs with a shared layout, the layout is
            downloaded <strong>once</strong> instead of separately for each
            Link.
          </p>

          <div className="bg-white rounded p-4 mb-4 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2">
              📖 What This Means:
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              Imagine you have a product listing page with 50 product cards,
              each linking to a different product detail page. All these pages
              share the same layout (header, footer, sidebar).
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="font-semibold text-red-900 mb-1">
                  ❌ Before (Next.js 15)
                </p>
                <p className="text-red-700 text-xs mb-2">
                  Downloads layout 50 times
                </p>
                <p className="text-red-600 text-xs">
                  Layout × 50 = Huge network transfer
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="font-semibold text-green-900 mb-1">
                  ✅ Now (Next.js 16)
                </p>
                <p className="text-green-700 text-xs mb-2">
                  Downloads layout 1 time
                </p>
                <p className="text-green-600 text-xs">
                  Layout × 1 = Minimal network transfer
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded p-4 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2">
              🎯 Real-World Impact:
            </h3>
            <p className="text-gray-700 text-sm mb-2">
              For example, a page with 50 product links now downloads the shared
              layout <strong>once</strong> instead of 50 times, dramatically
              reducing the network transfer size.
            </p>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• E-commerce: Product grids with hundreds of items</li>
              <li>• Blog: Archive pages with many article previews</li>
              <li>• Directory: Listing pages with similar page structures</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            2. Incremental Prefetching
          </h2>
          <p className="text-gray-700 mb-4">
            Next.js only prefetches <strong>parts not already in cache</strong>,
            rather than entire pages. The prefetch cache now has smart
            behaviors:
          </p>

          <div className="bg-white rounded p-4 mb-4 border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-3">
              The prefetch cache now:
            </h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <div>
                  <strong>
                    Cancels requests when the link leaves the viewport
                  </strong>
                  <p className="text-gray-600 text-xs mt-1">
                    If you scroll past a link, Next.js stops downloading it to
                    save bandwidth
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <div>
                  <strong>
                    Prioritizes link prefetching on hover or when re-entering
                    the viewport
                  </strong>
                  <p className="text-gray-600 text-xs mt-1">
                    When you hover over a link or scroll back to it, it gets
                    priority for instant loading
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <div>
                  <strong>
                    Re-prefetches links when their data is invalidated
                  </strong>
                  <p className="text-gray-600 text-xs mt-1">
                    If product data changes, links to that product automatically
                    re-prefetch
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <div>
                  <strong>
                    Works seamlessly with upcoming features like Cache
                    Components
                  </strong>
                  <p className="text-gray-600 text-xs mt-1">
                    Integrates perfectly with Next.js 16's new caching system
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded p-4 border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-2">
              💡 How It Works (Step by Step):
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <span className="bg-purple-100 text-purple-900 px-2 py-1 rounded font-semibold text-xs">
                  1
                </span>
                <p className="text-gray-700 flex-1 pt-0.5">
                  You scroll and a link enters your viewport → Next.js starts
                  prefetching only the parts not in cache
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-100 text-purple-900 px-2 py-1 rounded font-semibold text-xs">
                  2
                </span>
                <p className="text-gray-700 flex-1 pt-0.5">
                  You scroll past the link (it leaves viewport) → Next.js
                  cancels the prefetch to save bandwidth
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-100 text-purple-900 px-2 py-1 rounded font-semibold text-xs">
                  3
                </span>
                <p className="text-gray-700 flex-1 pt-0.5">
                  You hover over the link → Next.js prioritizes prefetching it
                  for instant navigation
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-100 text-purple-900 px-2 py-1 rounded font-semibold text-xs">
                  4
                </span>
                <p className="text-gray-700 flex-1 pt-0.5">
                  Data changes (e.g., price update) → Affected links
                  automatically re-prefetch fresh data
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            ⚖️ Important Trade-off
          </h2>
          <p className="text-gray-700 mb-3 text-sm">
            You may see <strong>more individual prefetch requests</strong> in
            your browser's network tab, but the{" "}
            <strong>total transfer size is much lower</strong>.
          </p>
          <div className="bg-white rounded p-3 border border-yellow-100">
            <p className="text-gray-700 text-sm">
              <strong>Example:</strong> Instead of 1 large request downloading
              everything, you might see 5 small requests downloading only what's
              needed. Total data transferred is significantly less.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📊 Live Demo: Both Features Working Together
          </h2>
          <p className="text-gray-700 mb-4 text-sm">
            The demo below shows{" "}
            <strong>
              both Layout Deduplication and Incremental Prefetching
            </strong>{" "}
            working automatically:
          </p>

          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              🛍️ Scenario: E-commerce Product Grid
            </h3>

            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
                <Link
                  key={id}
                  href={`/cache-components?product=${id}`}
                  className="bg-blue-50 border border-blue-200 p-4 rounded-lg hover:bg-blue-100 hover:shadow-md transition-all duration-200 text-center group relative"
                >
                  <div className="text-3xl mb-2">📦</div>
                  <div className="text-sm text-gray-700 font-semibold mb-1">
                    Product {id}
                  </div>
                  <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Hover = Prefetch ⚡
                  </div>
                </Link>
              ))}
            </div>

            {/* Feature Explanations */}
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-bold mb-2">
                  🔵 Feature 1: Layout Deduplication
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-blue-800">
                    <strong>What happens:</strong>
                    <ul className="mt-1 space-y-1 ml-4 list-disc">
                      <li>
                        All 9 products use the same layout (header, nav, footer)
                      </li>
                      <li>
                        Next.js downloads layout code <strong>ONCE</strong> and
                        reuses it
                      </li>
                      <li>Previously: 9 clicks = 9 layout downloads ❌</li>
                      <li>Now: 9 clicks = 1 layout download ✅</li>
                    </ul>
                  </div>
                  <div className="bg-blue-100 rounded p-2 text-xs">
                    <strong>💾 Savings:</strong> If layout is 50KB → Save 400KB
                    (8 duplicate downloads avoided)
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-900 font-bold mb-2">
                  🟣 Feature 2: Incremental Prefetching
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-purple-800">
                    <strong>What happens:</strong>
                    <ul className="mt-1 space-y-1 ml-4 list-disc">
                      <li>
                        <strong>In viewport:</strong> Links automatically
                        prefetched in background
                      </li>
                      <li>
                        <strong>On hover:</strong> Gets HIGH priority →
                        prefetches immediately
                      </li>
                      <li>
                        <strong>Scroll away:</strong> Prefetch cancelled to save
                        bandwidth
                      </li>
                      <li>
                        <strong>Incremental:</strong> Only fetches data NOT
                        already cached
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-100 rounded p-2 text-xs">
                    <strong>⚡ Result:</strong> When you click a link →{" "}
                    <strong>Instant navigation</strong> (data already
                    prefetched!)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-3">
            Code Example (No Changes Needed!)
          </h2>
          <pre className="text-sm text-gray-100 overflow-x-auto">
            <code>{`// Your existing Next.js code works automatically!
import Link from 'next/link';

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <Link 
          href={\`/products/\${product.id}\`} 
          key={product.id}
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}

// ✅ Next.js 16 automatically:
// 1. Downloads shared layout ONCE (not per link)
// 2. Prefetches incrementally (only uncached parts)
// 3. Cancels prefetch when link leaves viewport
// 4. Prioritizes on hover
// 5. Re-prefetches when data changes

// 🎉 Zero code changes required!`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
