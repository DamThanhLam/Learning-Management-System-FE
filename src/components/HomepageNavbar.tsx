"use client";
import { Search, ShoppingCart } from "lucide-react"; // Ensure you have Lucide icons installed
import Link from "next/link"; // Import Link from next/link

export default function HomepageNavbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-b from-green-400 to-blue-500 rounded-full" />
          <span className="text-lg font-semibold text-gray-800">LMS</span>
        </Link>
        <Link href="/categories" className="text-sm text-gray-700 hover:underline">
          Categories
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search courses"
          className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Right Section - Cart, Sign In, Sign Up */}
      <div className="flex items-center space-x-6">
        <Link href="/student/shopping-cart">
          <ShoppingCart className="text-gray-600 hover:text-gray-800 cursor-pointer" size={26} />
        </Link>
        <Link
          href="/sign-in"
          className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}