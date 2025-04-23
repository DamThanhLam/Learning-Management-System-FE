"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react"; // ✅ Import icon hiện đại
import TeacherReviewModal from "@/components/teacher/TeacherReviewModal"; // ✅ import modal đúng

interface RequireAccount {
  id: string;
  userName: string;
  email: string;
  birthday: string;
  description: string;
  accountStatus: string;
  gender: string;
  urlImage: string;
  cvFile: string;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const TeacherApplication = () => {
  const [applications, setApplications] = useState<RequireAccount[]>([]);
  const [selectedApp, setSelectedApp] = useState<RequireAccount | null>(null);
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(7); // Giữ pageSize cố định 10 dòng mỗi trang
  const [totalPages, setTotalPages] = useState(1); // tổng số trang (nếu backend trả về tổng record)

  const [advancedFilters, setAdvancedFilters] = useState({
    userName: "",
    email: "",
    birthday: "",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fetchData = useCallback(
    async (typeInput?: string, pageInput?: number) => {
      try {
        const token = getCookie("access_token");

        let url = "http://localhost:8082/api/v1/teacher/get-all-account";

        const params = new URLSearchParams();
        const selectedType = typeInput || type;
        const selectedPage = pageInput ?? page;

        if (selectedType !== "all")
          params.append("accountStatus", selectedType);
        if (keyword) params.append("keyword", keyword);
        if (advancedFilters.userName)
          params.append("userName", advancedFilters.userName);
        if (advancedFilters.email)
          params.append("email", advancedFilters.email);
        if (advancedFilters.birthday)
          params.append("birthday", advancedFilters.birthday);

        params.append("page", selectedPage.toString());
        params.append("pageSize", pageSize.toString());

        if (params.toString()) url += `?${params.toString()}`;

        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          credentials: "include",
        });

        const data = await res.json();
        const accountList = data?.["require-account-list"];

        if (accountList) {
          setApplications(accountList.content || []);
          setTotalPages(accountList.totalPages || 1);
        }
      } catch (error) {
        console.error("Failed to fetch applications", error);
      }
    },
    [type, keyword, advancedFilters, page, pageSize]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = () => {
    fetchData();
  };

  const handleReset = () => {
    setType("all");
    setKeyword("");
    setAdvancedFilters({
      userName: "",
      email: "",
      birthday: "",
    });
    fetchData();
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(undefined, nextPage); // fetch ngay page mới
  };

  const handlePreviousPage = () => {
    const prevPage = Math.max(page - 1, 0);
    setPage(prevPage);
    fetchData(undefined, prevPage);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">TEACHER APPLICATION</h1>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Type filter */}
          <div className="relative">
            <select
              title="Select type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                fetchData(e.target.value); // Gọi lại fetchData ngay khi đổi select
              }}
              className="appearance-none p-2 pr-8 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All</option>
              <option value="require">Require</option>
              <option value="accept">Accept</option>
              <option value="reject">Reject</option>
              <option value="locked">Locked</option>
            </select>

            <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Keyword input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {showAdvanced ? "Hide Advanced" : "Advanced Search"}
            </button>

            <button
              onClick={handleSearch}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Search
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Advanced search */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Username"
              value={advancedFilters.userName}
              onChange={(e) =>
                setAdvancedFilters((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }))
              }
              className="p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Email"
              value={advancedFilters.email}
              onChange={(e) =>
                setAdvancedFilters((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
            />
            <input
              title="Select birthday"
              type="date"
              value={advancedFilters.birthday}
              onChange={(e) =>
                setAdvancedFilters((prev) => ({
                  ...prev,
                  birthday: e.target.value,
                }))
              }
              className="p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 font-semibold text-gray-700">
                Applicant
              </th>
              <th className="text-left p-3 font-semibold text-gray-700">
                Birthday
              </th>
              <th className="text-left p-3 font-semibold text-gray-700">
                Description
              </th>
              <th className="text-left p-3 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left p-3 font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr
                key={app.id || index}
                className="even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="p-3">
                  <div className="font-medium">{app.userName}</div>
                  <div className="text-gray-500 text-xs">{app.email}</div>
                </td>
                <td className="p-3">{app.birthday}</td>
                <td className="p-3 max-w-xs truncate">{app.description}</td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    {app.accountStatus}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    onClick={() => setSelectedApp(app)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="text-sm text-gray-600">
          Page {page + 1} {totalPages ? `of ${totalPages}` : ""}
        </div>

        <button
          onClick={handleNextPage}
          disabled={Boolean(totalPages) && page >= totalPages - 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedApp && (
        <TeacherReviewModal
          selectedApp={selectedApp}
          setSelectedApp={setSelectedApp}
          refreshData={() => fetchData()}
        />
      )}
    </div>
  );
};

export default TeacherApplication;
