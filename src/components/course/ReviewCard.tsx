// components/course/ReviewCard.tsx
import React from 'react';

interface Review {
  id: number;
  rating: number;
  courseName: string;
  reviewerName: string;
  reviewerAvatar: string;
  timestamp: string;
  text: string;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="text-yellow-500">{'★'.repeat(review.rating)}</div>
          <div className="ml-2 font-semibold text-gray-900">{review.courseName}</div>
        </div>
        <div className="text-gray-500 cursor-pointer">⋮</div>
      </div>
      <div className="mt-2 flex items-center">
        <img
          src={review.reviewerAvatar}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="ml-2">
          <div className="text-sm font-medium text-gray-900">{review.reviewerName}</div>
          <div className="text-xs text-gray-500">{review.timestamp}</div>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-700">{review.text}</div>
    </div>
  );
}