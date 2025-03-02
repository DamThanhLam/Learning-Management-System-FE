import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const reviews = [
  {
    rating: 4,
    course: "Beginners Guide to Design",
    reviewer: "Chris Walter",
    date: "3 days ago",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down...",
  },
  {
    rating: 4,
    course: "Data Warehouse - The Ultimate Guide",
    reviewer: "Michel Evans",
    date: "3 days ago",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down...",
  },
  {
    rating: 5,
    course: "Beginners Guide to Design",
    reviewer: "Chris Walter",
    date: "3 days ago",
    review:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down...",
  },
];

export default function CourseReviews() {
  return (
    <div className="flex max-h-screen overflow-y-auto scrollbar-hide">
      {/* Content */}
      <main className="flex-1 p-6">
        <button className="text-blue-600 mb-4">&lt; Back</button>
        <h1 className="text-2xl font-semibold">Spring Boot</h1>

        {/* Tabs */}
        <div className="flex border-b mt-4">
          {["Reviews", "Customer", "Chapters", "Detail"].map((tab, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 ${
                tab === "Reviews"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Review Summary */}
        <div className="grid grid-cols-6 gap-4 mt-4">
          {[
            { label: "Total Reviews", value: 1000 },
            { label: "1 star reviews", value: 100, color: "bg-red-100 text-red-600" },
            { label: "2 star reviews", value: 100, color: "bg-yellow-100 text-yellow-600" },
            { label: "3 star reviews", value: 100, color: "bg-yellow-200 text-yellow-800" },
            { label: "4 star reviews", value: 100, color: "bg-green-100 text-green-600" },
            { label: "5 star reviews", value: 100, color: "bg-green-200 text-green-800" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 shadow rounded-lg flex flex-col items-center"
            >
              <p className="text-gray-500 text-sm">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
              {item.color && (
                <span className={`px-2 py-1 text-sm font-semibold ${item.color}`}>
                  {idx + 1}.0
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Reviews */}
        
        <div className="mt-6 space-y-4 ">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-4 shadow rounded-lg flex justify-between">
              <div>
                <div className="flex items-center">
                  <p className="font-semibold">Rating:</p>
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < review.rating ? (
                      <FaStar key={i} className="text-yellow-500 ml-1" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-300 ml-1" />
                    )
                  )}
                </div>
                <p className="text-lg font-semibold mt-2">{review.course}</p>
                <p className="text-gray-500 text-sm">{review.reviewer} · {review.date}</p>
                <p className="text-gray-600 mt-2">{review.review}</p>
              </div>
              <HiOutlineDotsHorizontal className="text-gray-400 text-xl cursor-pointer" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
