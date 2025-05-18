'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ChartArea = dynamic(() => import('./ChartArea'), { ssr: false });

const ChartSection = () => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Life Time Sales</h2>
      <div className="h-64">
        <ChartArea />
      </div>
    </div>
  );
};

export default ChartSection;
