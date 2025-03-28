// app/page.tsx
export default function Page() {
    return (
      <div className="flex-1 h-screen  overflow-y-auto no-scrollbar bg-gray-100">
        {/* Khu vực nội dung chính */}
        <div className=" p-6 bg-gray-100">
          {/* Thẻ thống kê */}
          <div className="flex divide-x divide-gray-200 mb-6 justify-center">
            <div className="px-24">
              <div className="text-4xl font-bold text-gray-900 text-center">12</div>
              <div className="text-sm text-gray-500">People</div>
            </div>
            <div className="px-24">
              <div className="text-4xl font-bold text-gray-900 text-center">5</div>
              <div className="text-sm text-gray-500">Teachers</div>
            </div>
            <div className="px-24">
              <div className="text-4xl font-bold text-gray-900 text-center">7</div>
              <div className="text-sm text-gray-500">Number Feedback</div>
            </div>
          </div>
  
          {/* Thanh tìm kiếm và bộ lọc */}
          <div className="mb-6">
            <div className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search teacher name"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded"
                  style={{width:"100%"}}
                />
                <span className="absolute left-3 top-2 text-gray-400">🔍</span>
              </div>
              <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded flex items-center">
                <span className="mr-2">🔍</span> Search
              </button>
            </div>
            <div className="mt-4 flex space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded text-blue-500">
                <option>ALL</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded text-blue-500">
                <option>ALL STATUS</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded text-blue-500">
                <option>ACTIVITY: MOST RECENT</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded text-blue-500">
                <option>FEEDBACK NUMBER: MOST</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded text-blue-500">
                <option>ROLE: TEACHER</option>
              </select>
            </div>
          </div>
  
          {/* Bảng danh sách giáo viên */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  Teacher name
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  Account Status
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  Phone number
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  Role
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  Email
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  Feedback number
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b even:bg-gray-50">
                <td className="px-4 py-2 flex items-center">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  Andrew Bojangles
                </td>
                <td className="px-4 py-2 text-green-500">Active</td>
                <td className="px-4 py-2">+79000010101</td>
                <td className="px-4 py-2">Teacher</td>
                <td className="px-4 py-2">dummy@gmail.com</td>
                <td className="px-4 py-2">100</td>
              </tr>
              <tr className="border-b even:bg-gray-50">
                <td className="px-4 py-2 flex items-center">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  Andrew Bojangles
                </td>
                <td className="px-4 py-2 text-green-500">Active</td>
                <td className="px-4 py-2">+79000010101</td>
                <td className="px-4 py-2">Teacher</td>
                <td className="px-4 py-2">dummy@gmail.com</td>
                <td className="px-4 py-2">10</td>
              </tr>
              <tr className="border-b even:bg-gray-50">
                <td className="px-4 py-2 flex items-center">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  Andrew Bojangles
                </td>
                <td className="px-4 py-2 text-green-500">Active</td>
                <td className="px-4 py-2">+79000010101</td>
                <td className="px-4 py-2">Teacher</td>
                <td className="px-4 py-2">dummy@gmail.com</td>
                <td className="px-4 py-2">10</td>
              </tr>
              <tr className="border-b even:bg-gray-50">
                <td className="px-4 py-2 flex items-center">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  Andrew Bojangles
                </td>
                <td className="px-4 py-2 text-green-500">Active</td>
                <td className="px-4 py-2">+79000010101</td>
                <td className="px-4 py-2">Teacher</td>
                <td className="px-4 py-2">dummy@gmail.com</td>
                <td className="px-4 py-2">10</td>
              </tr>
              <tr className="border-b even:bg-gray-50">
                <td className="px-4 py-2 flex items-center">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  Andrew Bojangles
                </td>
                <td className="px-4 py-2 text-green-500">Active</td>
                <td className="px-4 py-2">+79000010101</td>
                <td className="px-4 py-2">Teacher</td>
                <td className="px-4 py-2">dummy@gmail.com</td>
                <td className="px-4 py-2">10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }