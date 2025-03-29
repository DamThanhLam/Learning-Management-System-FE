"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Heart, ShoppingCart, Bell } from "lucide-react"; // Ensure you have Lucide icons installed
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  // Example user data
  const user = {
    name: "John Doe",
    urlAva: "https://picsum.photos/200", // Replace with user's actual photo URL (or leave empty for initials)
  };

  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    if (profileRef.current && !(profileRef.current as HTMLElement).contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  // Attach event listener when dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

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

      {/* Right Section - Icons & Profile */}
      <div className="flex items-center space-x-6">
        <button className="text-gray-600 hover:text-gray-800">Teach on LMS</button>
        <Heart className="text-gray-600 hover:text-gray-800 cursor-pointer" size={26} />
        <Link href="/student/shopping-cart">
          <ShoppingCart className="text-gray-600 hover:text-gray-800 cursor-pointer" size={26} />
        </Link>
        <Bell className="text-gray-600 hover:text-gray-800 cursor-pointer" size={26} />

        {/* User Profile Picture / Initials */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {user.urlAva ? (
              <Image
                src={user.urlAva}
                alt="User Avatar"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-semibold">
                {user.name[0]}
              </div>
            )}
          </button>

          {/* Pop-up Dropdown */}
          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
              onMouseLeave={() => setIsOpen(false)} // Close dropdown when cursor leaves
            >
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href="/profile">
                    Profile
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href="/student/settings">
                    Settings
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}