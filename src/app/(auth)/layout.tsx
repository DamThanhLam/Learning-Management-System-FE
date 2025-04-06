"use client"
import React from 'react';
import { useSelector } from 'react-redux';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>  {/* Nội dung của các trang con sẽ được render tại đây */}
    </div>
  );
}