"use client";

import { useState } from "react";

// Sample data
const users = [
  { name: "Andrew Bojangles", status: "Active", phone: "+10000010101", role: "Teacher", email: "dummy@gmail.com", activity: "2 days ago" },
  { name: "Andrew Bojangles", status: "Active", phone: "+10000010101", role: "Teacher", email: "dummy@gmail.com", activity: "2 days ago" },
  { name: "Andrew Bojangles", status: "Active", phone: "+10000010101", role: "Teacher", email: "dummy@gmail.com", activity: "2 days ago" },
  { name: "Andrew Bojangles", status: "Active", phone: "+10000010101", role: "Teacher", email: "dummy@gmail.com", activity: "2 days ago" },
];

const UsersPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) => 
      (statusFilter === "All" || user.status === statusFilter) &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col px-6 py-6 bg-gray-100">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">Users</h1>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold text-gray-900">Company</span>
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 p-2 rounded-md text-center">
              <span className="font-semibold text-sm">12</span>
              <p className="text-xs">People</p>
            </div>
            <div className="bg-blue-200 p-2 rounded-md text-center">
              <span className="font-semibold text-sm">5</span>
              <p className="text-xs">Teachers</p>
            </div>
            <div className="bg-green-200 p-2 rounded-md text-center">
              <span className="font-semibold text-sm">7</span>
              <p className="text-xs">Students</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <select
            title="Filter by status"
            className="p-2 border rounded-md text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex items-center border border-gray-300 p-2 rounded-lg">
            <input
              type="text"
              placeholder="Search"
              className="text-sm border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="ml-2 text-gray-500">Search</button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-3 text-gray-600">User</th>
            <th className="p-3 text-gray-600">Status</th>
            <th className="p-3 text-gray-600">Phone number</th>
            <th className="p-3 text-gray-600">Role</th>
            <th className="p-3 text-gray-600">Email</th>
            <th className="p-3 text-gray-600">Activity</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3">{user.phone}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
