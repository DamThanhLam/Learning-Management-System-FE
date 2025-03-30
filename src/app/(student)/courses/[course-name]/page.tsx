"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TeacherCard from '@/components/teacher/TeacherCard';
import StudentCourseCard from '@/components/course/StudentCourseCard';
import SimpleReviewCard from '@/components/review/SimpleReviewCard';

interface Lecture {
  id: string;
  courseId: string;
  lectureName: string;
  type: string;
  contentUrl: string;
  content: string;
  orderIndex: number;
}

interface CoursePageProps {
  params: {
    'course-name': string;
  };
}

const course = {
  courseName: 'Introduction to User Experience Design',
  teacher: {
    name: 'John Doe',
    expertise: 'UX Design Expert',
    rating: 4.8,
    students: 1200,
    urlAva: 'https://picsum.photos/150',
  },
  relatedCourses: [
    {
      courseName: 'Advanced UX Design',
      category: 'UX Design',
      price: 49.99,
      startTime: '2025-04-01',
      lectures: 20,
      rating: 4,
      urlAvt: 'https://picsum.photos/200',
    },
    {
      courseName: 'UI Design Fundamentals',
      category: 'UI Design',
      price: 29.99,
      startTime: '2025-05-01',
      lectures: 15,
      rating: 5,
      urlAvt: 'https://picsum.photos/200',
    },
  ],
  reviews: [
    {
      userId: '1',
      courseId: 'course-1',
      userName: 'Jane Smith',
      urlImage: 'https://picsum.photos/50',
      content: 'This course was amazing! I learned so much.',
      review: 5,
    },
    {
      userId: '2',
      courseId: 'course-1',
      userName: 'Bob Johnson',
      urlImage: 'https://picsum.photos/50',
      content: 'Great course, but could use more examples.',
      review: 4,
    },
  ],
  lectures: [
    {
      id: '1',
      courseId: 'course-1',
      lectureName: 'What is User Experience (UX) Design?',
      type: 'VIDEO',
      contentUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      content: '',
      orderIndex: 1,
    },
    {
      id: '2',
      courseId: 'course-1',
      lectureName: 'Historical Overview of UX Design',
      type: 'VIDEO',
      contentUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      content: '',
      orderIndex: 2,
    },
    {
      id: '3',
      courseId: 'course-1',
      lectureName: 'Understanding User-Centered Design',
      type: 'TEXT',
      contentUrl: '',
      content: 'This is a detailed explanation of user-centered design principles. ' +
        'User-centered design focuses on the needs, wants, and limitations of end users ' +
        'at each stage of the design process. It ensures that the final product is both ' +
        'usable and accessible. The principles of user-centered design include understanding ' +
        'the user, involving the user throughout the design process, and iterating based on ' +
        'user feedback. This lecture will cover various aspects of user-centered design, ' +
        'including research methods, prototyping, and usability testing. By the end of this ' +
        'lecture, you will have a comprehensive understanding of how to apply user-centered ' +
        'design principles to create effective and engaging digital products.',
      orderIndex: 3,
    },
    {
      id: '4',
      courseId: 'course-1',
      lectureName: 'The Role of UX Design in Digital Products',
      type: 'VIDEO',
      contentUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      content: '',
      orderIndex: 4,
    },
    {
      id: '5',
      courseId: 'course-1',
      lectureName: 'Introduction to UX Design Tools and Techniques',
      type: 'TEXT',
      contentUrl: '',
      content: 'This lecture introduces various tools and techniques used in UX design.',
      orderIndex: 5,
    },
    {
      id: '6',
      courseId: 'course-1',
      lectureName: 'Wireframing and Prototyping Basics',
      type: 'VIDEO',
      contentUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      content: '',
      orderIndex: 6,
    },
    {
      id: '7',
      courseId: 'course-1',
      lectureName: 'Conducting Usability Testing',
      type: 'TEXT',
      contentUrl: '',
      content: 'Usability testing is a critical step in the UX design process. It involves ' +
        'evaluating a product by testing it with real users. This lecture will cover the ' +
        'steps involved in planning, conducting, and analyzing usability tests.',
      orderIndex: 7,
    },
    {
      id: '8',
      courseId: 'course-1',
      lectureName: 'Accessibility in UX Design',
      type: 'VIDEO',
      contentUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      content: '',
      orderIndex: 8,
    },
    {
      id: '9',
      courseId: 'course-1',
      lectureName: 'Designing for Mobile Devices',
      type: 'TEXT',
      contentUrl: '',
      content: 'This lecture focuses on the unique challenges and best practices for designing ' +
        'user experiences for mobile devices.',
      orderIndex: 9,
    },
    {
      id: '10',
      courseId: 'course-1',
      lectureName: 'Future Trends in UX Design',
      type: 'VIDEO',
      contentUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      content: '',
      orderIndex: 10,
    },
  ],
};

