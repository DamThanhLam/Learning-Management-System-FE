'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, DollarSign, Settings } from 'lucide-react';
import Sidebar from '@/components/course/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export default function Layout({ children }: { children: ReactNode }) {
  const authentication = useSelector((state: RootState) => state.authentication);
  if(!authentication.authentication || !authentication.user?.groups?.includes("TEACHER")) window.location.href="/"
  
  return (
    <div>
      {children}
    </div>
  );
}
