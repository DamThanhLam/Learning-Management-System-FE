// app/profile/my-reviews/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { BASE_URL_REVIEW_SERVICE, BASE_URL_COURSE_SERVICE } from '@/utils/BaseURL'
import axios from 'axios'

interface Review {
  id: number
  courseId: string
  userId: string
  userName: string
  review: number
  content: string
  createdAt: string
}

interface CourseInfo {
  courseName: string
  urlAvt?: string
}

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [courses, setCourses] = useState<Record<string, CourseInfo>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all reviews made by the user
  const fetchMyReviewed = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${BASE_URL_REVIEW_SERVICE}/my-reviewed`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        withCredentials: true
      })
      if (response.data.code === 200) {
        setReviews(response.data.data)
        console.log('Fetched my reviews:', response.data.data)
        // Fetch course info for each review
        fetchCoursesForReviews(response.data.data)
      } else {
        setError(response.data.message || 'Failed to fetch reviews')
      }
    } catch (err: any) {
      setError('Failed to load your reviews.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch course info for each review
  const fetchCoursesForReviews = async (reviews: Review[]) => {
    const courseIds = Array.from(new Set(reviews.map((r) => r.courseId)))
    const newCourses: Record<string, CourseInfo> = {}
    await Promise.all(
      courseIds.map(async (courseId) => {
        try {
          const response = await fetch(`${BASE_URL_COURSE_SERVICE}?id=${courseId}`, {
            method: 'GET',
            credentials: 'include'
          })
          const res = await response.json()
          if (res && res.data) {
            newCourses[courseId] = {
              courseName: res.data.courseName,
              urlAvt: res.data.urlAvt
            }
          }
        } catch (e) {
          newCourses[courseId] = { courseName: 'Unknown Course' }
        }
      })
    )
    console.log('Fetched courses for reviews:', newCourses) // Log the fetched courses here
    setCourses(newCourses)
  }

  useEffect(() => {
    fetchMyReviewed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-xl font-semibold">My Course Reviews</h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white p-4 flex gap-4 cursor-pointer"
              onClick={() => (window.location.href = `/student/courses/${review.courseId}`)}
              tabIndex={0}
              role="button">
              <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded">
                {courses[review.courseId]?.urlAvt ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={courses[review.courseId].urlAvt} alt={courses[review.courseId].courseName} className="object-cover w-24 h-24 rounded" />
                ) : (
                  <span className="text-gray-400 text-xs">No Image</span>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <span className="font-semibold text-base">{courses[review.courseId]?.courseName || 'Loading...'}</span>
                  <span className="ml-2 text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm text-yellow-500 space-x-1 mb-2">
                  <span>{'★'.repeat(review.review)}</span>
                </div>
                <p className="text-sm text-gray-700">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">You have not reviewed any courses yet.</div>
      )}
    </div>
  )
}
