"use client";
import React from 'react';
import StatCard from '../../../../components/course/StatCard';
import ReviewCard from '../../../../components/course/ReviewCard';

interface Stat {
  title: string;
  value: string;
  color?: string;
}

interface Review {
  id: number;
  rating: number;
  courseName: string;
  reviewerName: string;
  reviewerAvatar: string;
  timestamp: string;
  text: string;
}

const stats: Stat[] = [
  { title: 'Total Reviews', value: '1000' },
  { title: '1 Star Reviews', value: '100', color: 'red' },
  { title: '2 Star Reviews', value: '100', color: 'orange' },
  { title: '3 Star Reviews', value: '100', color: 'yellow' },
  { title: '4 Star Reviews', value: '100', color: 'green' },
  { title: '5 Star Reviews', value: '100', color: 'darkgreen' },
];

const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    courseName: 'Beginners Guide to Design',
    reviewerName: 'Chris Walter',
    reviewerAvatar: '/avatar1.jpg',
    timestamp: '3 days ago',
    text: 'I was initially apprehensive, having no prior design experience...',
  },
  {
    id: 2,
    rating: 4,
    courseName: 'Data Warehouse - The Ultimate Guide',
    reviewerName: 'Michel Evans',
    reviewerAvatar: '/avatar2.jpg',
    timestamp: '5 days ago',
    text: 'Great course, very informative...',
  },
  {
    id: 3,
    rating: 5,
    courseName: 'Beginners Guide to Design',
    reviewerName: 'Chris Walter',
    reviewerAvatar: '/avatar1.jpg',
    timestamp: '3 days ago',
    text: 'I was initially apprehensive, having no prior design experience...',
  },
  {
    id: 4,
    rating: 4,
    courseName: 'Data Warehouse - The Ultimate Guide',
    reviewerName: 'Michel Evans',
    reviewerAvatar: '/avatar2.jpg',
    timestamp: '5 days ago',
    text: 'Great course, very informative...',
  },
  {
    id: 5,
    rating: 5,
    courseName: 'Beginners Guide to Design',
    reviewerName: 'Chris Walter',
    reviewerAvatar: '/avatar1.jpg',
    timestamp: '3 days ago',
    text: 'I was initially apprehensive, having no prior design experience...',
  },
  {
    id: 6,
    rating: 4,
    courseName: 'Data Warehouse - The Ultimate Guide',
    reviewerName: 'Michel Evans',
    reviewerAvatar: '/avatar2.jpg',
    timestamp: '5 days ago',
    text: 'Great course, very informative...',
  },
];

export default function ReviewsView() {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>
      <div className="space-y-4 flex-1">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
}