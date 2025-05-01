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
        params.append("role", "STUDENT");

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
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">STUDENT MANAGEMENT</h1>

      {/* Bảng thống kê */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: "ALL", value: 120, color: "bg-blue-100 text-blue-700" },
          {
            label: "ACCEPT",
            value: 45,
            color: "bg-emerald-100 text-emerald-600",
          },
          { label: "REQUIRE", value: 30, color: "bg-amber-100 text-amber-700" },
          { label: "LOCKED", value: 25, color: "bg-slate-200 text-slate-600" },
          { label: "REJECT", value: 20, color: "bg-rose-100 text-rose-600" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className={`flex flex-col items-center justify-center p-3 rounded-lg shadow-sm ${color}`}
          >
            <div className="text-xl font-bold">{value}</div>
            <div className="text-xs uppercase tracking-wide">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-xl shadow-lg space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Type filter */}
          <div className="relative">
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                fetchData(e.target.value);
              }}
              className="appearance-none p-2 pr-8 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Button duy nhất */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (showAdvanced) handleSearch();
                else fetchData();
              }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition"
            >
              {showAdvanced ? "Search (Advanced)" : "Search"}
            </button>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="bg-slate-300 hover:bg-slate-400 text-gray-800 font-medium px-4 py-2 rounded-lg shadow transition"
            >
              {showAdvanced ? "Hide Advanced" : "Advanced Search"}
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
              className="p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
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
              className="p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
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
              className="p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-slate-100 text-slate-700 text-sm uppercase font-semibold tracking-wide border-b border-slate-300 shadow-sm">
            <tr>
              <th className="px-6 py-3 text-left">Applicant</th>
              <th className="px-6 py-3 text-left">Birthday</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {applications.map((app, index) => (
              <tr
                key={app.id || index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50"
                } border-b border-slate-200 hover:bg-blue-50 transition-all duration-150`}
              >
                <td className="px-6 py-4">
                  <div className="font-medium">{app.userName}</div>
                  <div className="text-sm text-slate-500">{app.email}</div>
                </td>
                <td className="px-6 py-4">{app.birthday}</td>
                <td className="px-6 py-4 max-w-xs truncate">
                  {app.description}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full
                ${
                  app.accountStatus === "ACCEPT"
                    ? "bg-emerald-100 text-emerald-600"
                    : app.accountStatus === "REJECT"
                    ? "bg-rose-100 text-rose-600"
                    : app.accountStatus === "LOCKED"
                    ? "bg-slate-100 text-slate-500"
                    : "bg-amber-100 text-amber-600"
                }`}
                  >
                    {app.accountStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="inline-flex items-center gap-1 bg-rose-500 hover:bg-rose-600 text-white font-medium px-3 py-1 text-xs rounded-full shadow transition"
                    // onClick={() => setSelectedApp(app)}
                  >
                    Lock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="text-sm text-slate-600">
          Page {page + 1} {totalPages ? `of ${totalPages}` : ""}
        </div>

        <button
          onClick={handleNextPage}
          disabled={Boolean(totalPages) && page >= totalPages - 1}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TeacherApplication;
