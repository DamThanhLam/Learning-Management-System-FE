'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BASE_URL_USER_SERVICE, BASE_URL_COURSE_SERVICE } from '@/utils/BaseURL'
import { useParams } from 'next/navigation'
import qs from 'query-string'

interface Teacher {
  id: string
  userName: string
  description: string | null
  urlImage: string | null
  contacts: any
}

interface Course {
  id: string
  courseName: string
  price: number
  countReviews: number
  countLectures: number
  countOrders: number
  status: string
}

const coursesPerPage = 3

const Profile = () => {
  const params = useParams()
  const teacherId = params['teacher-id']
  const [isClient, setIsClient] = useState(false)
  const [mentorData, setMentorData] = useState<Teacher | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [lastEvaluatedIds, setLastEvaluatedIds] = useState<string[]>([''])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Fetch teacher data
  useEffect(() => {
    setIsClient(true)
    if (!teacherId) return
    const fetchMentorData = async () => {
      try {
        const response = await fetch(`${BASE_URL_USER_SERVICE}?id=${teacherId}`)
        const data = await response.json()
        if (data.user) setMentorData(data.user)
      } catch (error) {
        console.error('Error fetching mentor data:', error)
      }
    }
    fetchMentorData()
  }, [teacherId])

  // Fetch teacher's courses with pagination using BASE_URL_COURSE_SERVICE
  useEffect(() => {
    if (!teacherId) return
    const fetchCourses = async () => {
      try {
        const pageSize = coursesPerPage
        const lastEvaluatedId = lastEvaluatedIds[currentPage - 1] || ''
        const query = qs.stringify({
          teacherId,
          pageSize,
          lastEvaluatedId
        })
        const apiUrl = `${BASE_URL_COURSE_SERVICE}/get-courses-of-teacher?${query}`
        console.log('Fetching courses for teacher:', apiUrl)

        // Get token and set headers if available
        const token = window.localStorage.getItem('access_token')
        const headers: Record<string, string> = {}
        if (token) {
          headers['Authorization'] = 'Bearer ' + token
        }

        const response = await fetch(apiUrl, {
          credentials: 'include',
          headers
        })
        const data = await response.json()
        console.log('Courses API response:', data)

        if (data.code === 200 && Array.isArray(data.data)) {
          setCourses(data.data)
          setHasMore(data.data.length === pageSize)
        } else {
          setCourses([])
          setHasMore(false)
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
        setCourses([])
        setHasMore(false)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId, currentPage, lastEvaluatedIds])

  // Handle pagination
  const handleNextPage = () => {
    if (courses.length > 0) {
      setLastEvaluatedIds((prev) => {
        const newIds = [...prev]
        newIds[currentPage] = courses[courses.length - 1].id
        return newIds
      })
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  if (!isClient || !mentorData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Main Content */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Header */}
            <header className="flex flex-col items-start space-y-4 bg-white p-6 rounded-lg">
              <div className="w-full">
                <h1 className="text-2xl font-bold mb-4">{mentorData.userName}</h1>
                <div className="text-gray-700">
                  <p className="mb-4">{mentorData.description || 'No description available.'}</p>
                </div>
              </div>
            </header>
          </div>

          {/* Right Column - Profile Image and Social Links */}
          <div className="w-full md:w-1/3">
            <div className="sticky top-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="relative w-48 h-48 mx-auto">
                  <Image
                    src={mentorData.urlImage || '/profile.jpg'}
                    alt={`${mentorData.userName}'s Profile Picture`}
                    fill
                    className="rounded-full object-cover border-4 border-gray-200"
                  />
                </div>
                {mentorData.contacts && (
                  <div className="flex flex-col space-y-3 w-48 mx-auto mt-6">
                    {Object.entries(mentorData.contacts).map(([label, url], index) => (
                      <a
                        key={index}
                        href={url as string}
                        className="flex items-center justify-center space-x-2 text-blue-500 hover:text-blue-700 p-2 border rounded-lg hover:bg-gray-50">
                        <span>{label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* More Courses Section - Full Width */}
        <div className="mt-6">
          <section className="bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">More Courses by {mentorData.userName}</h2>
              <div className="text-sm text-gray-600">
                {courses.length > 0
                  ? `Showing ${1 + (currentPage - 1) * coursesPerPage} to ${(currentPage - 1) * coursesPerPage + courses.length}`
                  : 'No courses found'}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => (window.location.href = `/student/courses/${course.id}`)}>
                  <div className="relative h-48 w-full flex items-center justify-center bg-gray-100">
                    {course.urlAvt ? (
                      <Image src={course.urlAvt} alt={course.courseName} fill className="object-cover" />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.courseName}</h3>
                    {/* Display category */}
                    {course.category && (
                      <div className="mb-2">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{course.category}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="mr-4">{course.countLectures} Lectures</span>
                      <span>{course.countOrders} Students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-blue-600">${course.price}</p>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-sm text-gray-600">{course.countReviews} reviews</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Status: {course.status}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}>
                Previous
              </button>
              <span className="px-4 py-2">{currentPage}</span>
              <button
                onClick={handleNextPage}
                disabled={!hasMore}
                className={`px-4 py-2 rounded-md ${
                  !hasMore ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}>
                Next
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Profile
