"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart.js elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Data for the chart
const chartData = {
  labels: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ],
  datasets: [
    {
      label: "Revenue",
      data: [5000, 4500, 6000, 7000, 8000, 9000, 8000, 9500, 8500, 9000, 9500, 10000],
      borderColor: "#34D399", // Green color
      backgroundColor: "rgba(52, 211, 153, 0.2)", // Light green
      fill: true,
      tension: 0.3,
    },
  ],
};

const Revenue = () => {
  return (
    <div className="min-h-screen flex flex-col px-6 py-6 bg-gray-100">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">Revenue Analytics</h1>

      {/* Revenue Cards and Life Time Sales Chart in one row */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Revenue Cards Section */}
        <div className="flex flex-row gap-4 w-full">
          {[ 
            { title: "Total Profits", value: "$24,340", change: "+8%" },
            { title: "Last Transaction", value: "$98.76", change: "+8%" },
            { title: "Debit", value: "$-103.52", change: "-2%" },
          ].map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md w-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                  <p className="text-sm text-gray-600">{card.title}</p>
                </div>
                <span
                  className={`text-lg font-bold ${card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}
                >
                  {card.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Life Time Sales Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">Life Time Sales</h2>
          <div className="w-full mb-6">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Transactions</h3>

        {/* Search Bar */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search User"
            className="p-2 w-1/3 border rounded-md text-sm"
          />
          <select
            aria-label="Filter by type"
            className="p-2 border rounded-md text-sm"
          >
            <option value="">Filter by Type</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3 text-gray-600">Customer</th>
                <th className="p-3 text-gray-600">Date</th>
                <th className="p-3 text-gray-600">Type</th>
                <th className="p-3 text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">Jon Doe</td>
                  <td className="p-3">12/04/2024</td>
                  <td className="p-3">Credit</td>
                  <td className="p-3">$95.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
