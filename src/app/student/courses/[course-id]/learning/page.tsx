'use client'
import React, { useState, useEffect } from 'react'
import TeacherCard from '@/components/teacher/TeacherCard'
// import StudentCourseCard from '@/components/course/StudentCourseCard'
import SimpleReviewCard from '@/components/review/SimpleReviewCard'
import {
  BASE_URL_COURSE_SERVICE,
  BASE_URL_LECTURE_SERVICE,
  BASE_URL_REVIEW_SERVICE
} from '@/utils/BaseURL'

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

interface CoursePageProps {
  params: Promise<{
    'course-id': string // Match the dynamic route folder name
  }>
}

const fetchLectures = async (courseId: string, chapter?: number) => {
  try {
    const url = new URL(
      `${BASE_URL_LECTURE_SERVICE}/student/courses/${courseId}/lectures`
    )
    url.searchParams.append('pageSize', '10') // Default page size
    if (chapter) {
      url.searchParams.append('chapter', chapter.toString())
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch lectures')
    }

    const data = await response.json()
    console.log(data)
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
      credentials: 'include'
    })

    if (!response.ok) {
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json()
        throw new Error(errorData.errors || 'Failed to submit review')
      } else {
        throw new Error('Unexpected server response. Please try again later.')
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error submitting review:', error)
    throw error
  }
}

const ReviewSection = ({
  courseId,
  existingReview
}: {
  courseId: string
  existingReview?: any
}) => {
  const [content, setContent] = useState(existingReview?.content || '')
  const [rating, setRating] = useState<number | null>(
    existingReview?.review || null
  )
  const [fileImage, setFileImage] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent multiple reviews
    if (existingReview) {
      setError('You have already submitted a review for this course.')
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
    if (fileImage) {
      formData.append('fileImage', fileImage)
    }

    try {
      setError(null)
      const response = await submitReview(formData)
      setSuccess('Review submitted successfully!')
      setContent('')
      setRating(null)
      setFileImage(null)
    } catch (err: any) {
      setError(err.message || 'Failed to submit review. Please try again.')
    }
  }

  return (
    <div className="mt-5 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {existingReview ? 'Your Review' : 'Submit a Review'}
      </h3>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}
      {!existingReview && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1">
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
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-1">
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
          <div>
            <label
              htmlFor="fileImage"
              className="block text-sm font-medium text-gray-700 mb-1">
              Upload an Image (Optional)
            </label>
            <input
              id="fileImage"
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => setFileImage(e.target.files?.[0] || null)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            Submit Review
          </button>
        </form>
      )}
    </div>
  )
}

export default function CoursePage({ params }: CoursePageProps) {
  const [courseId, setCourseId] = useState<string | null>(null)
  const [course, setCourse] = useState<Course | null>(null)
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null)
  const [activeTab, setActiveTab] = useState<
    'description' | 'teacher' | 'related courses' | 'reviews'
  >('description')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Unwrap the params Promise
    params.then((resolvedParams) => {
      setCourseId(resolvedParams['course-id'])
    })
  }, [params])

  useEffect(() => {
    if (!courseId) return

    const fetchCourse = async () => {
      try {
        // Fetch course details
        const courseResponse = await fetch(
          `${BASE_URL_COURSE_SERVICE}?id=${courseId}`,
          {
            method: 'GET',
            credentials: 'include'
          }
        )
        const courseData = await courseResponse.json()
        if (!courseResponse.ok || courseData.code !== 200) {
          throw new Error(courseData.message || 'Failed to fetch course')
        }

        // Fetch lectures for the course
        const lecturesData = await fetchLectures(courseId)

        // Fetch reviews for the course
        const reviewsResponse = await fetch(
          `${BASE_URL_REVIEW_SERVICE}/get-reviews-by-courseId?courseId=${courseId}`,
          {
            method: 'GET',
            credentials: 'include'
          }
        )
        const reviewsData = await reviewsResponse.json()
        if (!reviewsResponse.ok || reviewsData.code !== 200) {
          throw new Error(reviewsData.message || 'Failed to fetch reviews')
        }

        setCourse({
          ...courseData.data,
          lectures: lecturesData || [],
          reviews: reviewsData.data || [] // Add reviews to the course object
        })

        // Set the first lecture as the default selected lecture
        setSelectedLecture(lecturesData?.[0] || null)
      } catch (error) {
        console.error('Error fetching course or lectures:', error)
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
            <TeacherCard
              name={course.teacherName}
              expertise="N/A" // Expertise is not provided in the API response
              rating={course.totalReview} // Assuming totalReview represents the teacher's rating
              students={course.studentsId.length}
              urlAva={course.urlAvt}
            />
          </div>
        )
      // case 'related courses':
      //   return (
      //     <div>
      //       <h2 className="text-xl font-bold mb-3">Related Courses</h2>
      //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-2/3">
      //         {course.relatedCourses.slice(0, 3).map((relatedCourse, index) => (
      //           <StudentCourseCard
      //             key={index}
      //             courseName={relatedCourse.courseName}
      //             category={relatedCourse.category}
      //             price={relatedCourse.price}
      //             startTime={relatedCourse.startTime}
      //             lectures={relatedCourse.lectures}
      //             rating={relatedCourse.rating}
      //             urlAvt={relatedCourse.urlAvt}
      //           />
      //         ))}
      //       </div>
      //     </div>
      //   )
      case 'reviews':
        const currentUserId = 'currentUserId' // Replace this with the actual logged-in user's ID
        const existingReview = course.reviews?.find(
          (review) => review.userId === currentUserId
        )
        return (
          <div>
            <h2 className="text-xl font-bold mb-3">Reviews</h2>
            <div className="space-y-4 w-1/2">
              {course.reviews?.length > 0 ? (
                course.reviews.map((review) => (
                  <SimpleReviewCard
                    key={review.userId}
                    userName={review.userName}
                    urlImage={review.urlImage}
                    content={review.content}
                    review={review.review}
                  />
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
            <ReviewSection
              courseId={course.id}
              existingReview={existingReview}
            />
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
        <h1 className="text-left text-3xl font-bold mb-5 text-blue-700">
          Course: {course.courseName}
        </h1>
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
                <a
                  href={selectedLecture.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline">
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
            <h3 className="text-center text-lg font-semibold mb-3 text-blue-700">
              Course Lectures
            </h3>
            <ul className="list-none p-0">
              {course.lectures
                .sort((a, b) => a.chapter - b.chapter)
                .map((lecture) => (
                  <li
                    key={lecture.id}
                    className={`cursor-pointer p-3 rounded-lg mb-2 text-left ${
                      lecture.id === selectedLecture?.id
                        ? 'bg-gray-200 font-bold'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedLecture(lecture)}>
                    <div className="flex justify-between items-center">
                      <span>
                        {lecture.chapter}. {lecture.title} - {lecture.type}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {lecture.duration} min
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <p className="mt-3 font-bold text-left text-2xl text-blue-700">
          Current lecture: {selectedLecture?.lectureName}
        </p>
      </div>

      {/* Tab Section */}
      <div className="w-full bg-white rounded-lg shadow-lg p-5 mt-5">
        <div className="flex gap-4 border-b border-gray-300 pb-2">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'description'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('description')}>
            Description
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'teacher'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('teacher')}>
            Teacher
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'reviews'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('reviews')}>
            Reviews
          </button>
        </div>
        <div className="mt-5">{renderTabContent()}</div>
      </div>
    </div>
  )
}
