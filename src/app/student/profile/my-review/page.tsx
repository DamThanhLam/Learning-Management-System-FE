"use client";

import ReviewCard from "@/components/student/profile/ReviewCard";
import { Review } from "@/store/models/Reviews";
import { fetchReviews, setCurrentPage, setPageSize } from "@/store/slices/reviewSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MyReviewsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error,
    reviews,
    currentPage,
    pageSize,
    totalReviews,
  } = useSelector((state: RootState) => state.review);
  const userId = "1";

  const totalPages = Math.ceil(totalReviews / pageSize) || 1;

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) {
      dispatch(setCurrentPage(1));
    }
  }, [currentPage, totalPages, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchReviews({ userId, page: currentPage, pageSize }));
    }
  }, [dispatch, userId, currentPage, pageSize]);

  useEffect(() => {
    console.log("Reviews:", reviews);
  }, [reviews]);

  useEffect(() => {
    console.log("State:", { error, loading, currentPage, pageSize, totalReviews });
  }, [error, loading, currentPage, pageSize, totalReviews]);

  const handleRetry = () => {
    dispatch(fetchReviews({ userId, page: currentPage, pageSize }));
  };

  const maxPageButtons = 5;
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageSizeChange = (newPageSize: number) => {
    dispatch(setPageSize(newPageSize));
    dispatch(setCurrentPage(1));
  };

  const startReview = (currentPage - 1) * pageSize + 1;
  const endReview = Math.min(currentPage * pageSize, totalReviews);

  return (
    <div className="space-y-8 p-4 w-full">
      <p className="text-sm text-gray-500">Debug: MyReviewsPage is rendering</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">
          My Reviews <span className="text-gray-500">({totalReviews})</span>
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-gray-600">
            Reviews per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <p className="ml-2">Loading reviews...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* No Reviews */}
      {!loading && !error && reviews.length === 0 && (
        <p className="text-center text-gray-500">No reviews found.</p>
      )}

      {/* Reviews List */}
      {!loading && !error && reviews.length > 0 && (
        <div className="flex flex-col gap-6 w-full">
          {reviews.map((review: Review) => (
            <ReviewCard
              key={review.id || Math.random().toString()} // Fallback key
              courseTitle={review.course?.title || "Unknown Course"}
              rating={review.course?.rating || 0}
              author={review.course?.author || "Unknown Author"}
              ratingCount={review.course?.ratingCount || 0}
              reviewText={review.content ||  ""}
              imageUrl={review.course?.imageUrl || "/placeholder-image.jpg"}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalReviews > 0 && (
        <div className="flex flex-col items-center gap-4 pt-6">
          <div className="inline-flex items-center border rounded-md overflow-hidden text-sm">
            <button
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => dispatch(setCurrentPage(1))}
              title="First page"
            >
              «
            </button>

            <button
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              title="Previous page"
            >
              {"<"}
            </button>

            {getPageNumbers().map((page, index) => (
              <button
                key={`${page}-${index}`}
                className={`px-3 py-1 ${
                  page === currentPage
                    ? "bg-gray-100 font-semibold"
                    : page === "..." ? "cursor-default" : "hover:bg-gray-100"
                }`}
                onClick={() => typeof page === "number" && dispatch(setCurrentPage(page))}
                disabled={page === "..."}
              >
                {page}/{totalPages}
              </button>
            ))}

            <button
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              title="Next page"
            >
              {">"}
            </button>

            <button
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => dispatch(setCurrentPage(totalPages))}
              title="Last page"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}