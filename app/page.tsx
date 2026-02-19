/**
 * Next.js 16 - Home Page
 * Demonstrates Next.js 16 Features
 */

import Link from "next/link";

export default function Home() {
  const features = [
    {
      href: "/cache-components",
      icon: "💾",
      title: "Cache Components",
      description: "Explicit, flexible caching with granular control",
    },
    {
      href: "/caching-apis",
      icon: "🔄",
      title: "Refined Caching APIs",
      description: "New APIs for better cache control and management",
    },
    {
      href: "/proxy-routes",
      icon: "🔀",
      title: "proxy.ts",
      description: "Modern replacement for middleware.ts with better DX",
    },
    {
      href: "/smart-routing",
      icon: "🧭",
      title: "Smarter Routing",
      description: "Enhanced routing and navigation capabilities",
    },
    {
      href: "/react-19",
      icon: "⚛️",
      title: "React 19 Support",
      description: "Full React 19 support including compiler optimizations",
    },
    {
      href: "/comparison",
      icon: "⚖️",
      title: "Next.js 15 vs 16",
      description: "Key differences and migration guide",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 border border-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Next.js 16 Features
          </h1>
          <p className="text-lg text-gray-600">
            Explore new features in Next.js 16
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="block bg-gray-50 border border-gray-200 border border-gray-200 rounded-lg p-6 hover:border-gray-400 transition"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Why Next.js 16?
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>⚡ Faster builds with Turbopack</li>
            <li>🎯 Better caching control</li>
            <li>⚛️ React 19 support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
