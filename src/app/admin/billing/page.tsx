"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ChevronDown, FileText, DollarSign, Calendar, Filter } from "lucide-react";
import Toggle from "@/components/Toggle"; // giả định có

interface Invoice {
  id: string;
  student: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
}

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const fetchInvoices = useCallback(async () => {
    // Gọi API để lấy dữ liệu hóa đơn
    // Ví dụ: const res = await fetch(`/api/invoices?status=${statusFilter}&search=${searchTerm}&page=${page}`);
    // const data = await res.json();
    // setInvoices(data.content);
    // setTotalPages(data.totalPages);
    // Hiện tại dùng dữ liệu giả
    const dummy: Invoice[] = Array.from({ length: pageSize }, (_, i) => ({
      id: `INV-${page * pageSize + i + 1}`,
      student: `Student ${page * pageSize + i + 1}`,
      amount: Math.floor(Math.random() * 1000) + 100,
      dueDate: new Date().toISOString().slice(0, 10),
      status: ["Paid", "Pending", "Overdue"][Math.floor(Math.random() * 3)] as any,
    }));
    setInvoices(dummy);
    setTotalPages(5);
  }, [statusFilter, searchTerm, page, pageSize]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
          <FileText className="w-6 h-6 text-blue-500" />
          <span>Billing Management</span>
        </h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            <DollarSign className="w-5 h-5" />
            <span>New Invoice</span>
          </button>
          <button onClick={() => setShowFilter(prev => !prev)} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Invoices", value: 250 },
          { label: "Paid", value: 180 },
          { label: "Pending", value: 50 },
          { label: "Overdue", value: 20 },
        ].map(({ label, value }, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow flex items-center space-x-4 hover:shadow-lg transition">
            <Calendar className="w-10 h-10 text-purple-500" />
            <div>
              <div className="text-sm text-gray-500 uppercase">{label}</div>
              <div className="text-2xl font-semibold text-gray-800">{value}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Filters & Search */}
      <section className="bg-white rounded-2xl p-6 shadow flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search student or invoice..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-gray-50"
          >
            <option value="all">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
          <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        <button onClick={fetchInvoices} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Apply Filters
        </button>
      </section>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Invoice ID</th>
              <th className="px-4 py-2 text-left">Student</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, idx) => (
              <tr key={inv.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                <td className="px-4 py-3">{idx + 1 + page * pageSize}</td>
                <td className="px-4 py-3">{inv.id}</td>
                <td className="px-4 py-3">{inv.student}</td>
                <td className="px-4 py-3">${inv.amount.toFixed(2)}</td>
                <td className="px-4 py-3">{new Date(inv.dueDate).toLocaleDateString('en-GB')}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
                    ${inv.status === 'Paid' ? 'bg-green-100 text-green-600' : inv.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}
                  >{inv.status}</span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button onClick={() => setPage(prev => Math.max(prev-1,0))} disabled={page===0} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
        <span className="text-sm text-gray-600">Page {page+1} of {totalPages}</span>
        <button onClick={() => setPage(prev => Math.min(prev+1,totalPages-1))} disabled={page>=totalPages-1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}