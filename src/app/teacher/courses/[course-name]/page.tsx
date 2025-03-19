"use client";
import React, { useState } from 'react';
import CustomerView from './CustomerView';
import ChaptersView from './ChaptersView';
import ReviewsView from './ReviewsView';

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('Reviews');

  return (
    <div className=' w-4/5 p-6 h-screen overflow-y-auto no-scrollbar' >
      {/* Header */}
      <div className="flex items-center">
        <div className="text-blue-500 cursor-pointer hover:underline">&lt; Back</div>
        <h1 className="ml-4 text-2xl font-bold text-gray-900">Spring Boot</h1>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex space-x-6 border-b">
        {['Reviews', 'Customer', 'Chapters', 'Detail'].map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm font-medium ${activeTab === tab
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Nội dung theo tab */}
      <div className="mt-6 ">
        {activeTab === 'Customer' && <CustomerView />}
        {activeTab === 'Chapters' && <ChaptersView />}
        {activeTab === 'Reviews' && <ReviewsView />}
        {activeTab === 'Detail' && (
          <div className="text-gray-500">Detail View (Chưa triển khai)</div>
        )}
      </div>
    </div>

  );
}