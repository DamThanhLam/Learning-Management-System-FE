"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaTachometerAlt, FaBook, FaDollarSign, FaCog, FaChevronDown } from "react-icons/fa";
import { BASE_URL_USER_SERVICE } from "@/utils/BaseURL";

interface SidebarProps {
  pathname: string;
}

const Sidebar: React.FC<SidebarProps> = ({ pathname }) => {
  const [user, setUser] = useState<any>();
  const [openSetting, setOpenSetting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch user info
  useEffect(() => {
    fetch(BASE_URL_USER_SERVICE + '/own', {
      credentials: "include",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),

      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
      });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    window.localStorage.clear()
    // Chuyển về trang login bất kể kết quả
    window.location.href = '/login';
  };

  return (
    <div className="w-1/5 h-screen bg-gray-900 text-white flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="p-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
          <span className="text-xl font-bold">byway</span>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <Link href="/teacher">
            <div className={`flex items-center space-x-2 p-4 ${pathname === 'dashboard' ? 'bg-blue-600' : ''}`}>
              <FaTachometerAlt />
              <span>Dashboard</span>
            </div>
          </Link>

          <Link href="/teacher/courses">
            <div className={`flex items-center space-x-2 p-4 ${pathname === 'courses' ? 'bg-blue-600' : ''}`}>
              <FaBook />
              <span>Courses</span>
            </div>
          </Link>

          <Link href="/teacher/revenue">
            <div className={`flex items-center space-x-2 p-4 ${pathname === 'revenue' ? 'bg-blue-600' : ''}`}>
              <FaDollarSign />
              <span>Revenue</span>
            </div>
          </Link>

          <Link href="/teacher/payout">
            <div className={`flex items-center space-x-2 p-4 ${pathname === 'payout' ? 'bg-blue-600' : ''}`}>
              <FaDollarSign />
              <span>Payout</span>
            </div>
          </Link>

          {/* Setting */}
          <div>
            <div
              onClick={() => setOpenSetting(!openSetting)}
              className={`flex items-center space-x-2 p-4 cursor-pointer ${pathname.startsWith('setting') ? 'bg-blue-600' : ''}`}
            >
              <FaCog />
              <span>Setting</span>
            </div>

            {openSetting && (
              <div className="ml-8">
                <Link href="/teacher/settings/profile">
                  <div className={`p-2 ${pathname === 'settings/profile' ? 'text-blue-400' : ''}`}>Profile</div>
                </Link>
                <Link href="/teacher/settings/change-password">
                  <div className={`p-2 ${pathname === 'settings/change-password' ? 'text-blue-400' : ''}`}>Change Password</div>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* User Dropdown */}
      <div className="p-4 relative" ref={dropdownRef}>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {user?.urlImage ? (
            <img
              src={user.urlImage}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-500 rounded-full" />
          )}
          <span>{user?.userName || "Teacher"}</span>
        </div>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute bottom-14 left-4 bg-white text-black rounded shadow-lg w-40 z-50">
            <Link href="/teacher/settings/profile">
              <div className="p-2 hover:bg-gray-100 cursor-pointer">Profile</div>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
