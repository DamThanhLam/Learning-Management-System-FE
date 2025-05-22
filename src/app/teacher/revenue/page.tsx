"use client";

import React, { useState, useEffect } from 'react';
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
import Sidebar from '@/components/teacher/Sidebar';
import { BASE_URL_STATISTICAL_SERVICE } from '@/utils/BaseURL';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

export default function Revenue() {
  const [details, setDetails] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() - 1, 1);
  });
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    async function loadData() {
      try {
        const from = formatDate(startDate);
        const to = formatDate(endDate);
        const resp = await fetch(
          `${BASE_URL_STATISTICAL_SERVICE}/orders?from=${from}&to=${to}`,
          {
            credentials: 'include',
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("access_token"),

            }
          }
        );
        if (!resp.ok) throw new Error('Network response was not ok');
        const data = await resp.json();
        setDetails(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, [startDate, endDate]);

  useEffect(() => {
    let temp = [...details];
    if (searchUser.trim()) {
      temp = temp.filter(d =>
        d.userName.toLowerCase().includes(searchUser.trim().toLowerCase())
      );
    }
    if (searchCourse.trim()) {
      temp = temp.filter(d =>
        d.courseName.toLowerCase().includes(searchCourse.trim().toLowerCase())
      );
    }
    if (filterStatus) {
      temp = temp.filter(d => d.status === filterStatus);
    }
    setFiltered(temp);
  }, [details, searchUser, searchCourse, filterStatus]);

  const dateArray = [];
  for (
    let dt = new Date(startDate);
    dt <= endDate;
    dt.setDate(dt.getDate() + 1)
  ) {
    dateArray.push(formatDate(new Date(dt)));
  }

  const revenueMap = filtered.reduce((acc, d) => {
    const day = d.date.split('T')[0];
    acc[day] = (acc[day] || 0) + (d.price > 0 ? d.price : 0);
    return acc;
  }, {});

  const revenueData = dateArray.map(day => revenueMap[day] || 0);
  const totalRevenue = revenueData.reduce((a, b) => a + b, 0).toFixed(2);

  const chartData = {
    labels: dateArray,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        borderColor: '#34D399',
        backgroundColor: 'rgba(52,211,153,0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        ticks: {
          maxRotation: 0,
          autoSkip: true,
        }
      },
      y: { beginAtZero: true }
    }
  };

  const statusColor = status => {
    switch (status) {
      case 'SUCCESS': return 'bg-green-100 text-green-800';
      case 'FAIL': return 'bg-red-100 text-red-800';
      case 'ERROR': return 'bg-yellow-100 text-yellow-800';
      case 'INITIAL': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex bg-gray-50 h-screen w-full">
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Revenue Analytics</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-sm uppercase text-gray-500">Total Revenue</h2>
            <p className="text-2xl font-semibold mt-2">${totalRevenue}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-sm uppercase text-gray-500">Date Range</h2>
            <p className="mt-2">{formatDate(startDate)} - {formatDate(endDate)}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-sm uppercase text-gray-500">Transactions</h2>
            <p className="text-2xl font-semibold mt-2">{filtered.length}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search User"
            value={searchUser}
            onChange={e => setSearchUser(e.target.value)}
            className="flex-grow p-2 border rounded text-sm"
          />
          <input
            type="text"
            placeholder="Search Course"
            value={searchCourse}
            onChange={e => setSearchCourse(e.target.value)}
            className="flex-grow p-2 border rounded text-sm"
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="p-2 border rounded text-sm"
          >
            <option value="">All Status</option>
            {['SUCCESS', 'FAIL', 'ERROR', 'INITIAL'].map(s => (
              <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
            ))}
          </select>
          <input
            type="date"
            value={formatDate(startDate)}
            onChange={e => setStartDate(new Date(e.target.value))}
            className="p-2 border rounded text-sm"
          />
          <input
            type="date"
            value={formatDate(endDate)}
            onChange={e => setEndDate(new Date(e.target.value))}
            className="p-2 border rounded text-sm"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="w-full h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4">Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Course</th>
                  <th className="p-2">User</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => (
                  <tr key={d.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{d.id}</td>
                    <td className="p-2">{d.courseName}</td>
                    <td className="p-2">{d.userName}</td>
                    <td className="p-2">{d.date.split('T')[0]}</td>
                    <td className={`p-2 rounded ${statusColor(d.status)}`}>{d.status}</td>
                    <td className="p-2">${d.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}