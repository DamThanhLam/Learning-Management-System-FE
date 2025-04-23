"use client"; // 👈 Dòng này cần ở đầu tiên!

import Link from "next/link";
import { FaTachometerAlt, FaBook, FaDollarSign, FaCog } from "react-icons/fa";
import ProfileComponent from "../ProfileComponent";
import { useEffect, useState } from "react";
import { BASE_URL_USER_SERVICE } from "@/utils/BaseURL";

interface SidebarProps {
  pathname: string;
}
const Sidebar: React.FC<SidebarProps> = ({ pathname }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    fetch(BASE_URL_USER_SERVICE + '/own', {
      credentials: "include"
    }).then(res => res.json()) // 👈 nhớ parse JSON
      .then(data => {
        setUser(data.user)
      })
  }, []);

  return (
    <div className="w-1/5 h-screen bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
          <span className="text-xl font-bold">byway</span>
        </div>
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
          <Link href="/teacher/settings">
            <div className={`flex items-center space-x-2 p-4 ${pathname === 'setting' ? 'bg-blue-600' : ''}`}>
              <FaCog />
              <span>Setting</span>
            </div>
          </Link>
        </nav>
      </div>
      <div className="p-4 flex items-center space-x-2">
        {user?.urlImage ? (
          <img
            src={user.urlImage}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-500 rounded-full" />
        )}

        <span>{user && user.userName}</span>
      </div>
    </div>
  );
};

export default Sidebar;
