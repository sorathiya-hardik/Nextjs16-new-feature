/**
 * Next.js 16 - proxy.ts
 */

import Link from "next/link";

export default function ProxyRoutesPage() {
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
            🔀 proxy.ts (Replaces middleware.ts)
          </h1>
          <p className="text-lg text-gray-600">
            Makes your app's network boundary explicit with Node.js runtime
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            What Changed?
          </h2>
          <p className="text-gray-700 mb-4">
            <code className="bg-gray-100 px-2 py-1 rounded font-semibold">
              proxy.ts
            </code>{" "}
            replaces{" "}
            <code className="bg-gray-100 px-2 py-1 rounded font-semibold">
              middleware.ts
            </code>{" "}
            and makes the app's network boundary explicit. It runs on the{" "}
            <strong>Node.js runtime</strong> (not Edge).
          </p>

          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              Migration Steps:
            </h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
              <li>
                Rename{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  middleware.ts
                </code>{" "}
                →{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">proxy.ts</code>
              </li>
              <li>
                Rename the exported function from{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  middleware
                </code>{" "}
                → <code className="bg-gray-100 px-2 py-1 rounded">proxy</code>
              </li>
              <li>Logic stays the same - only naming changes</li>
            </ol>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <p className="text-sm text-yellow-900">
              <strong>⚠️ Note:</strong>{" "}
              <code className="bg-yellow-100 px-2 py-1 rounded">
                middleware.ts
              </code>{" "}
              is still available for Edge runtime use cases, but it is{" "}
              <strong>deprecated</strong> and will be removed in a future
              version.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Why This Change?
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              ✅ <strong>Clearer naming:</strong> "proxy" better describes
              request interception
            </li>
            <li>
              ✅ <strong>Predictable runtime:</strong> Single Node.js runtime
              instead of Edge/Node confusion
            </li>
            <li>
              ✅ <strong>Explicit boundary:</strong> Makes network boundary
              clear in your app architecture
            </li>
            <li>
              ✅ <strong>Better DX:</strong> Reduces confusion about when to use
              middleware vs proxy
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Real-World Use Cases
          </h2>
          <div className="space-y-3 text-sm">
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">🔀 Redirects</p>
              <p className="text-gray-700">
                Redirect users from old URLs to new ones (e.g., /home →
                /dashboard)
              </p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">
                🔐 Authentication
              </p>
              <p className="text-gray-700">
                Check auth tokens and redirect unauthenticated users to login
              </p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">
                🌐 Localization
              </p>
              <p className="text-gray-700">
                Detect user locale and redirect to appropriate language version
              </p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">
                📋 Custom Headers
              </p>
              <p className="text-gray-700">
                Add security headers, CORS, or custom metadata to responses
              </p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-gray-900 mb-1">🔧 A/B Testing</p>
              <p className="text-gray-700">
                Route users to different page variants for experiments
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-3">
            Basic Example - Simple Redirect
          </h2>
          <pre className="text-sm text-gray-100 overflow-x-auto">
            <code>{`// proxy.ts (root of your project)
import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  // Redirect all requests to /home
  return NextResponse.redirect(new URL('/home', request.url));
}`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-3">
            Advanced Example - Authentication Check
          </h2>
          <pre className="text-sm text-gray-100 overflow-x-auto">
            <code>{`// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  
  // Redirect to login if no token and not already on login page
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Redirect to dashboard if logged in and on login page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Continue to requested page
  return NextResponse.next();
}

// Optional: Specify which paths this proxy applies to
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/login']
};`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-3">
            Advanced Example - Custom Headers
          </h2>
          <pre className="text-sm text-gray-100 overflow-x-auto">
            <code>{`// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add custom security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add custom header for API version
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('X-API-Version', '2.0');
  }
  
  return response;
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
