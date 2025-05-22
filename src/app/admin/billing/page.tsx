"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { BASE_URL_PAYMENT_SERVICE } from "@/utils/BaseURL";
import { checkLogin } from "@/utils/API";

interface PayoutSingle {
  id: string;
  emailPaypal: string;
  amount: number;
  batchStatus: string;
  transactionStatus: string;
  teacherId: string;
  createdAt: string;
}

export default function BillingPage() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<string>("all");
  const [stats, setStats] = useState<{ label: string; value: number }[]>([]);
  const [data, setData] = useState<PayoutSingle[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All status");

  // Month options with 'all' instead of empty string
  const monthOptions = ["all", ...Array.from({ length: 12 }, (_, i) => `${i + 1}`)];
  const statusOptions = ["All status", "REQUIRE", "PENDING", "SUCCESS", "REFUSE", "ERROR"];
  useEffect(() => {
    checkLogin().then(data => {
    }).catch(e => {
      window.location.href = "/login"

    })
  }, [])
  useEffect(() => {
    fetchPayouts();
  }, [year, month]);

  const fetchPayouts = async () => {
    try {
      const params: any = { year };
      if (month !== "all") params.month = parseInt(month, 10);
      const res = await axios.get(
        `${BASE_URL_PAYMENT_SERVICE}/admin/payout`,
        {
          params, withCredentials: true, headers: {
            Authorization: "Bearer " + window.localStorage.getItem("access_token"),
          }
        }
      );
      const list: PayoutSingle[] = res.data.data || [];
      setData(list);

      // Build stats
      const counts = list.reduce((acc, item) => {
        acc[item.transactionStatus] = (acc[item.transactionStatus] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const statArr = Object.entries(counts).map(([label, value]) => ({ label, value }));
      setStats(statArr);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolve = async (id: string, action: 'approve' | 'refuse') => {
    try {
      await axios.get(
        `${BASE_URL_PAYMENT_SERVICE}/admin/resolve-require-payout`,
        {
          params: { requirePayoutId: id, resolve: action },
          withCredentials: true
        }
      );
      fetchPayouts(); // refresh list
    } catch (err) {
      console.error(`Failed to ${action} payout ${id}`, err);
    }
  };

  const filteredData = data
    .filter(
      (item) =>
        item.teacherId.includes(searchTerm) ||
        item.emailPaypal.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (item) => statusFilter === "All status" || item.transactionStatus === statusFilter
    );

  return (
    <div className="flex h-screen">
      <main className="flex-1 bg-white p-8 overflow-auto">
        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
            placeholder="Year"
            className="w-32"
          />
          <Select value={month} onValueChange={(v) => setMonth(v)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((m) => (
                <SelectItem key={m} value={m}>
                  {m === "all" ? "All" : m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Input
              placeholder="Search teacher ID or email"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="flex space-x-8 mb-8">
          {stats.map((item) => (
            <div key={item.label} className="flex-1 text-center">
              <div className="text-4xl font-bold">{item.value}</div>
              <div className="text-gray-400 mt-1 capitalize">{item.label.toLowerCase()}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-gray-50 rounded-lg shadow overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email PayPal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Txn Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 text-gray-700">{row.id}</td>
                  <td className="px-6 py-4 text-gray-700">{row.teacherId}</td>
                  <td className="px-6 py-4 text-gray-500">{row.emailPaypal}</td>
                  <td className="px-6 py-4">{row.amount}</td>
                  <td className="px-6 py-4 capitalize">{row.batchStatus.toLowerCase()}</td>
                  <td className="px-6 py-4 capitalize">{row.transactionStatus.toLowerCase()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(row.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}{' '}
                    {new Date(row.createdAt).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 space-x-2 flex flex-row">
                    {row.batchStatus == "REQUIRE" ?
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleResolve(row.id, 'approve')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleResolve(row.id, 'refuse')}
                        >
                          Refuse
                        </Button>
                      </> :
                      ""
                    }

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}