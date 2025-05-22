'use client'
import React, { useState, useEffect } from 'react'
import TeacherCard from '@/components/teacher/TeacherCard'
// import StudentCourseCard from '@/components/course/StudentCourseCard'
import SimpleReviewCard from '@/components/review/SimpleReviewCard'
import { BASE_URL_COURSE_SERVICE, BASE_URL_LECTURE_SERVICE, BASE_URL_REVIEW_SERVICE, BASE_URL_USER_SERVICE } from '@/utils/BaseURL'
import { useParams } from 'next/navigation'

// CÒN TAB CÁC KHÓA HỌC LIÊN QUAN (RELATED COURSES) SẼ TRIỂN KHAI

interface Lecture {
  id: string
  courseId: string
  chapter: number
  title: string
  description: string
  type: string // e.g., "VIDEO", "MIXED"
  videoUrl?: string // URL for video content
  documentUrl?: string // URL for document content
  thumbnailUrl?: string // URL for thumbnail image
  duration: number // Duration in minutes
  status: string // e.g., "PUBLISHED"
  createdAt: string
  updatedAt: string
}

interface Course {
  id: string
  courseName: string
  description: string
  category: string
  level: string
  price: number
  status: string
  countLectures: number
  countOrders: number
  countReviews: number
  totalReview: number
  urlAvt: string
  urlIntro: string
  teacherId: string
  teacherName: string
  studentsId: string[]
  lectures: Lecture[] // Assuming lectures are fetched separately or included in the response
}

const fetchLectures = async (courseId: string, chapter?: number) => {
  try {
    const url = new URL(`${BASE_URL_LECTURE_SERVICE}/student/courses/${courseId}/lectures`)
    url.searchParams.append('pageSize', '10') // Default page size
    if (chapter) {
      url.searchParams.append('chapter', chapter.toString())
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),
      },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch lectures')
    }

    const data = await response.json()
    return data.lectures.map((lecture: any) => ({
      id: lecture.id,
      courseId: lecture.courseId,
      chapter: lecture.chapter,
      title: lecture.title,
      description: lecture.description,
      type: lecture.type,
      videoUrl: lecture.videoUrl,
      documentUrl: lecture.documentUrl,
      thumbnailUrl: lecture.thumbnailUrl,
      duration: lecture.duration,
      status: lecture.status,
      createdAt: lecture.createdAt,
      updatedAt: lecture.updatedAt
    }))
  } catch (error) {
    console.error('Error fetching lectures:', error)
    throw error
  }
}

const submitReview = async (reviewData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL_REVIEW_SERVICE}`, {
      method: 'POST',
      body: reviewData,
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),
      },
      credentials: 'include'
    })

    if (!response.ok) {
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json()
        console.error('Error response from API:', errorData)
        throw new Error(errorData.message || 'Failed to submit review')
      } else {
        throw new Error('Unexpected server response. Please try again later.')
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error submitting review:', error.message || error)
    throw error
  }
}

const checkIfReviewed = async (courseId: string, userId: string) => {
  try {
    const response = await fetch(`${BASE_URL_REVIEW_SERVICE}/api/v1/reviews/reviewed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),
      },
      body: JSON.stringify({ courseId, userId }),
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to check review status')
    }

    const data = await response.json()
    return data?.data !== null // If data is not null, the user has already reviewed
  } catch (error) {
    console.error('Error checking review status:', error)
    throw error
  }
}

