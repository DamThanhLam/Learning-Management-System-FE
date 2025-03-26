// app/profile/my-reviews/page.tsx
"use client";

import { useState } from "react";
import ReviewCard from "@/components/student/profile/ReviewCard";

const mockReviews = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  courseTitle: "Beginner’s Guide to Design",
  author: "Ronald Richards",
  rating: 5,
  ratingCount: 1200,
  imageUrl: "/course-thumb.jpg",
  reviewText: "This course was incredibly helpful for beginners like me. Highly recommend it!",
}));

export default function MyReviewsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">
          My Reviews <span className="text-gray-500">(12)</span>
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Reviews"
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
            <select 
            title="option"
                className="border rounded px-2 py-1 text-sm">
              <option>Relevance</option>
              <option>Newest</option>
              <option>Rating</option>
            </select>
            <button className="border px-3 py-1 rounded text-sm">⚙️ Filter</button>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
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
