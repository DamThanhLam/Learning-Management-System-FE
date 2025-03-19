"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Life Time Sales",
      data: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000],
      borderColor: "#34D399", // Green color
      backgroundColor: "rgba(52, 211, 153, 0.2)", // Light green
      fill: true,
      tension: 0.3,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col px-4 py-4 bg-gray-100 h-s">
      {/* Page Title */}
      <h1 className="text-xl font-semibold mb-6 text-gray-900">Dashboard</h1>

      {/* Revenue Cards and Life Time Sales Chart in one row */}
      <div className="flex gap-4 mb-8">
        {/* Revenue Cards Section on the left */}
        <div className="flex flex-col gap-4 w-1/3">
          {[
            {
              title: "Life Time Courses Commission",
              value: "$1K",
              change: "+8%",
            },
            {
              title: "Life Time Received Commission",
              value: "$800.0",
              change: "+8%",
            },
            {
              title: "Life Time Pending Commission",
              value: "$200.00",
              change: "-2%",
            },
          ].map((card, index) => (
            <div key={index} className="bg-white px-8 py-8 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {card.value}
                  </p>
                  <p className="text-sm text-gray-600">{card.title}</p>
                </div>
                <span
                  className={`text-sm font-bold ${
                    card.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {card.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Life Time Sales Chart Section on the right */}
        <div className="bg-white p-4 rounded-lg shadow-md w-2/3">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">
            Life Time Sales
          </h2>
          <div className="w-full mb-6">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Reviews</h3>
        <div className="flex flex-wrap justify-between">
          {/* Total Reviews */}
          <div className="p-7 bg-gray-100 rounded-md text-center">
            <p className="text-2xl font-bold text-gray-900">1000</p>
            <p className="text-sm text-gray-600">Total Reviews</p>
          </div>

          {/* 1 star review */}
          <div className="p-7 bg-red-500 rounded-md text-center text-white">
            <p className="text-2xl font-bold">100</p>
            <p className="text-sm">1 star reviews</p>
            <p className="text-xs mt-2 bg-red-600 rounded-full px-2 py-1 inline-block">
              1.0
            </p>
          </div>

          {/* 2 star review */}
          <div className="p-7 bg-yellow-500 rounded-md text-center text-white">
            <p className="text-2xl font-bold">100</p>
            <p className="text-sm">2 star reviews</p>
            <p className="text-xs mt-2 bg-yellow-600 rounded-full px-2 py-1 inline-block">
              2.0
            </p>
          </div>

          {/* 3 star review */}
          <div className="p-7 bg-orange-400 rounded-md text-center text-white">
            <p className="text-2xl font-bold">100</p>
            <p className="text-sm">3 star reviews</p>
            <p className="text-xs mt-2 bg-orange-500 rounded-full px-2 py-1 inline-block">
              3.0
            </p>
          </div>

          {/* 4 star review */}
          <div className="p-7 bg-green-400 rounded-md text-center text-white">
            <p className="text-2xl font-bold">100</p>
            <p className="text-sm">4 star reviews</p>
            <p className="text-xs mt-2 bg-green-500 rounded-full px-2 py-1 inline-block">
              4.0
            </p>
          </div>

          {/* 5 star review */}
          <div className="p-7 bg-green-600 rounded-md text-center text-white">
            <p className="text-2xl font-bold">100</p>
            <p className="text-sm">5 star reviews</p>
            <p className="text-xs mt-2 bg-green-700 rounded-full px-2 py-1 inline-block">
              5.0
            </p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h3 className="font-semibold text-lg text-gray-900 mb-6">Courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-900">
                Beginner`&apos;`s Guide to Design
              </p>
              <p className="text-sm text-gray-600">
                Price: $50.00 | Chapters: 13 | Orders: 254
              </p>
              <p className="text-sm text-gray-600">
                Certificates: 25 | Reviews: 25 | Added to Shelf: 500
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
