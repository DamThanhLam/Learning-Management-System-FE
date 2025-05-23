// import Sidebar from '@/components/course/Sidebar';
import Sidebar from '@/components/teacher/Sidebar';
import React from 'react';

export default function ComponentName({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-100 max-h-screen">
      <Sidebar pathname={"setting"}/>
      {children}
    </div>
  );
}