export default function CoursePage({ params }: CoursePageProps) {
  const [selectedLecture, setSelectedLecture] = useState<Lecture>(course.lectures[0]);
  const [activeTab, setActiveTab] = useState<'description' | 'teacher' | 'related courses' | 'reviews'>('description');
  const [courseName, setCourseName] = useState<string>('');

  // Fetch params on the client side
  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setCourseName(resolvedParams['course-name']);
    }
    fetchParams();
  }, [params]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div>
            <h2 className="text-xl font-bold mb-3">Course Description</h2>
            <p>{course.courseName}</p>
          </div>
        );
      case 'teacher':
        return (
          <div className='w-1/4'>
            <h2 className="text-xl font-bold mb-3">Teacher</h2>
            <TeacherCard
              name={course.teacher.name}
              expertise={course.teacher.expertise}
              rating={course.teacher.rating}
              students={course.teacher.students}
              urlAva={course.teacher.urlAva}
            />
          </div>
        );
      case 'related courses':
        return (
          <div>
            <h2 className="text-xl font-bold mb-3">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-2/3">
              {course.relatedCourses.slice(0, 3).map((relatedCourse, index) => (
                <StudentCourseCard
                  key={index}
                  courseName={relatedCourse.courseName}
                  category={relatedCourse.category}
                  price={relatedCourse.price}
                  startTime={relatedCourse.startTime}
                  lectures={relatedCourse.lectures}
                  rating={relatedCourse.rating}
                  urlAvt={relatedCourse.urlAvt}
                />
              ))}
            </div>

            {/* See All Button */}
            <div className="mt-4 text-center">
              <Link
                href="/related-courses"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
              >
                See All
              </Link>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div>
            <h2 className="text-xl font-bold mb-3">Reviews</h2>
            <div className="space-y-4 w-1/2">
              {course.reviews.map((review) => (
                <SimpleReviewCard
                  key={review.userId}
                  userName={review.userName}
                  urlImage={review.urlImage}
                  content={review.content}
                  review={review.review}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-5 w-full">
      <div className="w-full bg-white rounded-lg shadow-lg p-5">
        <h1 className="text-left text-3xl font-bold mb-5 text-blue-700">Course: {courseName}</h1>
        <div className="flex gap-8">
          {/* Lecture Content Section */}
          <div className="flex-[3] w-full">
            {selectedLecture.type === 'VIDEO' ? (
              <video controls className="w-full rounded-lg shadow-md">
                <source src={selectedLecture.contentUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="p-5 border border-gray-300 rounded-lg shadow-md h-[300px] overflow-y-auto">
                <p>{selectedLecture.content}</p>
              </div>
            )}
          </div>
          

          {/* Course Outline Section */}
          <div className="flex-[2] h-[400px] overflow-y-auto border border-gray-300 rounded-lg shadow-md p-4">
            <h3 className="text-center text-lg font-semibold mb-3 text-blue-700">Course Lectures</h3>
            <ul className="list-none p-0">
              {course.lectures
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((lecture) => (
                  <li
                    key={lecture.id}
                    className={`cursor-pointer p-3 rounded-lg mb-2 text-left ${
                      lecture.id === selectedLecture.id ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedLecture(lecture)}
                  >
                    {lecture.orderIndex}/ {lecture.lectureName} - {lecture.type === 'VIDEO' ? 'Video' : 'Text'}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <p className="mt-3 font-bold text-left text-2xl text-blue-700">Current lecture : {selectedLecture.lectureName}</p>
      </div>

      {/* Tab Section */}
      <div className="w-full bg-white rounded-lg shadow-lg p-5 mt-5">
        <div className="flex gap-4 border-b border-gray-300 pb-2">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'description' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'teacher' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('teacher')}
          >
            Teacher
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'related courses' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('related courses')}
          >
            Related Courses
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'reviews' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
        <div className="mt-5">{renderTabContent()}</div>
      </div>
    </div>
  );
}