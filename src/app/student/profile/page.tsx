// app/profile/my-courses/page.tsx
"use client";

import CourseCard from "@/components/student/profile/CourseCard";
import { fetchCourses } from "@/store/slices/courseSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function MyCoursesPage() {
  const [searchString, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, error, search, sortBy, currentPage, pageSize, totalCourses } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(fetchCourses({ search, page: currentPage, pageSize }));
  }, [dispatch, search, currentPage, pageSize]);

  const totalPages = Math.ceil(totalCourses / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">
          Courses <span className="text-gray-500">(12)</span>
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search User"
              className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Sort By</span>
            <select title="option" className="border rounded px-2 py-1 text-sm">
              <option>Relevance</option>
              <option>Newest</option>
              <option>Top Rated</option>
            </select>
            <button className="border px-3 py-1 rounded text-sm">⚙️ Filter</button>
          </div>
        </div>
      </div>

      {/* Grid of courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading && <p>Loading courses...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && courses.length === 0 && <p>No courses found.</p>}
            {!loading && !error && courses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {courses.map((course : any) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    author={course.teacherName}
                    tearcherName={course.teacherName}
                    rating={course.rating}
                    ratingCount={course.ratingCount} 
                    imageUrl={course.imageUrl}
                  />
                ))}
              </div>
            )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-6">
        <div className="inline-flex items-center border rounded-md overflow-hidden text-sm">
          <button className="px-3 py-1 hover:bg-gray-100">&lt;</button>
          <button className="px-3 py-1 bg-gray-100 font-semibold">1</button>
          <button className="px-3 py-1 hover:bg-gray-100">2</button>
          <button className="px-3 py-1 hover:bg-gray-100">3</button>
          <button className="px-3 py-1 hover:bg-gray-100">&gt;</button>
        </div>
      </div>
    </div>
  );
}
