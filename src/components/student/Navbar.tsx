// components/Navbar.tsx
"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b px-8 py-4 flex justify-between items-center bg-white">
      {/* Left */}
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-b from-green-400 to-blue-500 rounded-full" />
          <span className="text-lg font-semibold text-gray-800">Byway</span>
        </Link>
        <Link href="/categories" className="text-sm text-gray-700 hover:underline">
          Categories
        </Link>
      </div>

      {/* Center */}
      <div className="flex-1 px-16">
        <div className="relative w-full max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search courses"
            className="w-full border border-gray-300 rounded-full px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-6">
        <Link href="/teach" className="text-sm font-medium text-gray-700 hover:underline">
          Teach on Byway
        </Link>
        <div className="flex items-center space-x-4 text-gray-600 text-lg">
          <span>🤍</span>
          <span>🛒</span>
          <span>🔔</span>
        </div>
        <Link href="/profile">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-medium text-sm text-white">
            J
          </div>
        </Link>
      </div>
    </header>
  );
}
