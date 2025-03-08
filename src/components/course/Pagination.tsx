// components/course/Pagination.tsx
import React from 'react';

export default function Pagination() {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button className="px-3 py-1 text-gray-600 hover:text-blue-500">&lt;</button>
      <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
      <button className="px-3 py-1 text-gray-600 hover:text-blue-500">2</button>
      <button className="px-3 py-1 text-gray-600 hover:text-blue-500">3</button>
      <button className="px-3 py-1 text-gray-600 hover:text-blue-500">&gt;</button>
    </div>
  );
}