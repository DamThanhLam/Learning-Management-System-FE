'use client'

import CourseCard from '@/components/student/profile/CourseCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL_COURSE_SERVICE } from '@/utils/BaseURL'
import type { CourseCardProps } from '@/components/student/profile/CourseCard'
import Link from 'next/link'

interface Course {
  id: string
  courseName: string
  teacherName: string
  teacherId: string
  totalReview: number
  countReviews: number
  price: number
  urlAvt: string
}

interface APIResponse {
  code: number
  data: Course[]
  message: string
}

interface SortOption {
  value: string
  label: string
  apiValue: string
}

const sortOptions: SortOption[] = [
  { value: 'relevance', label: 'Relevance', apiValue: '' },
  { value: 'price_asc', label: 'Price: Low to High', apiValue: 'price,asc' },
  { value: 'price_desc', label: 'Price: High to Low', apiValue: 'price,desc' },
  { value: 'rating_desc', label: 'Rating: High to Low', apiValue: 'totalReview,desc' },
  { value: 'rating_asc', label: 'Rating: Low to High', apiValue: 'totalReview,asc' },
  { value: 'name_asc', label: 'Name: A to Z', apiValue: 'courseName,asc' },
  { value: 'name_desc', label: 'Name: Z to A', apiValue: 'courseName,desc' }
]

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [teacherSearch, setTeacherSearch] = useState('')
  const [sort, setSort] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null)

  const fetchCourses = async (page: number, teacherSearchTerm: string, sortBy: string) => {
    try {
      setLoading(true)
      setError(null)

      const sortOption = sortOptions.find((option) => option.value === sortBy)
      const apiSortValue = sortOption?.apiValue || undefined

      console.log('Sort selection:', {
        selectedSort: sortBy,
        sortOption,
        apiSortValue
      })

      const response = await axios.get<APIResponse>(`${BASE_URL_COURSE_SERVICE}/student`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + window.localStorage.getItem("access_token"),

          Accept: 'application/json'
        },
        withCredentials: true
      })

      if (response.data.code === 200 && Array.isArray(response.data.data)) {
        let sortedCourses = [...response.data.data]

        if (selectedTeacherId) {
          sortedCourses = sortedCourses.filter((course) => course.teacherId === selectedTeacherId)
        }

        switch (sortBy) {
          case 'name_asc':
            sortedCourses.sort((a, b) => a.courseName.localeCompare(b.courseName))
            break
          case 'name_desc':
            sortedCourses.sort((a, b) => b.courseName.localeCompare(a.courseName))
            break
          case 'price_asc':
            sortedCourses.sort((a, b) => a.price - b.price)
            break
          case 'price_desc':
            sortedCourses.sort((a, b) => b.price - a.price)
            break
          case 'rating_desc':
            sortedCourses.sort((a, b) => b.totalReview - a.totalReview)
            break
          case 'rating_asc':
            sortedCourses.sort((a, b) => a.totalReview - b.totalReview)
            break
        }

        console.log(
          'Filtered and sorted courses:',
          sortedCourses.map((course) => ({
            teacher: course.teacherName,
            teacherId: course.teacherId,
            name: course.courseName,
            price: course.price,
            rating: course.totalReview
          }))
        )

        setCourses(sortedCourses)
        setTotalItems(sortedCourses.length)
        setTotalPages(Math.ceil(sortedCourses.length / 9))
      } else {
        console.error('Invalid response format:', response.data)
        setError('Invalid response format from server')
      }
    } catch (err) {
      console.error('Error fetching courses:', err)
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message
        setError(`Failed to fetch courses: ${errorMessage}`)
        console.error('API Error Details:', {
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers
        })
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses(currentPage, teacherSearch, sort)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentPage, teacherSearch, sort])

  const handleTeacherSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacherSearch(e.target.value)
    setSelectedTeacherId(null)
    setCurrentPage(1)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value)
    setCurrentPage(1)
  }

  const mapCourseToCardProps = (course: Course): CourseCardProps => ({
    title: course.courseName,
    author: course.teacherName,
    rating: course.totalReview,
    ratingCount: course.countReviews,
    price: course.price,
    urlAvt: course.urlAvt
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">{error}</div>
        <button onClick={() => fetchCourses(currentPage, teacherSearch, sort)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">
          Available Courses <span className="text-gray-500">({totalItems})</span>
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by teacher name"
              className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={teacherSearch}
              onChange={handleTeacherSearchChange}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Sort By</span>
            <select title="option" className="border rounded px-2 py-1 text-sm min-w-[160px]" value={sort} onChange={handleSortChange}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of courses */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/student/courses/${course.id}/learning`} className="block hover:shadow-lg transition-shadow">
              <CourseCard {...mapCourseToCardProps(course)} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">No courses found. Try adjusting your search criteria.</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <div className="inline-flex items-center border rounded-md overflow-hidden text-sm">
            <button
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}>
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1 ${currentPage === page ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'}`}
                onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            ))}
            <button
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
