import React from 'react';
import ChartSection from '@/components/ChartSection';



const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Life Time Courses Commission</p>
          <p className="text-xl font-bold">$1K</p>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Life Time Received Commission</p>
          <p className="text-xl font-bold">$800.00</p>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Life Time Pending Commission</p>
          <p className="text-xl font-bold">$200.00</p>
        </div>
      </div>
      {/* Chart */}
      <ChartSection />

      {/* Reviews */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Reviews</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Total Reviews</p>
            <p className="text-xl font-bold">1000</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">1 star reviews</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xl font-bold">100</p>
              <span className="px-2 py-1 text-sm rounded bg-red-100 text-red-500">1.0</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">2 star reviews</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xl font-bold">100</p>
              <span className="px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-600">2.0</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">3 star reviews</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xl font-bold">100</p>
              <span className="px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-600">3.0</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">4 star reviews</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xl font-bold">100</p>
              <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-600">4.0</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">5 star reviews</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xl font-bold">100</p>
              <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-600">5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-200 px-2 py-1 rounded text-sm font-semibold">Free</span>
                <span className="text-sm text-gray-700 font-medium">Beginner's Guide to Design</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">$50.00</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>13 Chapters</li>
                <li>254 Orders</li>
                <li>25 Certificates</li>
                <li>25 Reviews</li>
                <li>500 Added to Shelf</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;