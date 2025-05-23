"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Home, Users, FileText, FilePlus } from "lucide-react"; // Use lucide-react icons for the sidebar
import Image from "next/image";
import ProfileComponent from "@/components/ProfileComponent";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "General", href: "/admin", icon: Home },
  { name: "Student", href: "/admin/users", icon: Users },
  { name: "Teacher", href: "/admin/teachers", icon: FileText },
  { name: "Billing", href: "/admin/billing", icon: FilePlus },
  // { name: "Feedback", href: "/admin/feedback", icon: FilePlus },
];


export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
<div className="flex h-screen overflow-hidden">
  {/* Sidebar */}
  <aside className="w-64 bg-gray-900 flex flex-col fixed left-0 top-0 bottom-0 z-40 shadow-lg">
    {/* Logo */}
    <div className="flex items-center justify-center p-4 bg-gray-800">
      <Image
        src="https://khoi-dev-ktpm.s3.ap-southeast-1.amazonaws.com/logo.png"
        width={40}
        height={40}
        alt="Logo"
      />
      <h4 className="text-lg font-semibold ml-2 text-white">BYway</h4>
    </div>

    {/* Menu */}
    <nav className="flex-1 overflow-y-auto">
      <ul className="space-y-4 py-6 px-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 
                  ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
              >
                <item.icon
                  className={`w-5 h-5 mr-3 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
                <span className="text-base">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>

    {/* Profile */}
    <ProfileComponent />
  </aside>

  {/* Main content with padding to avoid sidebar overlap */}
  <main className="ml-64 flex-1 overflow-y-auto bg-gray-100">
    {children}
  </main>
</div>

  );
}
