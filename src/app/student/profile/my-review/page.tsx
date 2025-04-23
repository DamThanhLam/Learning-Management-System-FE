// app/profile/my-reviews/page.tsx
"use client";

import { useState, useEffect } from "react";
import ReviewCard from "@/components/student/profile/ReviewCard";
import { BASE_URL_REVIEW_SERVICE, BASE_URL_COURSE_SERVICE } from "@/utils/BaseURL";
import axios from "axios";
import Image from "next/image";

interface Review {
  id: number;
  courseId: number;
  courseTitle: string;
  author: string;
  rating: number;
  ratingCount: number;
  reviewText: string;
  imageUrl: string;
  createdAt: string;
}

interface Course {
  id: string;
  courseName: string;
  teacherName: string;
  teacherId: string;
  totalReview: number;
  countReviews: number;
  price: number;
  urlAvt: string;
}

interface APIResponse {
  code: number;
  data: Review[];
  message: string;
  totalPages?: number;
  totalElements?: number;
}

const PAGE_SIZE = 9;

export default function MyReviewsPage() {
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // Fetch enrolled courses
  const fetchMyCourses = async () => {
    try {
      setLoadingCourses(true);
      const response = await axios.get(`${BASE_URL_COURSE_SERVICE}/search`, {
        params: {
          page: 0,
          size: 100
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });

      if (response.data.code === 200) {
        setMyCourses(response.data.data);
        console.log('Available courses:', response.data.data);
      } else {
        console.error("Failed to fetch courses:", response.data.message);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoadingCourses(false);
    }
  };

  // Fetch reviews for selected course
  const fetchReviews = async () => {
    if (!selectedCourseId) {
      setError("Please select a course to view reviews");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching reviews for course:', selectedCourseId);

      const response = await axios.get<APIResponse>(`${BASE_URL_REVIEW_SERVICE}/get-reviews-by-courseId`, {
        params: {
          courseId: selectedCourseId,
          page: currentPage - 1,
          size: PAGE_SIZE,
          sort: sortBy === "newest" ? "createdAt,desc" : sortBy === "oldest" ? "createdAt,asc" : sortBy,
          search: search || undefined
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });

      console.log('Reviews response:', response.data);

      if (response.data.code === 200) {
        const mappedReviews = response.data.data.map(review => ({
          id: review.id,
          courseId: review.courseId,
          courseTitle: review.courseTitle || "Unknown Course",
          author: review.author || "Anonymous",
          rating: review.rating || 0,
          ratingCount: review.ratingCount || 0,
          reviewText: review.reviewText || "",
          imageUrl: review.imageUrl || "/default-course-image.jpg",
          createdAt: review.createdAt
        }));

        console.log('Mapped reviews:', mappedReviews);

        setReviews(mappedReviews);
        setTotalPages(response.data.totalPages || Math.ceil(mappedReviews.length / PAGE_SIZE));
        setError(null);
      } else {
        setError(response.data.message || "Failed to fetch reviews");
      }
    } catch (err: any) {
      console.error("Error fetching reviews:", err);
      setError(err.response?.data?.message || "Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedCourseId) {
        fetchReviews();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage, sortBy, search, selectedCourseId]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loadingCourses) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Search and Sort Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b">
        <h2 className="text-xl font-semibold">Course Reviews</h2>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search Reviews"
              className="w-full sm:w-auto pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 whitespace-nowrap">Sort By</span>
            <select
              title="option"
              className="border rounded px-3 py-2 text-sm"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="newest">Newest Reviews</option>
              <option value="oldest">Oldest Reviews</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="mb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div
              key={course.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${selectedCourseId === course.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
                }`}
              onClick={() => setSelectedCourseId(course.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={course.urlAvt || "/default-teacher.jpg"}
                    alt={course.teacherName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{course.courseName}</h3>
                  <p className="text-gray-600">Instructor: {course.teacherName}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {course.totalReview.toFixed(1)} ({course.countReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      {selectedCourseId && (
        <div className="mt-8 border-t pt-8">
          <h2 className="text-xl font-semibold mb-6">
            Reviews <span className="text-gray-500">({reviews.length})</span>
          </h2>

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : reviews.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    courseTitle={review.courseTitle}
                    author={review.author}
                    rating={review.rating}
                    ratingCount={review.ratingCount}
                    reviewText={review.reviewText}
                    imageUrl={review.imageUrl}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="inline-flex items-center border rounded-md overflow-hidden text-sm">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 ${page === currentPage
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100"
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No reviews found for this course.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
