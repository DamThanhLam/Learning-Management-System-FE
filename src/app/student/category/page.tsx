import StudentCourseGrid from '@/components/course/StudentCourseGrid'
// import PopularTeachers from "@/components/teacher/PopularTeachers";
// import FeaturedCourses from "@/components/course/FeaturedCourses";

export default function Page({ searchParams }: { searchParams: { courseName?: string; category?: string } }) {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 w-full px-4">
        <StudentCourseGrid courseName={searchParams.courseName} category={searchParams.category} />
        {/* <PopularTeachers /> */}
        {/* <FeaturedCourses /> */}
      </div>
    </div>
  )
}
