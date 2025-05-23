'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
// import TopTeacherCard from '@/components/teacher/TopTeacherCard'
import TopCourseCard from '@/components/course/TopCourseCard'
import TopCategoryCard from '@/components/category/TopCategoryCard'
// import TopReviewCard from '@/components/review/TopReviewCard'
import { BASE_URL_COURSE_SERVICE } from '@/utils/BaseURL'
import { useRouter } from 'next/navigation'
import { checkLogin } from '@/utils/API'

export default function HomePage() {
  // const stats = [
  //   { value: '250+', description: 'Courses by our best mentors' },
  //   { value: '1000+', description: 'Students enrolled' },
  //   { value: '15+', description: 'Categories to explore' },
  //   { value: '2400+', description: 'Hours of content' }
  // ]

  const [categories, setCategories] = useState<string[]>([]) // State for categories
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state
  const [currentPage, setCurrentPage] = useState(0) // Current page for pagination
  const categoriesPerPage = 8 // 4 columns x 2 rows = 8 categories per page

  const [courses, setCourses] = useState([]) // State for courses
  const [loadingCourses, setLoadingCourses] = useState(true) // Loading state for courses
  const [errorCourses, setErrorCourses] = useState(null) // Error state for courses
  const router = useRouter()
  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL_COURSE_SERVICE}/get-all-categories`, {
          method: 'GET',
          credentials: 'include' // Include cookies for authentication
        })
        const data = await response.json()
        if (response.ok && data.code === 200) {
          setCategories(data.data || []) // Set categories from API response
          console.log('Fetched categories:', data.data) // <-- Log categories here
        } else {
          throw new Error(data.message || 'Failed to fetch categories')
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        setError('Failed to load categories. Please try again later.')
      } finally {
        setLoading(false) // Stop loading
      }
    }

    fetchCategories()
  }, [])
  useEffect(() => {
    checkLogin()
      .then((data) => {})
      .catch((e) => {
        window.location.href = '/login'
      })
  }, [])
  // Fetch top courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${BASE_URL_COURSE_SERVICE}/search`, {
          method: 'GET',
          credentials: 'include' // Include cookies for authentication
        })
        const data = await response.json()
        if (response.ok && data.code === 200) {
          setCourses(data.data) // Set courses from API response
          console.log('Fetched courses:', data.data) // <-- Log courses here
        } else {
          throw new Error(data.message || 'Failed to fetch courses')
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
        setErrorCourses('Failed to load courses. Please try again later.')
      } finally {
        setLoadingCourses(false) // Stop loading
      }
    }

    fetchCourses()
  }, [])

  // const teachers = [
  //   {
  //     name: 'Ronald Richards',
  //     expertise: 'UI/UX Designer',
  //     overallReview: 4.9,
  //     avaUrl: 'https://picsum.photos/96/96'
  //   },
  //   {
  //     name: 'Jane Cooper',
  //     expertise: 'Web Developer',
  //     overallReview: 4.8,
  //     avaUrl: 'https://picsum.photos/97/97'
  //   },
  //   {
  //     name: 'John Doe',
  //     expertise: 'Marketing Expert',
  //     overallReview: 4.7,
  //     avaUrl: 'https://picsum.photos/98/98'
  //   },
  //   {
  //     name: 'Albert Einstein',
  //     expertise: 'Physics Professor',
  //     overallReview: 5.0,
  //     avaUrl: 'https://picsum.photos/99/99'
  //   },
  //   {
  //     name: 'Sarah Connor',
  //     expertise: 'Product Designer',
  //     overallReview: 4.6,
  //     avaUrl: 'https://picsum.photos/100/100'
  //   }
  // ]

  // const reviews = [
  //   {
  //     userName: 'Jane Doe',
  //     content:
  //       "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
  //     avaUrl: 'https://picsum.photos/80/80'
  //   },
  //   {
  //     userName: 'John Smith',
  //     content: 'The courses are well-structured and easy to follow. I was able to learn new skills and apply them to my job immediately.',
  //     avaUrl: 'https://picsum.photos/81/81'
  //   },
  //   {
  //     userName: 'Alice Johnson',
  //     content: 'I love the variety of courses available. The instructors are knowledgeable and the content is very practical.',
  //     avaUrl: 'https://picsum.photos/82/82'
  //   },
  //   {
  //     userName: 'Michael Brown',
  //     content: 'The platform is user-friendly and the courses are very informative. Highly recommended!',
  //     avaUrl: 'https://picsum.photos/83/83'
  //   },
  //   {
  //     userName: 'Emily Davis',
  //     content: 'I was able to learn at my own pace and the support from the instructors was amazing.',
  //     avaUrl: 'https://picsum.photos/84/84'
  //   },
  //   {
  //     userName: 'Chris Wilson',
  //     content: 'The courses helped me improve my skills and land better projects. Thank you, Byway!',
  //     avaUrl: 'https://picsum.photos/85/85'
  //   }
  // ]
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % reviews.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + reviews.length) % reviews.length)
  }

  // Pagination logic
  const totalPages = Math.ceil(categories.length / 8)
  const paginatedCategories = categories.slice(currentPage * 8, (currentPage + 1) * 8)

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gray-50 flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Unlock Your Potential with LMS</h1>
          <p className="text-lg text-gray-600 mb-6 p-4">
            Welcome to LMS, where learning knows no bounds. We believe that education is the key to personal and professional growth, and we're here to guide
            you on your journey to success.
          </p>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            onClick={() => {
              router.push('/register/teacher')
            }}>
            Start your teacher journey
          </button>
        </div>
        <div className="md:w-1/2 relative max-w-md mx-auto">
          <div className="absolute top-0 left-0 w-16 h-16 bg-blue-100 rounded-full -translate-x-4 -translate-y-4"></div>
          <img src="/images/logo.jpg" alt="Community of learners" className="w-full h-auto rounded-lg object-cover z-0 relative" />
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-yellow-100 rounded-full translate-x-4 translate-y-4"></div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <h2 className="text-3xl font-bold text-gray-800">{stat.value}</h2>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Top Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">All Categories</h2>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`px-4 py-2 bg-gray-200 rounded ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}>
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className={`px-4 py-2 bg-gray-200 rounded ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}>
                Next
              </button>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {paginatedCategories.map((category, index) => (
                <Link key={index} href={'/student/category?category=' + category}>
                  <TopCategoryCard name={category} courses={0} icon={<span>📚</span>} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Courses Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Top Courses</h2>
            <a href="/student/courses" className="text-blue-600 hover:underline">
              See All
            </a>
          </div>
          {loadingCourses ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : errorCourses ? (
            <p className="text-center text-red-500">{errorCourses}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {courses.map((course: any, index) => {
                let avgReview = 0
                if (typeof course.totalReview === 'number' && typeof course.countReviews === 'number' && course.countReviews > 0) {
                  avgReview = course.totalReview / course.countReviews
                }
                // Always pass a number!
                return (
                  <Link key={index} href={`/student/courses/` + course.id}>
                    <TopCourseCard
                      courseName={course.courseName}
                      teacherName={course.teacherName}
                      price={`$${course.price}`}
                      overallReview={isNaN(avgReview) || !isFinite(avgReview) ? 0 : avgReview}
                      countReviews={course.countReviews}
                      avaUrl={course.urlAvt || 'https://picsum.photos/400/300'}
                    />
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Top Teachers Section */}
      {/* <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Top Teachers</h2>
            <a href="/teachers" className="text-blue-600 hover:underline">
              See All
            </a>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {teachers.slice(0, 5).map(
              (
                teacher,
                index // Limit to 5 teachers
              ) => (
                <Link key={index} href={`/teachers/${index + 1}`}>
                  <TopTeacherCard {...teacher} />
                </Link>
              )
            )}
          </div>
        </div>
      </section> */}

      {/* Review Section */}
      {/* <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              What Our Customers Say About Us
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700">
                &lt;
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700">
                &gt;
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {reviews
              .slice(currentIndex, currentIndex + 3)
              .map((review, index) => (
                <TopReviewCard
                  key={index}
                  userName={review.userName}
                  content={review.content}
                  avaUrl={review.avaUrl}
                />
              ))}
          </div>
        </div>
      </section> */}

      {/* Become an Instructor Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img src="/images/instructor.jpg" alt="Instructor" className="w-64 h-64 rounded-lg object-cover mb-6 md:mb-0 md:mr-6" />
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800">Become a Teacher</h3>
            <p className="text-gray-600 mt-4">
              Instructors from around the world teach millions of students on Byway. We provide the tools and skills to teach what you love.
            </p>
            <button
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              onClick={() => {
                router.push('/register/teacher')
              }}>
              Start Your Teacher Journey
            </button>
          </div>
        </div>
      </section>

      {/* Transform Your Life Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800">Transform your life through education</h3>
            <p className="text-gray-600 mt-4">Learners around the world are launching new careers, advancing in their fields, and enriching their lives.</p>
            <button
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              onClick={() => {
                router.push('/student/courses')
              }}>
              Checkout Our Courses
            </button>
          </div>
          <img src="/images/course-checkout.jpg" alt="Education" className="w-64 h-64 rounded-lg object-cover mb-6 md:mb-0 md:mr-6" />
        </div>
      </section>
    </main>
  )
}
