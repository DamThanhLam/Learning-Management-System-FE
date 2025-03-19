"use client";

import { useState } from "react";

const applicants = [
  { name: "Andrew Bojangles", email: "andrew@gmail.com", submitted: "Feb 25, 2025", expertise: "Software engineering", status: "Pending" },
  { name: "John Doe", email: "john@gmail.com", submitted: "Feb 20, 2025", expertise: "Mathematics", status: "Approved" },
  { name: "Jane Smith", email: "jane@gmail.com", submitted: "Feb 18, 2025", expertise: "Physics", status: "Rejected" },
];

const TeacherApplication = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplicants = applicants.filter(
    (applicant) =>
      (statusFilter === "All" || applicant.status === statusFilter) &&
      (applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col px-6 py-6 bg-gray-100">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">TEACHER APPLICATION</h1>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {/* Search & Filters */}
        <div className="flex space-x-4">
          <div className="flex items-center">
            <select
              title="Filter by status"
              className="p-2 border rounded-md text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex items-center border border-gray-300 p-2 rounded-lg">
            <input
              type="text"
              placeholder="Search applicant"
              className="text-sm border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="ml-2 text-gray-500">Search</button>
          </div>
        </div>

        {/* Search Button */}
        <button className="bg-blue-500 text-white p-2 rounded-lg">Search</button>
      </div>

      {/* Teacher Applications Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 text-gray-600">Applicant</th>
              <th className="p-3 text-gray-600">Submitted</th>
              <th className="p-3 text-gray-600">Expertise</th>
              <th className="p-3 text-gray-600">Status</th>
              <th className="p-3 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{applicant.name}<br/><span className="text-sm text-gray-500">{applicant.email}</span></td>
                <td className="p-3">{applicant.submitted}</td>
                <td className="p-3">{applicant.expertise}</td>
                <td className={`p-3 ${applicant.status === "Pending" ? "bg-yellow-400" : applicant.status === "Approved" ? "bg-green-500" : "bg-red-500"} text-white`}>
                  {applicant.status}
                </td>
                <td className="p-3">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherApplication;
