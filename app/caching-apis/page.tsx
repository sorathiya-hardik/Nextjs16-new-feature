/**
 * Next.js 16 - Refined Caching APIs
 */

import Link from "next/link";

export default function CachingAPIsPage() {
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
            📦 Refined Caching APIs
          </h1>
          <p className="text-lg text-gray-600">
            Next.js 16 introduces three new caching APIs for precise cache
            control
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            1. revalidateTag(tag, profile)
          </h2>
          <p className="text-gray-700 mb-4">
            Invalidates cached entries with{" "}
            <strong>stale-while-revalidate</strong> behavior. Users see cached
            content immediately while fresh data loads in the background.
          </p>

          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Parameters:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">tag</code> - The
                cache tag to invalidate
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">profile</code> -
                Built-in ('max', 'hours', 'days') or custom {"{"}expire: number
                {"}"}
              </li>
            </ul>
          </div>

          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              Real-World Use Cases:
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                ✅ <strong>Blog/CMS Content:</strong> Update blog posts or
                articles without users seeing a loading state
              </li>
              <li>
                ✅ <strong>E-commerce Product Catalog:</strong> Refresh product
                listings when inventory changes
              </li>
              <li>
                ✅ <strong>News Feed:</strong> Update news articles while users
                continue reading current content
              </li>
              <li>
                ✅ <strong>Static Marketing Pages:</strong> Update landing pages
                with new promotions
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <pre className="text-sm text-gray-100 overflow-x-auto">
              <code>{`'use server';
import { revalidateTag } from 'next/cache';

// Example: Update blog content in CMS
export async function publishBlogPost(postId: string) {
  await db.posts.publish(postId);
  
  // Revalidate with 'max' profile (recommended)
  revalidateTag('blog-posts', 'max');
  
  // Users see old posts immediately
  // New post appears in background
}`}</code>
            </pre>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            2. updateTag(tag)
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>Server Actions only.</strong> Provides{" "}
            <strong>read-your-writes</strong> semantics. Expires cache and
            immediately refreshes data within the same request.
          </p>

          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Parameters:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">tag</code> - The
                cache tag to update immediately
              </li>
            </ul>
          </div>

          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              Real-World Use Cases:
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                ✅ <strong>User Profile Updates:</strong> User changes
                avatar/bio and expects to see it instantly
              </li>
              <li>
                ✅ <strong>Form Submissions:</strong> Create/update records and
                show changes immediately
              </li>
              <li>
                ✅ <strong>Settings & Preferences:</strong> Toggle dark mode,
                language, notification settings
              </li>
              <li>
                ✅ <strong>Shopping Cart:</strong> Add/remove items and see
                updated cart right away
              </li>
              <li>
                ✅ <strong>Comment Systems:</strong> Post a comment and see it
                appear immediately
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <pre className="text-sm text-gray-100 overflow-x-auto">
              <code>{`'use server';
import { updateTag } from 'next/cache';

// Example: User updates profile
export async function updateUserProfile(userId: string, data: Profile) {
  await db.users.update(userId, data);
  
  // Immediate cache invalidation
  // User sees their changes instantly
  updateTag(\`user-\${userId}\`);
  
  // Perfect for interactive features
  // where users expect immediate feedback
}`}</code>
            </pre>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            3. refresh()
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>Server Actions only.</strong> Refreshes{" "}
            <strong>uncached data only</strong>. Doesn't touch the cache at all
            - leaves cached page shells and static content intact.
          </p>

          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Parameters:</h3>
            <p className="text-gray-700 text-sm">
              No parameters - refreshes all uncached data on the current page
            </p>
          </div>

          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              Real-World Use Cases:
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                ✅ <strong>Notification Badge Counts:</strong> Update unread
                count without reloading entire page
              </li>
              <li>
                ✅ <strong>Live Metrics/Analytics:</strong> Refresh dashboard
                numbers while keeping UI cached
              </li>
              <li>
                ✅ <strong>Status Indicators:</strong> "Online/Offline" status,
                "Processing" badges
              </li>
              <li>
                ✅ <strong>Timestamp Updates:</strong> "Last seen", "Posted 5
                minutes ago" labels
              </li>
              <li>
                ✅ <strong>Dynamic Counters:</strong> View counts, like counts,
                follower counts
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <pre className="text-sm text-gray-100 overflow-x-auto">
              <code>{`'use server';
import { refresh } from 'next/cache';

// Example: Mark notification as read
export async function markNotificationRead(notificationId: string) {
  await db.notifications.markAsRead(notificationId);
  
  // Refresh the notification count in header
  // (which is fetched separately and not cached)
  refresh();
  
  // Cached page shell stays fast
  // Only dynamic notification count updates
}`}</code>
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            🎯 When to Use Which?
          </h2>
          <div className="space-y-3 text-sm">
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-blue-700 mb-2">
                Use revalidateTag() when:
              </p>
              <p className="text-gray-700">
                Content can tolerate <strong>eventual consistency</strong>{" "}
                (blogs, articles, product listings)
              </p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-green-700 mb-2">
                Use updateTag() when:
              </p>
              <p className="text-gray-700">
                Users need to see their changes <strong>immediately</strong>{" "}
                (forms, settings, interactive features)
              </p>
            </div>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-purple-700 mb-2">
                Use refresh() when:
              </p>
              <p className="text-gray-700">
                You need to update <strong>only uncached dynamic data</strong>{" "}
                (counts, badges, status indicators)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
