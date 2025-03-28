"use client";

import { HomeIcon, UserIcon, DocumentIcon, CreditCardIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Page() {
  // Dữ liệu mẫu cho bảng người dùng
  const users = [
    { name: 'Andrew Bojangles', status: 'Active', phone: '+79000010101', role: 'Teacher', email: 'dummy@gmail.com', activity: '2 days ago' },
    { name: 'Andrew Bojangles', status: 'Active', phone: '+79000010101', role: 'Teacher', email: 'dummy@gmail.com', activity: '2 days ago' },
    { name: 'Andrew Bojangles', status: 'Active', phone: '+79000010101', role: 'Teacher', email: 'dummy@gmail.com', activity: '2 days ago' },
    { name: 'Andrew Bojangles', status: 'Active', phone: '+79000010101', role: 'Teacher', email: 'dummy@gmail.com', activity: '2 days ago' },
    { name: 'Andrew Bojangles', status: 'Active', phone: '+79000010101', role: 'Teacher', email: 'dummy@gmail.com', activity: '2 days ago' },
  ];

  return (
    <div className="flex h-screen overflow-y-auto no-scrollbar">
      {/* Khu vực nội dung chính */}
      <div className="flex-1 p-6">
        {/* Phần thống kê */}
        <div className="flex justify-around mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold">12</div>
            <div className="text-gray-500">People</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">5</div>
            <div className="text-gray-500">Teachers</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">7</div>
            <div className="text-gray-500">Students</div>
          </div>
        </div>

        {/* Phần tìm kiếm và lọc */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded px-3 py-2 mr-2 flex-1"
          />
          <select className="border border-gray-300 rounded px-3 py-2 mr-2">
            <option>ALL</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 mr-2">
            <option>ALL STATUS</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 mr-2">
            <option>Activity: most recent</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>
        </div>

        {/* Bảng người dùng */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Phone number</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>{user.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-green-500">{user.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.activity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}