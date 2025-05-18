'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: '1', a: 0, b: 0, c: 0 },
  { month: '2', a: 100, b: 20, c: 10 },
  { month: '3', a: 150, b: 50, c: 20 },
  { month: '4', a: 250, b: 80, c: 40 },
  { month: '5', a: 300, b: 100, c: 50 },
  { month: '6', a: 400, b: 130, c: 60 },
  { month: '7', a: 500, b: 170, c: 90 },
  { month: '8', a: 650, b: 200, c: 100 },
  { month: '9', a: 700, b: 250, c: 120 },
  { month: '10', a: 800, b: 300, c: 150 },
  { month: '11', a: 850, b: 350, c: 160 },
  { month: '12', a: 950, b: 400, c: 200 }
];

const ChartArea = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="month" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey="a" stroke="#8884d8" fillOpacity={1} fill="url(#colorA)" />
      <Area type="monotone" dataKey="b" stroke="#82ca9d" fillOpacity={1} fill="url(#colorB)" />
      <Area type="monotone" dataKey="c" stroke="#ffc658" fillOpacity={1} fill="url(#colorC)" />
    </AreaChart>
  </ResponsiveContainer>
);

export default ChartArea;
