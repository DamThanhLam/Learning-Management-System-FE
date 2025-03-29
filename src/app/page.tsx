"use client";
import { useState } from "react";
import Link from "next/link";
import TopTeacherCard from "@/components/teacher/TopTeacherCard";
import TopCourseCard from "@/components/course/TopCourseCard";
import TopCategoryCard from "@/components/category/TopCategoryCard";
import TopReviewCard from "@/components/review/TopReviewCard";

export default function HomePage() {
  const stats = [
    { value: "250+", description: "Courses by our best mentors" },
    { value: "1000+", description: "Students enrolled" },
    { value: "15+", description: "Categories to explore" },
    { value: "2400+", description: "Hours of content" },
  ];

  const categories = [
    { name: "Astrology", courses: 11, icon: <span>🔮</span> },
    { name: "Development", courses: 12, icon: <span>💻</span> },
    { name: "Marketing", courses: 12, icon: <span>📈</span> },
    { name: "Physics", courses: 14, icon: <span>🔬</span> },
  ];

  const courses = [
    {
      courseName: "Beginner's Guide to Design",
      teacherName: "Ronald Richards",
      price: "$149.9",
      overallReview: 4.5,
      countReviews: 1200,
      avaUrl: "https://picsum.photos/400/300",
    },
    {
      courseName: "Advanced Web Development",
      teacherName: "Jane Cooper",
      price: "$199.9",
      overallReview: 4.8,
      countReviews: 1500,
      avaUrl: "https://picsum.photos/400/301",
    },
    {
      courseName: "Marketing Strategies 101",
      teacherName: "John Doe",
      price: "$99.9",
      overallReview: 4.2,
      countReviews: 800,
      avaUrl: "https://picsum.photos/400/302",
    },
    {
      courseName: "Mastering Physics",
      teacherName: "Albert Einstein",
      price: "$249.9",
      overallReview: 4.9,
      countReviews: 2000,
      avaUrl: "https://picsum.photos/400/303",
    },
  ];

  const teachers = [
    {
      name: "Ronald Richards",
      expertise: "UI/UX Designer",
      overallReview: 4.9,
      avaUrl: "https://picsum.photos/96/96",
    },
    {
      name: "Jane Cooper",
      expertise: "Web Developer",
      overallReview: 4.8,
      avaUrl: "https://picsum.photos/97/97",
    },
    {
      name: "John Doe",
      expertise: "Marketing Expert",
      overallReview: 4.7,
      avaUrl: "https://picsum.photos/98/98",
    },
    {
      name: "Albert Einstein",
      expertise: "Physics Professor",
      overallReview: 5.0,
      avaUrl: "https://picsum.photos/99/99",
    },
    {
      name: "Sarah Connor",
      expertise: "Product Designer",
      overallReview: 4.6,
      avaUrl: "https://picsum.photos/100/100",
    },
  ];

  const reviews = [
    {
      userName: "Jane Doe",
      content: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
      avaUrl: "https://picsum.photos/80/80",
    },
    {
      userName: "John Smith",
      content: "The courses are well-structured and easy to follow. I was able to learn new skills and apply them to my job immediately.",
      avaUrl: "https://picsum.photos/81/81",
    },
    {
      userName: "Alice Johnson",
      content: "I love the variety of courses available. The instructors are knowledgeable and the content is very practical.",
      avaUrl: "https://picsum.photos/82/82",
    },
    {
      userName: "Michael Brown",
      content: "The platform is user-friendly and the courses are very informative. Highly recommended!",
      avaUrl: "https://picsum.photos/83/83",
    },
    {
      userName: "Emily Davis",
      content: "I was able to learn at my own pace and the support from the instructors was amazing.",
      avaUrl: "https://picsum.photos/84/84",
    },
    {
      userName: "Chris Wilson",
      content: "The courses helped me improve my skills and land better projects. Thank you, Byway!",
      avaUrl: "https://picsum.photos/85/85",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + reviews.length) % reviews.length);
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gray-50 flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Unlock Your Potential with LMS</h1>
          <p className="text-lg text-gray-600 mb-6 p-4">
            Welcome to LMS, where learning knows no bounds. We believe that education is the key to personal and professional growth, and we're here to guide you on your journey to success.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">Start your teacher journey</button>
        </div>
        <div className="md:w-1/2 relative max-w-md mx-auto">
          <div className="absolute top-0 left-0 w-16 h-16 bg-blue-100 rounded-full -translate-x-4 -translate-y-4"></div>
          <img
            src="https://picsum.photos/400/400"
            alt="Community of learners"
            className="w-full h-auto rounded-lg object-cover"
          />
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-yellow-100 rounded-full translate-x-4 translate-y-4"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <h2 className="text-3xl font-bold text-gray-800">{stat.value}</h2>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Top Categories</h2>
            <a href="/categories" className="text-blue-600 hover:underline">See All</a>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/categories/${category.name.toLowerCase()}`}>
                <TopCategoryCard name={category.name} courses={category.courses} icon={category.icon} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Courses Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Top Courses</h2>
            <a href="/courses" className="text-blue-600 hover:underline">See All</a>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {courses.slice(0, 5).map((course, index) => ( // Limit to 5 courses
              <Link key={index} href={`/courses/${index + 1}`}>
                <TopCourseCard {...course} />
              </Link>
            ))}
          </div>
        </div>
      </section>  
  
      {/* Top Teachers Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Top Teachers</h2>
            <a href="/teachers" className="text-blue-600 hover:underline">See All</a>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {teachers.slice(0, 5).map((teacher, index) => ( // Limit to 5 teachers
              <Link key={index} href={`/teachers/${index + 1}`}>
                <TopTeacherCard {...teacher} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">What Our Customers Say About Us</h2>
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700"
              >
                &lt;
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700"
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {reviews.slice(currentIndex, currentIndex + 3).map((review, index) => (
              <TopReviewCard
                key={index}
                userName={review.userName}
                content={review.content}
                avaUrl={review.avaUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Become an Instructor Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src="https://picsum.photos/400/400"
            alt="Instructor"
            className="w-64 h-64 rounded-lg object-cover mb-6 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800">Become an Instructor</h3>
            <p className="text-gray-600 mt-4">
              Instructors from around the world teach millions of students on Byway. We provide the tools and skills to teach what you love.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Start Your Instructor Journey
            </button>
          </div>
        </div>
      </section>

      {/* Transform Your Life Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800">Transform your life through education</h3>
            <p className="text-gray-600 mt-4">
              Learners around the world are launching new careers, advancing in their fields, and enriching their lives.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Checkout Courses
            </button>
          </div>
          <img
            src="https://picsum.photos/400/400"
            alt="Education"
            className="w-64 h-64 rounded-lg object-cover mb-6 md:mb-0 md:mr-6"
          />
        </div>
      </section>
    </main>
  );
}