"use client";
import React, { useEffect, useState } from 'react';
import StatCard from '../../../../components/course/StatCard';
import ReviewCard from '../../../../components/course/ReviewCard';
import { useParams } from 'next/navigation';
import { BASE_URL_REVIEW_SERVICE } from '@/utils/BaseURL';

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
interface ReviewItem {
  title: string;
  value: number;
  color?: string;  // Optional vì một số đối tượng không có màu
}

type ReviewStats = {
  [key in number]: ReviewItem;  // Index signature to ensure valid keys
};

export default function ReviewsView() {
  const params = useParams();
  const courseId = params["course-id"] as string;
  const [reviews, setReviews] = useState<Review[]>([])
  const [review, setReview] = useState(0)
  const [stats, setStats] = useState<ReviewStats>(
    {
      0: { title: 'Total Reviews', value: 0 },
      1: { title: '1 Star Reviews', value: 0, color: 'red' },
      2: { title: '2 Star Reviews', value: 0, color: 'orange' },
      3: { title: '3 Star Reviews', value: 0, color: 'yellow' },
      4: { title: '4 Star Reviews', value: 0, color: 'green' },
      5: { title: '5 Star Reviews', value: 0, color: 'darkgreen' },
    }
  )
  useEffect(() => {
    const url = BASE_URL_REVIEW_SERVICE + "/get-reviews-by-courseId?courseId=" + courseId + (review !== 0 ? "&review=" + review : "");

    fetch(url, {
      method: "GET",
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setReviews(data.data)
      })
      .catch(e => alert(e))
  }, [review])
  useEffect(() => {
    if (review === 0) {
      const newStats:ReviewStats = {
        0: { title: 'Total Reviews', value: reviews.length },
        1: { title: '1 Star Reviews', value: 0, color: 'red' },
        2: { title: '2 Star Reviews', value: 0, color: 'orange' },
        3: { title: '3 Star Reviews', value: 0, color: 'yellow' },
        4: { title: '4 Star Reviews', value: 0, color: 'green' },
        5: { title: '5 Star Reviews', value: 0, color: 'darkgreen' },
      };

      reviews.forEach(item => {
        if (newStats[item.review]) {
          newStats[item.review].value++;
        }
      });

      setStats(newStats);
    }

  }, [reviews])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
        <div className='cursor-pointer'
          onClick={() => {
            setReview(0)
          }}
        >
          <StatCard
            key={0}
            title={stats[0].title}
            value={stats[0].value}
          />
        </div>
        <div className='cursor-pointer'
          onClick={() => {
            setReview(1)
          }}
        >
          <StatCard
            key={1}
            title={stats[1].title}
            value={stats[1].value}
            color={stats[1].color}
          />
        </div>
        <div className='cursor-pointer'
          onClick={() => {
            setReview(2)
          }}
        >
          <StatCard
            key={2}
            title={stats[2].title}
            value={stats[2].value}
            color={stats[2].color}
          />
        </div>
        <div className='cursor-pointer'
          onClick={() => {
            setReview(3)
          }}
        >
          <StatCard
            key={3}
            title={stats[3].title}
            value={stats[3].value}
            color={stats[3].color}
          />
        </div>
        <div className='cursor-pointer'
          onClick={() => {
            setReview(4)
          }}
        >
          <StatCard
            key={4}
            title={stats[4].title}
            value={stats[4].value}
            color={stats[4].color}
          />
        </div>

        <div className='cursor-pointer'
          onClick={() => {
            setReview(5)
          }}
        >
          <StatCard
            key={5}
            title={stats[5].title}
            value={stats[5].value}
            color={stats[5].color}
          />
        </div>


      </div>
      <div className="space-y-4 flex-1">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p>No reviews available.</p> // Hoặc bất kỳ nội dung gì khi không có reviews
        )}
      </div>
    </>
  );
}