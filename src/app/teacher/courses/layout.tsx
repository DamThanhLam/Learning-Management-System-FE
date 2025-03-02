import Sidebar from '@/components/course/Sidebar';
import React from 'react';

export default function ComponentName({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}