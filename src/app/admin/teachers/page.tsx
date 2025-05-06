"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react"; // ✅ Import icon hiện đại
import TeacherReviewModal from "@/components/teacher/TeacherReviewModal"; // ✅ import modal đúng

interface RequireAccount {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
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
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1); // tổng số trang (nếu backend trả về tổng record)
  const [showColumns, setShowColumns] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [detailModalContent, setDetailModalContent] = useState<{
    title: string;
    value: string;
  }>({ title: "", value: "" });
  // Danh sách các cột có thể hiển thị
  const columns: {
    key: keyof RequireAccount | "status" | "action";
    label: string;
  }[] = [
    { key: "userName", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
    { key: "birthday", label: "Birthday" },
    { key: "gender", label: "Gender" },
    { key: "description", label: "Description" },
    { key: "urlImage", label: "Avatar" },
    { key: "cvFile", label: "CV" },
    { key: "status", label: "Status" }, // virtual key
    { key: "action", label: "Action" }, // virtual key
  ];

  // Cột nào đang được hiển thị
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key)
  );

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key)
        ? prev.filter((colKey) => colKey !== key)
        : [...prev, key]
    );
  };

  const [advancedFilters, setAdvancedFilters] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    gender: "",
    description: "",
    hasAvatar: "",
    hasCv: "",
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
        params.append("role", "TEACHER");

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

  // const handleReset = () => {
  //   setType("all");
  //   setKeyword("");
  //   setAdvancedFilters({
  //     userName: "",
  //     email: "",
  //     birthday: "",
  //   });
  //   fetchData();
  // };

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
      <h1 className="text-2xl font-bold text-slate-800 tracking-wide">
        STUDENT MANAGEMENT
      </h1>

      <div className="space-y-4">
        {/* Stats */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: "ALL", value: 120, color: "bg-blue-100 text-blue-700" },
              {
                label: "ACCEPT",
                value: 45,
                color: "bg-emerald-100 text-emerald-600",
              },
              {
                label: "REQUIRE",
                value: 30,
                color: "bg-amber-100 text-amber-700",
              },
              {
                label: "LOCKED",
                value: 25,
                color: "bg-slate-200 text-slate-600",
              },
              {
                label: "REJECT",
                value: 20,
                color: "bg-rose-100 text-rose-600",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className={`flex flex-col items-center justify-center py-4 rounded-lg shadow-sm ${color}`}
              >
                <div className="text-xl font-bold">{value}</div>
                <div className="text-xs uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter & Options Bar */}
        <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col gap-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* Left Side: Filters */}
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    fetchData(e.target.value);
                  }}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="all">All</option>
                  <option value="require">Require</option>
                  <option value="accept">Accept</option>
                  <option value="reject">Reject</option>
                  <option value="locked">Locked</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search keyword..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <button
                onClick={() => {
                  if (showAdvanced) handleSearch();
                  else fetchData();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow"
              >
                {showAdvanced ? "Search (Advanced)" : "Search"}
              </button>

              <button
                onClick={() => setShowAdvanced(true)}
                className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg shadow"
              >
                Advanced Search
              </button>
            </div>

            {/* Right Side: Options */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="pageSize" className="text-sm text-gray-600">
                  Rows:
                </label>
                <select
                  id="pageSize"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(0);
                    fetchData(undefined, 0);
                  }}
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-gray-50"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowColumns((prev) => !prev)}
                  className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg shadow"
                >
                  Columns
                </button>
                {showColumns && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md p-2 w-48 z-10">
                    {columns.map((col) => (
                      <label
                        key={col.key}
                        className="flex items-center gap-2 text-sm py-1"
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(col.key)}
                          onChange={() => toggleColumn(col.key)}
                        />
                        {col.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Filter Modal */}
          {showAdvanced && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Advanced Filters</h3>
                  <button
                    onClick={() => setShowAdvanced(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-400"
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
                    className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={advancedFilters.phoneNumber}
                    onChange={(e) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-400"
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
                    className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    value={advancedFilters.gender}
                    onChange={(e) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    value={advancedFilters.description}
                    onChange={(e) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    value={advancedFilters.hasAvatar ?? ""}
                    onChange={(e) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        hasAvatar: e.target.value,
                      }))
                    }
                    className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Has Avatar?</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  <select
                    value={advancedFilters.hasCv ?? ""}
                    onChange={(e) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        hasCv: e.target.value,
                      }))
                    }
                    className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Has CV?</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setShowAdvanced(false)}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleSearch();
                      setShowAdvanced(false);
                    }}
                    className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg text-sm table-fixed">
          <thead className="bg-slate-100 text-slate-700 uppercase font-semibold tracking-wide border-b border-slate-300 shadow-sm">
            <tr>
              <th className="w-10 px-3 py-2 text-left">#</th>
              <th className="w-20 px-3 py-2 text-left">Avatar</th>
              {columns
                .filter(
                  (col) =>
                    col.key !== "id" &&
                    col.key !== "urlImage" &&
                    visibleColumns.includes(col.key)
                )
                .map((col) => (
                  <th
                    key={col.key}
                    className={`text-left px-3 py-2 truncate ${
                      col.key === "userName"
                        ? "w-36 max-w-[150px]"
                        : col.key === "email"
                        ? "w-48 max-w-[200px]"
                        : col.key === "phoneNumber"
                        ? "w-28"
                        : col.key === "birthday"
                        ? "w-28"
                        : col.key === "gender"
                        ? "w-20"
                        : col.key === "description"
                        ? "w-48 max-w-[250px]"
                        : col.key === "cvFile"
                        ? "w-24"
                        : col.key === "status"
                        ? "w-24"
                        : col.key === "action"
                        ? "w-20"
                        : ""
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
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
                <td className="px-3 py-3 font-medium">{index + 1}</td>
                <td className="px-3 py-3">
                  <img
                    src={
                      app.urlImage ||
                      "https://khoi-dev-ktpm.s3.ap-southeast-1.amazonaws.com/default-icon.png"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </td>
                {columns
                  .filter(
                    (col) =>
                      col.key !== "id" &&
                      col.key !== "urlImage" &&
                      visibleColumns.includes(col.key)
                  )
                  .map((col) => (
                    <td key={col.key} className="px-3 py-3 truncate">
                      {col.key === "cvFile" ? (
                        app.cvFile ? (
                          <a
                            href={
                              app.cvFile.startsWith("http")
                                ? app.cvFile
                                : `https://your-cdn.com/${app.cvFile}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-2 py-1 text-xs rounded-full shadow"
                          >
                            View CV
                          </a>
                        ) : null
                      ) : col.key === "status" ? (
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full ${
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
                      ) : col.key === "gender" ? (
                        <span>
                          {app.gender === "MALE"
                            ? "Male"
                            : app.gender === "FEMALE"
                            ? "Female"
                            : "-"}
                        </span>
                      ) : col.key === "birthday" ? (
                        <span>
                          {new Date(app.birthday).toLocaleDateString("en-GB")}
                        </span>
                      ) : ["userName", "email", "description"].includes(
                          col.key
                        ) ? (
                        (() => {
                          const raw = app[col.key as keyof typeof app];
                          const value = typeof raw === "string" ? raw : "";
                          const isLong = value.length > 40;

                          return (
                            <span
                              className={`block max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis ${
                                isLong
                                  ? "cursor-pointer hover:underline hover:text-blue-600"
                                  : ""
                              }`}
                              title={value}
                              onClick={() => {
                                if (isLong) {
                                  setDetailModalContent({
                                    title: col.label,
                                    value,
                                  });
                                  setShowDetailModal(true);
                                }
                              }}
                            >
                              {isLong
                                ? `${value.slice(0, 40)}...`
                                : value || "-"}
                            </span>
                          );
                        })()
                      ) : col.key === "action" ? (
                        <button className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-2.5 py-1 text-xs rounded-full shadow">
                          Lock
                        </button>
                      ) : (
                        <span>{app[col.key] || "-"}</span>
                      )}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {detailModalContent.title}
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-line break-words">
              {detailModalContent.value}
            </p>
          </div>
        </div>
      )}

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
