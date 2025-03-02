'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherPage() {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng đến trang /teacher/dashboard khi người dùng truy cập /teacher
    router.push('/teacher/dashboard');
  }, [router]);

  return null; // Không cần hiển thị gì trên trang /teacher
}