const ReviewSection = ({ courseId }: { courseId: string | null }) => {
  const [reviews, setReviews] = useState<any[]>([]) // Stores all reviews for the course
  const [userReview, setUserReview] = useState<any | null>(null) // Stores the logged-in user's review
  const [reviewed, setReviewed] = useState<boolean>(false) // Indicates if the user has reviewed the course
  const [content, setContent] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) return

    const fetchReviews = async () => {
      try {
        // Fetch all reviews for the course
        const response = await fetch(`${BASE_URL_REVIEW_SERVICE}/get-reviews-by-courseId?courseId=${courseId}`, {
          method: 'GET',
          headers:{
             Authorization: "Bearer " + window.localStorage.getItem("access_token"),
          },
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to fetch reviews.')
        }

        const data = await response.json()
        console.log('Reviews API Response:', data) // Debug log
        setReviews(data.data || []) // Set all reviews for the course
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setError('Failed to fetch reviews. Please try again later.')
      }
    }

    const fetchUserReviewStatus = async () => {
      try {
        // Check if the user has reviewed the course
        const response = await fetch(`${BASE_URL_REVIEW_SERVICE}/reviewed?courseId=${courseId}`, {
          method: 'GET',
          headers:{
             Authorization: "Bearer " + window.localStorage.getItem("access_token"),
          },
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to check review status.')
        }

        const data = await response.json()
        console.log('User Review API Response:', data) // Debug log
        setReviewed(data.reviewed) // Set the reviewed status

        // If the user has reviewed, fetch their review
        if (data.reviewed && data.data) {
          setUserReview(data.data) // Set the user's review directly from the API response
        }
      } catch (error) {
        console.error('Error checking review status:', error)
        setError('Failed to check review status. Please try again later.')
      }
    }

    fetchReviews()
    fetchUserReviewStatus()
  }, [courseId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!courseId) {
      setError('Course ID is not available. Please try again later.')
      return
    }

    if (!content || !rating) {
      setError('Please provide both a review and a rating.')
      return
    }

    const formData = new FormData()
    formData.append('courseId', courseId)
    formData.append('content', content)
    formData.append('review', rating.toString())

    try {
      setError(null)
      const response = await submitReview(formData)
      setSuccess('Review submitted successfully!')
      setContent('')
      setRating(null)

      // Update the user's review and the reviews list
      const newReview = response.data
      console.log('Newly Submitted Review:', newReview) // Log the new review
      setUserReview(newReview)
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== newReview.id)) // Remove old user review if any
      setReviewed(true) // Mark the user as having reviewed
    } catch (err: any) {
      setError(err.message || 'Failed to submit review. Please try again.')
    }
  }

  console.log('Reviewed State:', reviewed) // Log the reviewed state
  console.log('User Review State:', userReview) // Log the userReview state
  console.log('Reviews Array:', reviews) // Log the reviews array

  return (
    <div className="mt-5">
      <h3 className="text-xl font-bold mb-4">Reviews</h3>

      {/* Display the user's review at the top if it exists */}
      {reviewed && userReview && (
        <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-blue-100 mb-6">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">Your Review</h4>
          <p className="text-gray-700 mb-2">{userReview.content}</p>
          <p className="text-yellow-500">{userReview.review} ★</p>
        </div>
      )}

      {/* Display the form if the user hasn't submitted a review */}
      {!reviewed && (
        <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white mb-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Submit a Review</h4>
          {error && <p className="text-red-500 mb-3">{error}</p>}
          {success && <p className="text-green-500 mb-3">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Review Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Write your review here..."
                required
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select
                id="rating"
                value={rating || ''}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required>
                <option value="" disabled>
                  Select a rating
                </option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              disabled={!courseId}>
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Display all reviews */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
              <p className="text-gray-700 mb-2">{review.content}</p>
              {/* Render the correct number of yellow and gray stars */}
              <p className="flex">
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
              <p className="text-sm text-gray-500">By {review.userName}</p>
            </div>
          ))
        ) : (
          <p>No reviews available for this course.</p>
        )}
      </div>
    </div>
  )
}

