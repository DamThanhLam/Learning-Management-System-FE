'use client'

import React, { useState, useEffect } from 'react'
import BuyCourseCard from '@/components/course/BuyCourseCard'
import { BASE_URL_COURSE_SERVICE, BASE_URL_REVIEW_SERVICE, BASE_URL_USER_SERVICE } from '@/utils/BaseURL'
import { toast } from 'react-toastify'

interface Course {
  courseName: string
  description: string
  totalReview: number
  countReviews: number
  countLectures: number
  level: string
  price: number
  urlAvt: string
  teacherId: string
}

interface Teacher {
  name: string
  expertise: string
  rating: number
  students: number
  urlAva: string
}

const dummyTeacher = {
  name: 'John Doe',
  expertise: 'Software Engineering',
  rating: 4.5,
  students: 1200,
  urlAva: 'https://via.placeholder.com/150' // Placeholder image
}

export default function CourseDetailsPage({ params }: { params: Promise<{ 'course-id': string }> }) {
  const [courseId, setCourseId] = useState<string | null>(null)
  const [course, setCourse] = useState<Course | null>(null)
  const [teacher, setTeacher] = useState<Teacher | null>(null) // State for teacher data
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'teacher' | 'reviews'>('teacher') // Tab state
  const [reviews, setReviews] = useState<any[]>([]) // Reviews fetched from the API
  const [isPurchased, setIsPurchased] = useState<boolean>(false) // Tracks if the course is purchased
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setCourseId(resolvedParams['course-id'])
    }

    resolveParams()
  }, [params])

  useEffect(() => {
    if (!courseId) return

    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL_COURSE_SERVICE}?id=${courseId}`, {
          method: 'GET',
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to fetch course details.')
        }

        const responseData = await response.json()
        console.log(responseData)
        setCourse(responseData.data) // Use the `data` field from the response

        // Fetch teacher details after course data is loaded
        if (responseData.data.teacherId) {
          fetchTeacherDetails(responseData.data.teacherId)
        }
      } catch (error) {
        console.error('Error fetching course details:', error)
        setError(error.message || 'An unexpected error occurred.')
      } finally {
        setLoading(false)
      }
    }

    fetchCourseDetails()
    fetchPurchaseStatus(courseId) // Check if the course has been purchased
  }, [courseId])

  const fetchPurchaseStatus = async (courseId: string) => {
    try {
      const response = await fetch(`${BASE_URL_COURSE_SERVICE}/check-course-purchase?courseId=${courseId}`, {
        method: 'GET',
        credentials: 'include' // Include cookies for authentication
      })

      if (!response.ok) {
        throw new Error('Failed to check course purchase status.')
      }

      const data = await response.json()
      console.log('Purchase Status API Response:', data) // Debug log
      setIsPurchased(data.purchased) // Update the state based on the API response
    } catch (error) {
      console.error('Error checking course purchase status:', error)
    }
  }

  const fetchTeacherDetails = async (teacherId: string) => {
    console.log(`LMAOOOO teacher ${BASE_URL_USER_SERVICE}?id=${teacherId}`)
    try {
      const response = await fetch(`${BASE_URL_USER_SERVICE}?id=${teacherId}`, {
        method: 'GET',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to fetch teacher details.')
      }

      const data = await response.json()
      console.log('Teacher API Response:', data) // Log the API response
      setTeacher(data.user) // Assuming the API returns the teacher data in `user`
    } catch (error) {
      console.error('Error fetching teacher details:', error)
      setTeacher(dummyTeacher) // Fallback to dummy teacher
    }
  }

  useEffect(() => {
    if (!courseId) return

    const fetchReviews = async () => {
      try {
        console.log('Fetching reviews for courseId:', courseId) // Debug log
        const response = await fetch(`${BASE_URL_REVIEW_SERVICE}/get-reviews-by-courseId?courseId=${courseId}`, {
          method: 'GET',
          credentials: 'include'
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Error fetching reviews:', errorText)
          throw new Error('Failed to fetch reviews.')
        }

        const data = await response.json()
        console.log('Reviews API Response:', data) // Log the API response
        setReviews(data.data) // Assuming the API returns reviews in the `data` field
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [courseId])

  useEffect(() => {
    console.log('Course Data:', course)
  }, [course])

  useEffect(() => {
    console.log('Teacher Data:', teacher)
  }, [teacher])

  useEffect(() => {
    console.log('Reviews Data:', reviews)
  }, [reviews])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'teacher':
        const teacherData = teacher || dummyTeacher // Use fetched teacher or fallback
        return (
          <div>
            <h2 className="text-xl font-bold mb-3">About the Teacher</h2>
            <div className="flex items-center gap-4">
              <img
                src={teacherData.urlImage || 'https://via.placeholder.com/150'} // Fallback for missing image
                alt={teacherData.userName || 'Unknown Teacher'}
                className="w-20 h-20 rounded-full border border-gray-300"
              />
              <div>
                <p className="text-lg font-semibold">{teacherData.userName || 'Unknown Teacher'}</p>
                <p className="text-gray-600">{teacherData.description || 'No description available.'}</p>
              </div>
            </div>
          </div>
        )
      case 'reviews':
        return (
          <div>
            <h2 className="text-xl font-bold mb-3">Student Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 border border-gray-300 rounded-lg shadow-md">
                  <div className="flex items-center gap-4 mb-2">
                    <img
                      src={review.userImage || 'https://via.placeholder.com/50'}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full border border-gray-300"
                    />
                    <p className="font-semibold">{review.userName}</p>
                  </div>
                  <p className="text-gray-700">{review.content}</p>
                  {/* Render the correct number of yellow and gray stars */}
                  <p className="text-yellow-500 flex">
                    {/* Render yellow stars */}
                    {Array.from({ length: review.review }, (_, i) => (
                      <span key={`yellow-${i}`} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                    {/* Render gray stars */}
                    {Array.from({ length: 5 - review.review }, (_, i) => (
                      <span key={`gray-${i}`} className="text-gray-300">
                        ★
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const handleAddToCart = async (courseId: string) => {
    try {
      const response = await fetch(`${BASE_URL_COURSE_SERVICE}/shopping-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ courseId })
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        setShowModal(true) // Show the modal
      } else {
        throw new Error(data.message || 'Failed to add course to cart.')
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error)
      alert(error.message || 'An error occurred.')
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!course) {
    return <p>Course not found.</p>
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-5 w-full">
      <div className="w-full max-w-6xl bg-[#F8FAFC] rounded-lg shadow-lg p-8">
        {/* Breadcrumb */}
        <p className="text-m text-gray-500 mb-3">Home &gt; Categories &gt; {course.courseName}</p>

        {/* Course Title and Description */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-[3]">
            <h1 className="text-5xl font-bold mb-3">{course.courseName}</h1>
            {/* Render the description with HTML tags */}
            <div className="text-xl text-gray-700 mb-3" dangerouslySetInnerHTML={{ __html: course.description }}></div>
            <p className="text-xl text-yellow-500 font-bold mb-3">
              {(course.totalReview || 0).toFixed(1)} ★ ({course.countReviews || 0} ratings) | {course.countLectures || 0} Lectures | {course.level || 'N/A'}
            </p>
          </div>

          {/* Buy Course Card */}
          <div className="flex-[1]">
            <BuyCourseCard
              urlAvt={course.urlAvt || 'https://via.placeholder.com/150'}
              price={course.price || 0}
              purchased={isPurchased}
              onAddToCart={() => handleAddToCart(courseId!)}
              onBuyNow={() => {
                // Navigate to the checkout page with the courseId as a query param
                window.location.href = `/student/shopping-cart/checkout?courseIds=${courseId}`
              }}
              onLearnNow={() => (window.location.href = `/student/courses/${courseId}/learning`)}
            />
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 mt-8">
        <div className="flex gap-4 border-b border-gray-300 pb-2">
          <button
            className={`px-4 py-2 font-semibold ${activeTab === 'teacher' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('teacher')}>
            Teacher
          </button>
          <button
            className={`px-4 py-2 font-semibold ${activeTab === 'reviews' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('reviews')}>
            Reviews
          </button>
        </div>
        <div className="mt-5">{renderTabContent()}</div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Course added to cart!</h2>
            <p className="mb-6">The course has been added to your shopping cart.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowModal(false)
                  window.location.href = '/student/shopping-cart'
                }}>
                Go to Cart
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
