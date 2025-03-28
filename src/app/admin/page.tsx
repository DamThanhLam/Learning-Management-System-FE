"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Component Sidebar
const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
      {/* Logo/Avatar */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
        <div className="mt-2 text-black font-bold">Company</div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul>
          <li className="mb-4">
            <Link href="/workspace-settings">
              <div
                className={`flex items-center p-2 rounded ${
                  pathname === "/workspace-settings" ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
              >
                <span className="mr-2">🏠</span> General
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/users">
              <div
                className={`flex items-center p-2 rounded ${
                  pathname === "/users" ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
              >
                <span className="mr-2">👤</span> Users
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/teacher-application">
              <div
                className={`flex items-center p-2 rounded ${
                  pathname === "/teacher-application" ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
              >
                <span className="mr-2">🎓</span> Teacher application
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/billing">
              <div
                className={`flex items-center p-2 rounded ${
                  pathname === "/billing" ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
              >
                <span className="mr-2">💳</span> Billing
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sign Out */}
      <div>
        <Link href="/signout">
          <div className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded">
            <span className="mr-2">⬅️</span> Sign out
          </div>
        </Link>
      </div>
    </div>
  );
};

// Component WorkspaceNameSection
const WorkspaceNameSection = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-2xl">📷</span>
        </div>
        <div className="ml-4 flex-1 relative">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded pr-8"
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">📎</span>
        </div>
      </div>
    </div>
  );
};

// Dữ liệu admins
const admins = [
  { name: "John Johnson", role: "CEO", avatar: "👨‍💼" },
  { name: "Jane Cooper", role: "Design Lead", avatar: "👩‍💼" },
];

// Component AdminsSection
const AdminsSection = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Workspace admins</h2>
      <div className="grid grid-cols-3 gap-4">
        {admins.map((admin, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded p-4 relative">
            <div className="absolute top-2 right-2 text-gray-500 cursor-pointer">✖️</div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl">{admin.avatar}</span>
              </div>
              <div className="ml-4">
                <div className="font-bold text-black">{admin.name}</div>
                <div className="text-gray-500">{admin.role}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-white border-2 border-blue-500 rounded p-4 flex items-center justify-center cursor-pointer">
          <div className="text-blue-500 font-bold">+ Add admin</div>
        </div>
      </div>
    </div>
  );
};

// Component SettingsSection
const SettingsSection = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-1/4 text-black">Week start</label>
          <select className="w-1/2 p-2 border border-gray-300 rounded">
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-1/4 text-black">Notification</label>
          <input type="checkbox" className="toggle" defaultChecked />
        </div>
        <div className="flex items-center">
          <label className="w-1/4 text-black">Week start</label>
          <select className="w-1/2 p-2 border border-gray-300 rounded">
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-1/4 text-black">Notification</label>
          <input type="checkbox" className="toggle" defaultChecked />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
  );
};

// Component DangerZoneSection
const DangerZoneSection = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-red-500 mb-4">DANGER ZONE</h2>
      <p className="text-gray-500 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet porta purus.
      </p>
      <button className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50">
        Delete
      </button>
    </div>
  );
};

// Component WorkspaceSettings
const WorkspaceSettings = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">WORKSPACE ADMIN</h1>
      <WorkspaceNameSection />
      <AdminsSection />
    </div>
  );
};

// Component chính của trang
export default function Page() {
  return (
    <div className="flex">
      <WorkspaceSettings />
    </div>
  );
}