"use client";
import React, { useEffect, useState } from 'react';
import CustomerView from './CustomerView';
import ChaptersView from './ChaptersView';
import ReviewsView from './ReviewsView';
import CourseDetails from './CourseDetails';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import { BASE_URL_COURSE_SERVICE } from '@/utils/BaseURL';

interface Course {
  id: string;
  courseName: string;
  description: string;
  price: number;
  category: string;
  level: 'BEGINNER' | 'MIDDLE' | 'MASTER'; // Có thể mở rộng enum nếu cần
  status: 'OPEN' | 'DRAFT'; // Giả định thêm các trạng thái có thể có
  countLectures: number;
  countOrders: number;
  countReviews: number;
  totalReview: number;
  studentsId: string[];
  teacherId: string;
  teacherName: string;
  urlAvt: string;
}

export default function page() {
  const [activeTab, setActiveTab] = useState<string>('Reviews');
  const [routerPath, setRouterPath] = useState<string>('');
  const [course, setCourse] = useState<Course>()
  const params = useParams();
  const courseId = params["course-id"] as string;

  useEffect(() => {
    fetch(BASE_URL_COURSE_SERVICE + "?id=" + courseId, {
      credentials: 'include',
      method: "GET",
      headers:{
          Authorization: "Bearer " + window.localStorage.getItem("access_token"),

      }
    })
      .then(res => res.json())
      .then(data => {
        setCourse(data)
        console.log(data)
      })
      .catch(e => alert(e.message))
  }, [courseId])

  return (
    <div className=' w-4/5 p-6 h-screen overflow-y-auto no-scrollbar' >
      {/* Header */}
      <div className="flex items-center">
        <div className="text-blue-500 cursor-pointer hover:underline"
        onClick={()=>{
          window.location.href="/teacher/courses"
        }}
        >&lt; Back</div>
        <h1 className="ml-4 text-2xl font-bold text-gray-900">{course && course.courseName}</h1>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex space-x-6 border-b">
        {['Reviews', 'Customer', 'Chapters', 'Detail'].map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm font-medium ${activeTab === tab
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Nội dung theo tab */}
      <div className="mt-6 ">
        {activeTab === 'Customer' && <CustomerView />}
        {activeTab === 'Chapters' && <ChaptersView />}
        {activeTab === 'Reviews' && <ReviewsView />}
        {activeTab === 'Detail' && <CourseDetails />}
      </div>
    </div>

  );
}