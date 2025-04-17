'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, setSearch, setSortBy, setCurrentPage } from '@/store/slices/courseSlice';
import CourseCard from '@/components/student/profile/CourseCard';
import { AppDispatch, RootState } from '@/store/store';

export default function MyCoursesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, error, search, sortBy, currentPage, pageSize, totalCourses } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(fetchCourses({ search, page: currentPage, category : sortBy , pageSize }));
  }, [dispatch, search, currentPage, pageSize , sortBy]);

  const totalPages = Math.ceil(totalCourses / pageSize);
  useEffect(() => {
    console.log(error, loading, currentPage);
  }, [error, loading, currentPage]);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">
          Courses <span className="text-gray-500">({totalCourses})</span>
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Course"
              className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Sort By</span>
            <select
              title="sort"
              className="border rounded px-2 py-1 text-sm"
              value={sortBy}
              onChange={(e) => {
                console.log(`Sort by: ${e.target.value}`)
                dispatch(setSortBy(e.target.value as 'relevance' | 'newest' | 'topRated'))
              }
              }
            >
              <option value="">All</option>
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="topRated">Top Rated</option>
            </select>
            <button className="border px-3 py-1 rounded text-sm">⚙️ Filter</button>
          </div>
        </div>
      </div>
      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && courses.length === 0 && <p>No courses found.</p>}
      {!loading && !error && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {courses.map((course: any) => (
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

      {!loading && !error && courses.length > 0 && (
        <div className="flex justify-center pt-6">
          <div className="inline-flex items-center border rounded-md overflow-hidden text-sm">
            <button
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1 ${currentPage === page ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'
                  }`}
                onClick={() => dispatch(setCurrentPage(page))}
              >
                {page}
              </button>
            ))}
            <button
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}