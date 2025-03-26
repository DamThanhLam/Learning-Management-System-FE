// components/Sidebar.tsx
"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-6 space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24 rounded-full bg-gray-300" />
        <h2 className="text-lg font-semibold">John Doe</h2>
        <button className="text-sm text-gray-500 hover:underline">Share Profile 🔗</button>
      </div>
      <nav className="space-y-2">
        <Link href="/profile" className="block px-4 py-2 rounded hover:bg-gray-100">
          Profile
        </Link>
        <Link href="/profile/my-courses" className="block px-4 py-2 rounded bg-gray-900 text-white">
          My Courses
        </Link>
        <Link href="/profile/my-reviews" className="block px-4 py-2 rounded hover:bg-gray-100">
          My Reviews
        </Link>
      </nav>
    </aside>
  );
}
