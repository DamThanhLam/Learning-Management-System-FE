import StudentCourseGrid from "@/components/course/StudentCourseGrid";
import PopularTeachers from "@/components/teacher/PopularTeachers";
import FeaturedCourses from "@/components/course/FeaturedCourses";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 w-full px-4">
        <StudentCourseGrid />
        <PopularTeachers />
        <FeaturedCourses />
      </div>
    </div>
  );
}
