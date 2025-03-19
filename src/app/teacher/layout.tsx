'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, DollarSign, Settings } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/teacher', icon: Home },
  { name: 'Courses', href: '/teacher/courses', icon: BookOpen },
  { name: 'Revenue', href: '/teacher/revenue', icon: DollarSign },
  { name: 'Setting', href: '/teacher/settings', icon: Settings },
];

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col h-screen">
        <div className="flex items-center space-x-3 mb-10">
          <Image src="/logo.png" width={40} height={40} alt="Logo" />
          <h4 className="text-base font-semibold">Byway</h4>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-4 rounded-lg transition-colors duration-200 hover:bg-blue-700 ${
                    pathname === item.href ? 'bg-blue-800' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-base">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex items-center space-x-3 p-4 border-t border-gray-700">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <span className="text-sm text-gray-300">Hi, John</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 rounded-lg shadow-lg overflow-y-auto h-screen bg-gray-100">
        <div className="space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
