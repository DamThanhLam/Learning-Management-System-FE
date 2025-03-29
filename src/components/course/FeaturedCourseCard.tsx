"use client";

import Link from "next/link"; // Import Link for navigation
import StudentCourseCard from "./StudentCourseCard"; // Use StudentCourseCard instead of CourseCard

const courses = [
    {
        id: 1,
        courseName: "Course 1",
        category: "Design",
        rating: 4.5,
        price: 0,
        lectures: 5,
        startTime: "2025-01-01T00:00:00",
        urlAvt: "https://picsum.photos/400/300",
      },
      {
        id: 2,
        courseName: "Course 2",
        category: "Development",
        rating: 4.0,
        price: 50,
        lectures: 12,
        startTime: "2025-02-01T00:00:00",
        urlAvt: "https://picsum.photos/400/300",
      },
      {
        id: 3,
        courseName: "Course 3",
        category: "Marketing",
        rating: 3.5,
        price: 100,
        lectures: 8,
        startTime: "2025-03-01T00:00:00",
        urlAvt: "https://picsum.photos/400/300",
      },
      {
        id: 4,
        courseName: "Course 4",
        category: "Business",
        rating: 3.8,
        price: 75,
        lectures: 10,
        startTime: "2025-04-01T00:00:00",
        urlAvt: "https://picsum.photos/400/300",
      },
];

export default function FeaturedCourses() {
  return (
    <div className="mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Featured Courses</h2>

      {/* Fixed 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`} // Dynamic route for course detail page
            className="block hover:shadow-lg transition-shadow duration-200"
          >
            <StudentCourseCard {...course} />
          </Link>
        ))}
      </div>
    </div>
  );
}