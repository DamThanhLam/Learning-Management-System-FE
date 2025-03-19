"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Home, Users, FileText, FilePlus } from "lucide-react"; // Use lucide-react icons for the sidebar
import Image from "next/image";

const menuItems = [
  { name: "General", href: "admin/users", icon: Home },
  { name: "Student", href: "admin/users", icon: Users },
  { name: "Teacher", href: "admin/teachers", icon: FileText },
  { name: "Billing", href: "admin/teachers", icon: FilePlus },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col h-screen">
        {/* Company Logo */}
        <div className="flex items-center justify-center p-4 bg-gray-200">
          <Image src="/logo.png" width={40} height={40} alt="Logo" />
          <h4 className="text-lg font-semibold ml-2">Company</h4>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-4 py-6 px-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center p-3 rounded-lg transition-colors duration-200 hover:bg-blue-100"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-base">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sign Out */}
        <div className="p-4 mt-auto text-center">
          <Link
            href="/signout"
            className="flex items-center p-3 rounded-lg transition-colors duration-200 hover:bg-red-100"
          >
            <span className="text-base text-red-500">Sign out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white rounded-lg shadow-md">
        {children}
      </main>
    </div>
  );
}
