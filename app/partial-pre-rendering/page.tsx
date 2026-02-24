/**
 * Next.js 16 - Partial Pre-Rendering
 * Demonstrates mixing static and dynamic content in the same page
 */

import Link from "next/link";
import { Suspense } from "react";

// Simulate fetching data from database (static - pre-rendered)
async function fetchProducts() {
  // In real app, this would be a database call
  // This is static content that doesn't change per request
  return [
    { id: 1, name: "Product A", price: "$29.99", stock: "In Stock" },
    { id: 2, name: "Product B", price: "$49.99", stock: "In Stock" },
    { id: 3, name: "Product C", price: "$79.99", stock: "Limited" },
  ];
}

// Static content - pre-rendered and cached
async function StaticSection() {
  const products = await fetchProducts();

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3">
        ✅ Static Content (Pre-rendered & Cached)
      </h2>
      <p className="text-gray-700 mb-3">
        Product catalog from database - Pre-rendered once and reused. Same for
        all visitors.
      </p>
      <div className="bg-white border border-green-200 rounded p-4 space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center pb-3 border-b last:border-b-0 last:pb-0"
          >
            <div>
              <span className="text-sm font-medium text-gray-900">
                {product.name}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                ({product.stock})
              </span>
            </div>
            <span className="text-sm text-green-700 font-semibold">
              {product.price}
            </span>
          </div>
        ))}
        <p className="text-xs text-green-700 mt-3 font-semibold">
          🔒 Pre-rendered once, served to everyone. Refresh and see the same
          data.
        </p>
      </div>
    </div>
  );
}

// Async dynamic content - fetched on request
async function DynamicSection() {
  // Simulate dynamic data fetch (like from a database)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Generate different data on each request
  const visitorCount = Math.floor(Math.random() * 1000) + 100;
  const onlineUsers = Math.floor(Math.random() * 50) + 5;
  const conversionRate = (Math.random() * 15 + 2).toFixed(2);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3">
        ⚡ Dynamic Content (Fetched on Every Request)
      </h2>
      <p className="text-gray-700 mb-3">
        Real-time analytics data - Changes with each page visit. Refresh to see
        different numbers!
      </p>
      <div className="bg-white border border-blue-200 rounded p-4 space-y-3">
        <div className="flex justify-between items-center pb-3 border-b">
          <span className="text-sm font-medium text-gray-900">
            👥 Visitors Today
          </span>
          <span className="text-sm text-blue-700 font-bold">
            {visitorCount}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b">
          <span className="text-sm font-medium text-gray-900">
            🟢 Online Now
          </span>
          <span className="text-sm text-blue-700 font-bold">{onlineUsers}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">
            📈 Conversion Rate
          </span>
          <span className="text-sm text-blue-700 font-bold">
            {conversionRate}%
          </span>
        </div>
        <p className="text-xs text-blue-700 mt-3 font-semibold">
          🔄 Different on every request - fetched fresh from the server
        </p>
      </div>
    </div>
  );
}

// Fallback UI while dynamic content loads
function DynamicSectionFallback() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3">
        ⚡ Dynamic Content
      </h2>
      <div className="bg-white border border-blue-200 rounded p-4">
        <p className="text-sm text-gray-600 animate-pulse">
          Loading real-time data...
        </p>
      </div>
    </div>
  );
}

export default async function PartialPreRenderingPage() {
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
            🎯 Partial Pre-Rendering (PPR)
          </h1>
          <p className="text-lg text-gray-600">
            Combine static pre-rendered content with dynamic on-demand rendering
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            💡 What is Partial Pre-Rendering?
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-lg">1️⃣</span>
              <span>
                <strong>Pre-render static parts:</strong> Fast, cacheable
                content is built at deploy time
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-lg">2️⃣</span>
              <span>
                <strong>Stream dynamic parts:</strong> Real-time content is
                fetched and streamed to the client
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-lg">3️⃣</span>
              <span>
                <strong>Instant shell:</strong> Users see the static shell
                immediately, dynamic content loads progressively
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Live Example - Mixed Content
          </h2>

          <StaticSection />

          <Suspense fallback={<DynamicSectionFallback />}>
            <DynamicSection />
          </Suspense>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            🚀 Key Benefits
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>⚡ Instant navigation with static shell</li>
            <li>📊 Fresh data via streaming updates</li>
            <li>🎯 Best of both worlds: performance + real-time content</li>
            <li>✨ Progressive enhancement for better UX</li>
            <li>💾 Reduced server load with pre-rendered static content</li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">
            Implementation Example
          </h2>
          <pre className="text-sm text-gray-100 overflow-x-auto">
            <code>{`"use cache";

// Static cached component
async function StaticSection() {
  const products = await fetchProducts(); // Cached
  return <div>{products.map(...)}</div>;
}

// Dynamic component - not cached
async function DynamicSection() {
  const analytics = await fetchAnalytics();
  return <div>{analytics}</div>;
}

// Combine with Suspense
export default function Page() {
  return (
    <>
      <StaticSection />
      <Suspense fallback={<Loading />}>
        <DynamicSection />
      </Suspense>
    </>
  );
}`}</code>
          </pre>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            📖 When to Use PPR
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              ✅ <strong>Product pages:</strong> Static catalog with dynamic
              pricing/inventory
            </li>
            <li>
              ✅ <strong>Blog posts:</strong> Static content with dynamic
              comments
            </li>
            <li>
              ✅ <strong>Dashboards:</strong> Static layout with dynamic widgets
            </li>
            <li>
              ✅ <strong>E-commerce:</strong> Pre-rendered listings with live
              stock
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
