'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { BASE_URL_COURSE_SERVICE } from '@/utils/BaseURL'
import StudentCourseCard from './StudentCourseCard'
import { log } from 'console'
import { useSearchParams } from 'next/navigation'

interface Course {
  id: string
  courseName: string
  teacherName: string
  teacherId: string
  totalReview: number
  countReviews: number
  price: number
  urlAvt: string
  category: string
}

interface APIResponse {
  code: number
  data: Course[]
  message: string
}

export default function StudentCourseGrid() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || null

  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortOrder, setSortOrder] = useState<string>('price')
  const [currentPage, setCurrentPage] = useState(1)
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const coursesPerPage = 9

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL_COURSE_SERVICE}/get-all-categories`)
        setCategories(response.data.data || [])
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }

    fetchCategories()
  }, [])

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get<APIResponse>(`${BASE_URL_COURSE_SERVICE}/search`, {
          params: {
            page: currentPage - 1,
            size: coursesPerPage,
            rating: selectedRating,
            sort: sortOrder,
            category: selectedCategory
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log('Fetched courses:', response.data.data) // Log the entire list of courses

        setCourses(response.data.data || [])
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError('Failed to load courses. Please try again later.')
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [currentPage, selectedCategory, selectedRating, sortOrder])

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedRating(null)
    setSortOrder('price')
    setCurrentPage(1)
  }

  // Pagination logic
  const totalPages = Math.ceil(courses.length / coursesPerPage)
  const startIndex = (currentPage - 1) * coursesPerPage
  const currentCourses = courses.slice(startIndex, startIndex + coursesPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
        <button onClick={() => setCurrentPage(1)} className="ml-4 text-blue-500 hover:text-blue-600 underline">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Filters) */}
      <aside className="w-80 p-4 border-r min-h-screen hidden md:block">
        <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
          Filters
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-1">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </h2>

        {isOpen || (
          <div className="space-y-6">
            {/* Rating Filter */}
            <div>
              <h3 className="font-medium mb-2">Rating</h3>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <input type="radio" name="rating" value="" onChange={() => setSelectedRating(null)} checked={selectedRating === null} className="mr-2" />
                  <span>All Ratings</span>
                </li>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <li key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      onChange={() => setSelectedRating(rating)}
                      checked={selectedRating === rating}
                      className="mr-2"
                    />
                    <span>{'⭐'.repeat(rating)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <select value={selectedCategory || ''} onChange={(e) => setSelectedCategory(e.target.value || null)} className="w-full p-2 border rounded">
                <option key="all-categories" value="">
                  All Categories
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <h3 className="font-medium mb-2">Sort by</h3>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full p-2 border rounded">
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="coursename">Course Name</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div>
              <button onClick={clearFilters} className="w-full px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Course Grid */}
      <div className="flex-1 p-4">
        <h2 className="text-lg font-bold mb-4">Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCourses.map((course) => {
            // Calculate average review
            let avgReview = 0
            if (typeof course.totalReview === 'number' && typeof course.countReviews === 'number' && course.countReviews > 0) {
              avgReview = course.totalReview / course.countReviews
            }
            // Always pass a number!
            return (
              <Link key={course.id} href={`/student/courses/${course.id}`} className="block hover:shadow-lg transition-shadow duration-200">
                <StudentCourseCard
                  courseName={course.courseName}
                  category={course.category}
                  price={course.price}
                  totalReview={isNaN(avgReview) || !isFinite(avgReview) ? 0 : avgReview}
                  countReviews={course.countReviews}
                  urlAvt={course.urlAvt}
                  teacherName={course.teacherName}
                />
              </Link>
            )
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
              Back to Top
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
              Go to Last
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
