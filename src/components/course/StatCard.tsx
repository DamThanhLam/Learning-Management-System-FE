// components/course/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  color?: string;
}

export default function StatCard({ title, value, color }: StatCardProps) {
  const colorClass = {
    red: 'text-red-500',
    orange: 'text-orange-500',
    yellow: 'text-yellow-500',
    green: 'text-green-500',
    darkgreen: 'text-green-700',
  }[color || ''] || 'text-gray-900';

  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </div>
  );
}