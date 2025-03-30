import React from 'react';

interface SimpleReviewCardProps {
  userName: string;
  urlImage: string;
  content: string;
  review: number;
}

export default function SimpleReviewCard({ userName, urlImage, content, review }: SimpleReviewCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <img src={urlImage} alt={userName} className="w-12 h-12 rounded-full" />
      <div>
        <h3 className="font-bold">{userName}</h3>
        <p className="text-sm text-gray-600">{content}</p>
        <p className="text-yellow-500 mt-2">Rating: {review}/5</p>
      </div>
    </div>
  );
}