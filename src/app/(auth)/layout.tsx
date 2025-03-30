"use client"
import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const authentication = useSelector((state: RootState) => state.authentication);
  if(authentication.authentication) window.location.href="/"
  return (
    <div>
      <div>{children}</div>  {/* Nội dung của các trang con sẽ được render tại đây */}
    </div>
  );
}