export default function CoursePage() {
  const params = useParams() // Extract params from the dynamic route
  const courseId = params['course-id'] // Get the courseId from the dynamic route

  const [course, setCourse] = useState<Course | null>(null)
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null)
  const [activeTab, setActiveTab] = useState<'description' | 'teacher' | 'reviews'>('description')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [teacher, setTeacher] = useState<any | null>(null) // Declare teacher state here

  // Move fetchTeacherDetails below the state declarations
  const fetchTeacherDetails = async (teacherId: string) => {
    console.log(`Fetching teacher details from ${BASE_URL_USER_SERVICE}?id=${teacherId}`)
    try {
      const response = await fetch(`${BASE_URL_USER_SERVICE}?id=${teacherId}`, {
        method: 'GET',
        headers:{
           Authorization: "Bearer " + window.localStorage.getItem("access_token"),
        },
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to fetch teacher details.')
      }

      const data = await response.json()
      console.log('Teacher API Response:', data) // Log the API response
      setTeacher(data.user) // Use setTeacher after it's declared
    } catch (error) {
      console.error('Error fetching teacher details:', error)
      setTeacher(null) // Set teacher to null if the API call fails
    }
  }

  useEffect(() => {
    if (!courseId) {
      console.error('Course ID is missing from the URL.')
      setError('Invalid course ID. Please try again.')
      return
    }

    const fetchCourse = async () => {
      try {
        setLoading(true)
        console.log('Fetching course for courseId:', courseId)

        const courseResponse = await fetch(`${BASE_URL_COURSE_SERVICE}?id=${courseId}`, {
          method: 'GET',
          headers:{
             Authorization: "Bearer " + window.localStorage.getItem("access_token"),
          },
          credentials: 'include'
        })

        if (!courseResponse.ok) {
          const errorData = await courseResponse.json()
          throw new Error(errorData.message || 'Failed to fetch course')
        }

        const courseData = await courseResponse.json()

        // Log the fetched course object
        console.log('Fetched Course:', JSON.stringify(courseData, null, 2))

        // Fetch teacher details
        fetchTeacherDetails(courseData.data.teacherId)

        // Fetch lectures
        let lecturesData: Lecture[] = []
        try {
          lecturesData = await fetchLectures(courseId)
        } catch (error) {
          console.error('Error fetching lectures:', error.message || error)
        }

        // Fetch reviews
        let reviewsData: any[] = []
        try {
          const reviewsResponse = await fetch(`${BASE_URL_REVIEW_SERVICE}/get-reviews-by-courseId?courseId=${courseId}`, {
            method: 'GET',
            headers:{
               Authorization: "Bearer " + window.localStorage.getItem("access_token"),
            },
            credentials: 'include'
          })
          const reviewsJson = await reviewsResponse.json()
          if (!reviewsResponse.ok || reviewsJson.code !== 200) {
            throw new Error(reviewsJson.message || 'Failed to fetch reviews')
          }
          reviewsData = reviewsJson.data || []
        } catch (error) {
          console.error('Error fetching reviews:', error.message || error)
        }

        // Set course data
        setCourse({
          ...courseData.data,
          lectures: lecturesData,
          reviews: reviewsData
        })

        // Set the first lecture as the default selected lecture
        setSelectedLecture(lecturesData?.[0] || null)
      } catch (error) {
        console.error('Error fetching course:', error.message || error)
        setError('Failed to load course or lectures. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  const renderTabContent = () => {
    if (!course) return null

    switch (activeTab) {
      case 'description':
        return (
          <div>
            <h2 className="text-xl font-bold mb-3">Course Description</h2>
            <div dangerouslySetInnerHTML={{ __html: course.description }} />
          </div>
        )
      case 'teacher':
        return (
          <div className="w-1/4">
            <h2 className="text-xl font-bold mb-3">Teacher</h2>
            {teacher ? (
              <TeacherCard
                name={teacher.userName || 'N/A'}
                expertise={teacher.description || 'N/A'}
                rating={course.totalReview}
                students={course.countOrders} // Number of students in this course
                urlAva={teacher.urlImage || course.urlAvt} // Use teacher's avatar if available
              />
            ) : (
              <p>Loading teacher information...</p>
            )}
          </div>
        )
      case 'reviews':
        return (
          <div>
            <ReviewSection courseId={courseId} />
          </div>
        )
      default:
        return null
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-5 w-full">
      <div className="w-full bg-white rounded-lg shadow-lg p-5">
        <h1 className="text-left text-3xl font-bold mb-5 text-blue-700">Course: {course.courseName}</h1>
        <div className="flex gap-8">
          {/* Lecture Content Section */}
          <div className="flex-[3] w-full">
            {selectedLecture?.type === 'VIDEO' && selectedLecture.videoUrl ? (
              <video controls className="w-full rounded-lg shadow-md">
                <source src={selectedLecture.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : selectedLecture?.type === 'MIXED' ? (
              <div>
                <video controls className="w-full rounded-lg shadow-md mb-4">
                  <source src={selectedLecture.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <a href={selectedLecture.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View Document
                </a>
              </div>
            ) : (
              <div className="p-5 border border-gray-300 rounded-lg shadow-md h-[300px] overflow-y-auto">
                <p>{selectedLecture?.description}</p>
              </div>
            )}
          </div>

          {/* Course Outline Section */}
          <div className="flex-[2] h-[400px] overflow-y-auto border border-gray-300 rounded-lg shadow-md p-4">
            <h3 className="text-center text-lg font-semibold mb-3 text-blue-700">Course Lectures</h3>
            <ul className="list-none p-0">
              {course.lectures
                .sort((a, b) => a.chapter - b.chapter)
                .map((lecture) => (
                  <li
                    key={lecture.id}
                    className={`cursor-pointer p-3 rounded-lg mb-2 text-left ${lecture.id === selectedLecture?.id ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'
                      }`}
                    onClick={() => setSelectedLecture(lecture)}>
                    <div className="flex justify-between items-center">
                      <span>
                        {lecture.chapter}. {lecture.title} - {lecture.type}
                      </span>
                      <span className="text-gray-500 text-sm">{lecture.duration} min</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="w-full bg-white rounded-lg shadow-lg p-5 mt-5">
        <div className="flex gap-4 border-b border-gray-300 pb-2">
          <button
            className={`px-4 py-2 font-semibold ${activeTab === 'description' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('description')}>
            Description
          </button>
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
    </div>
  )
}
