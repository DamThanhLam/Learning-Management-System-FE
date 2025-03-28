'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, DollarSign, Settings } from 'lucide-react';
import Sidebar from '@/components/course/Sidebar';


export default function Layout({ children }: { children: ReactNode }) {

  return (
    <div>
      {children}
    </div>
  );
}
