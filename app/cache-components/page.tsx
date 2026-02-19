/**
 * Next.js 16 - Cache Components
 * Demonstrates explicit, flexible caching with "use cache" directive
 */

"use cache";

import Link from "next/link";

async function getUserData(id: string) {
  console.log(`Fetching user ${id}...`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id,
    name: `User ${id}`,
    role: "Developer",
    lastSeen: new Date().toLocaleTimeString(),
  };
}

export default async function CacheComponentsPage() {
  const user = await getUserData("1");

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            💾 Cache Components
          </h1>
          <p className="text-lg text-gray-600">
            Explicit, flexible caching with "use cache" directive
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            💡 What Changed?
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              ✅ Use{" "}
              <code className="bg-blue-100 px-2 py-1 rounded text-sm">
                "use cache"
              </code>{" "}
              directive to mark content as cacheable
            </li>
            <li>✅ Works in pages, layouts, and functions</li>
            <li>✅ Avoids unnecessary re-rendering and improves performance</li>
            <li>
              ✅ Works with Partial Pre-Rendering (PPR) for mixed static/dynamic
              content
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Live Example - Cached Component
          </h2>
          <div className="bg-green-50 border border-green-200 p-4 rounded">
            <p className="text-sm text-gray-700 mb-2">
              <strong>User:</strong> {user.name}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Role:</strong> {user.role}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Cached at:</strong> {user.lastSeen}
            </p>
            <p className="text-xs text-green-700 mt-3 font-semibold">
              ⚡ This page is cached! Refresh to see the same timestamp.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h2>
          <ul className="space-y-2 text-gray-700">
            <li>⚡ Instant navigation - repeated UI loads from cache</li>
            <li>🎯 Explicit control - you decide what to cache</li>
            <li>🚀 Better performance - avoids recomputing</li>
            <li>✨ Predictable behavior - no implicit caching surprises</li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-3">Code Examples</h2>
          <pre className="text-sm text-gray-100 overflow-x-auto mb-4">
            <code>{`// Cache entire page/layout
"use cache";

export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}`}</code>
          </pre>
          <pre className="text-sm text-gray-100 overflow-x-auto mb-4">
            <code>{`// Cache a specific function
async function getProducts() {
  "use cache";
  return await db.products.findMany();
}

export default async function Shop() {
  const products = await getProducts();
  return <ProductList products={products} />;
}`}</code>
          </pre>
          <pre className="text-sm text-gray-100 overflow-x-auto">
            <code>{`// Mix static and dynamic with PPR
"use cache";

export default async function Dashboard() {
  const stats = await getStats(); // Cached
  
  return (
    <div>
      <Stats data={stats} />
      <Suspense fallback={<Loading />}>
        <LiveFeed /> {/* Dynamic, not cached */}
      </Suspense>
    </div>
  );
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
