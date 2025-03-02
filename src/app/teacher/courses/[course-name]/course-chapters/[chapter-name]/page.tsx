'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FunctionName({ params }: { params: { 'course-name': string, 'chapter-name': string } }) {
  const router = useRouter();
  
  useEffect(() => {
    const { 'course-name': courseName, 'chapter-name': chapterName } = params;
    router.push(`/teacher/courses/${courseName}/course-chapters/${chapterName}/chapter-details`);
  }, [params, router]);

  return null;
}
