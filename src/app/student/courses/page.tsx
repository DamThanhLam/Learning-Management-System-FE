'use client'

import StudentCourseGrid from '@/components/course/StudentCourseGrid'
import PopularTeachers from '@/components/teacher/PopularTeachers'
import FeaturedCourses from '@/components/course/FeaturedCourseCard'

export default function Student() {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 w-full px-4">
        <StudentCourseGrid /> {/* Fetches its own data */}
        <PopularTeachers /> {/* Fetches its own data */}
        <FeaturedCourses /> {/* Fetches its own data */}
      </div>
    </div>
  )
}
