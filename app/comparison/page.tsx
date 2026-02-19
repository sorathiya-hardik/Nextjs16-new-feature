/**
 * Next.js 15 vs 16 Comparison
 */

import Link from "next/link";

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-50 border border-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            ⚖️ Next.js 15 vs 16
          </h1>
          <p className="text-lg text-gray-600">
            Key differences and improvements
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mb-6">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-900">Feature</th>
                <th className="px-6 py-3 text-left text-gray-900">
                  Next.js 15
                </th>
                <th className="px-6 py-3 text-left text-gray-900">
                  Next.js 16
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">Bundler</td>
                <td className="px-6 py-4 text-gray-600">Webpack (default)</td>
                <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">
                  Turbopack (default) ⚡
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">
                  React Version
                </td>
                <td className="px-6 py-4 text-gray-600">React 18</td>
                <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">
                  React 19 ⚛️
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">
                  Caching API
                </td>
                <td className="px-6 py-4 text-gray-600">Basic caching</td>
                <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">
                  Refined APIs 📦
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">Routing</td>
                <td className="px-6 py-4 text-gray-600">App Router</td>
                <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">
                  Smarter Routing 🧭
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">
                  Build Speed
                </td>
                <td className="px-6 py-4 text-gray-600">~3.2s</td>
                <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">
                  ~0.6s (5x faster) 🚀
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">Logging</td>
                <td className="px-6 py-4 text-gray-600">Standard</td>
                <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">
                  Enhanced Metrics 📊
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-600 rounded-lg border border-blue-700 p-6 text-white">
          <h2 className="text-2xl font-bold mb-3">
            Why Upgrade to Next.js 16?
          </h2>
          <ul className="space-y-2">
            <li>⚡ 5x faster builds with Turbopack</li>
            <li>⚛️ Latest React 19 features</li>
            <li>📦 Better caching control</li>
            <li>🧭 Improved navigation</li>
            <li>📊 Better debugging & insights</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
