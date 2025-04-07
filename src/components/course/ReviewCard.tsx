// components/course/ReviewCard.tsx
import React, { useState } from 'react';


interface Review {
  id: string;
  userId: string;
  userName: string;
  urlAvt: string;
  courseId: string;
  urlImage: string;
  content: string;
  review: number;
  createdAt: string; // hoặc Date nếu bạn muốn chuyển sang Date
}


interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between">
        <div className="flex items-center text-xs">
        Rating: <div className="text-yellow-500 ml-1">{'★'.repeat(review.review)}</div>
        </div>
        <div className="text-gray-500 cursor-pointer">⋮</div>
      </div>
      <div className="mt-2 flex items-center">
        <img
          src={review.urlAvt}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="ml-2">
          <div className="text-sm font-medium text-gray-900">{review.userName}</div>
          <div className="text-xs text-gray-500">{review.createdAt}</div>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-700">{review.content}</div>
    </div>
  );
}