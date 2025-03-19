'use client'
import React, { useState } from 'react';
import UploadResources from './UploadResources';

export default function ChapterManagement() {
  const [activeTab, setActiveTab] = useState('Details');

  return (
    <div className="flex max-h-screen bg-gray-100 w-4/5 overflow-y-auto no-scrollbar">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className='flex flex-row '>
            <div style={{ fontSize: 35, marginBottom: 6 }} >&#8249;</div>
            <div className='font-bold content-center pl-2'>Chapter 1 - Introduction to Spring Boot</div>
          </div>
          <div className="flex space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Move to Draft
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Chapter
            </button>
          </div>
        </div>

        <div className="flex space-x-6 border-b">
          {['Details', 'Resources'].map((tab) => (
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

        {activeTab === 'Details' && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-blue-500">Chapter details</h3>
            <p className="text-gray-500 mt-2">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <div className='relative'>
                <input
                  placeholder='Enter chapter title'
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded  "
                  defaultValue="Chapter 1 - Introduction to Spring Boot"
                />
                <div className='absolute bottom-0 right-0 text-sm text-gray-500 mt-1'>0/50</div>
              </div>

            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <div className='relative'>
                <textarea
                  placeholder='Enter chapter'
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  rows={4}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1 absolute bottom-0 right-0">0/1000</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Resources' && (
          <UploadResources/>
        )}
      </div>
    </div>
  );
}