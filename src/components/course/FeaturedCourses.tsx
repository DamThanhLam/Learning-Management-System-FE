"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Star } from "lucide-react";
import StudentCourseCard from "./StudentCourseCard";
import { BASE_URL_COURSE_SERVICE } from "@/utils/BaseURL";

interface Course {
  id: string;
  courseName: string;
  category: string;
  totalReview: number;
  countReviews: number;
  price: number;
  urlAvt: string;
}

interface APIResponse {
  code: number;
  data: Course[];
  message: string;
}

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<APIResponse>(`${BASE_URL_COURSE_SERVICE}/search`, {
        params: {
          page: 0,
          size: 8, // Lấy 8 khóa học để có nhiều lựa chọn filter
          sortBy: "totalReview", // Sắp xếp theo đánh giá
          sortDir: "desc", // Sắp xếp giảm dần
          status: "ACTIVE" // Chỉ lấy các khóa học đang hoạt động
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.code === 200) {
        // Lọc và sắp xếp khóa học theo tiêu chí:
        // 1. Có rating >= 4
        // 2. Có ít nhất 5 lượt đánh giá
        // 3. Sắp xếp theo rating và số lượng đánh giá
        const featuredCourses = response.data.data
          .filter(course =>
            course.totalReview >= 4 && // Rating >= 4
            course.countReviews >= 5 // Ít nhất 5 đánh giá
          )
          .sort((a, b) => {
            // Sắp xếp ưu tiên theo rating và số lượng đánh giá
            if (a.totalReview !== b.totalReview) {
              return b.totalReview - a.totalReview; // Sắp xếp theo rating trước
            }
            return b.countReviews - a.countReviews; // Nếu rating bằng nhau thì sắp xếp theo số lượng đánh giá
          })
          .slice(0, 4); // Chỉ lấy 4 khóa học tốt nhất

        console.log('Featured courses:', featuredCourses); // Log để debug
        setCourses(featuredCourses);
      } else {
        console.error('API Error:', response.data.message); // Log để debug
        setError(response.data.message || "Failed to fetch featured courses");
        setCourses([]);
      }
    } catch (err) {
      console.error("Error fetching featured courses:", err);
      setError("Failed to load featured courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  if (loading) {
    return (
      <div className="mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-md p-4">
              <div className="bg-gray-200 h-48 rounded-lg"></div>
              <div className="mt-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Featured Courses
        </h2>
        <div className="text-center text-red-500 bg-white rounded-lg shadow-md p-6">
          {error}
          <button
            onClick={fetchFeaturedCourses}
            className="ml-4 text-blue-500 hover:text-blue-600 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Featured Courses
        </h2>
        <div className="text-center text-gray-500 bg-white rounded-lg shadow-md p-6">
          No featured courses available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        Featured Courses
        <span className="ml-2 text-sm text-gray-500 font-normal">
          (Top rated courses with most reviews)
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="block hover:shadow-lg transition-shadow duration-200 bg-white rounded-lg shadow-md"
          >
            <StudentCourseCard
              courseName={course.courseName}
              category={course.category}
              price={course.price}
              startTime={new Date().toISOString()}
              lectures={course.countReviews}
              rating={course.totalReview}
              urlAvt={course.urlAvt}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}