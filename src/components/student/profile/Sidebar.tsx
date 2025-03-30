// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="w-64 bg-white border-r p-6 space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24 rounded-full bg-gray-300" />
        <h2 className="text-lg font-semibold">John Doe</h2>
        <button className="text-sm text-gray-500 hover:underline">Share Profile 🔗</button>
      </div>
      <nav className="space-y-2">
        <Link
          href="/student/profile/my-profile"
          className={`block px-4 py-2 rounded ${isActive("/student/profile/my-profile") ? "bg-gray-900 text-white" : "hover:bg-gray-100"
            }`}
        >
          My Profile
        </Link>
        <Link
          href="/student/profile/my-courses"
          className={`block px-4 py-2 rounded ${isActive("/student/profile/my-courses") ? "bg-gray-900 text-white" : "hover:bg-gray-100"
            }`}
        >
          My Courses
        </Link>
        <Link
          href="/student/profile/my-review"
          className={`block px-4 py-2 rounded ${isActive("/student/profile/my-review") ? "bg-gray-900 text-white" : "hover:bg-gray-100"
            }`}
        >
          My Reviews
        </Link>
      </nav>
    </aside>
  );
}
