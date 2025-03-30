"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import StudentCourseCard from "./StudentCourseCard"; // Import the StudentCourseCard component

// Sample courses (can be fetched from an API in the future) 
const courses = [
  {
    id: 1,
    courseName: "Course 1",
    category: "Design",
    rating: 4.5,
    price: 0,
    lectures: 5,
    startTime: "2025-01-01T00:00:00",
    urlAvt: "https://picsum.photos/400/300",
  },
  {
    id: 2,
    courseName: "Course 2",
    category: "Development",
    rating: 4.0,
    price: 50,
    lectures: 12,
    startTime: "2025-02-01T00:00:00",
    urlAvt: "https://picsum.photos/400/300",
  },
  {
    id: 3,
    courseName: "Course 3",
    category: "Marketing",
    rating: 3.5,
    price: 100,
    lectures: 8,
    startTime: "2025-03-01T00:00:00",
    urlAvt: "https://picsum.photos/400/300",
  },
  {
    id: 4,
    courseName: "Course 4",
    category: "Business",
    rating: 3.8,
    price: 75,
    lectures: 10,
    startTime: "2025-04-01T00:00:00",
    urlAvt: "https://picsum.photos/400/300",
  },
  {
    id: 5,
    courseName: "Course 5",
    category: "Photography",
    rating: 2.9,
    price: 30,
    lectures: 7,
    startTime: "2025-05-01T00:00:00",
    urlAvt: "https://picsum.photos/400/300",
  },
  {
    id: 6,
    courseName: "Course 6",
    category: "Design",
    rating: 4.9,
    price: 0,
    lectures: 15,
    startTime: "2025-06-01T00:00:00",
    urlAvt: "https://picsum.photos/400/300",
  },
  {
    id: 7,
    courseName: "Course 7",
    category: "Development",
    rating: 4.3,
    price: 60,
    lectures: 9,
    startTime: "2025-07-01T00:00:00",
    urlAvt: "https://picsum.photos/400/300",
  },
  {
    id: 8,
    courseName: "Course 8",
    category: "Marketing",
    rating: 4.7,
    price: 90,
    lectures: 11,
    startTime: "2025-08-01T00:00:00",
    urlAvt: "https://picsum.photos/400/300",
  },
  {
    id: 9,
    courseName: "Course 9",
    category: "Business",
    rating: 4.6,
    price: 40,
    lectures: 6,
    startTime: "2025-09-01T00:00:00",
    urlAvt: "https://picsum.photos/400/300",
  },
  {
    id: 10,
    courseName: "Course 10",
    category: "Photography",
    rating: 4.1,
    price: 20,
    lectures: 4,
    startTime: "2025-10-01T00:00:00",
    urlAvt: "https://picsum.photos/400/300",
  },
];

// Sample categories (can be fetched from an API in the future)
const categories = [
  { id: 1, name: "Design" },
  { id: 2, name: "Development" },
  { id: 3, name: "Marketing" },
  { id: 4, name: "Business" },
  { id: 5, name: "Photography" },
];

export default function StudentCourseGrid() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedLectures, setSelectedLectures] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("latest"); // State for chronological filter
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const coursesPerPage = 9; // Number of courses per page

  // Reset all filters to default values
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedPrice(null);
    setSelectedLectures(null);
    setSelectedRating(null);
    setSortOrder("latest");
    setCurrentPage(1);
  };

  // Filter courses based on selected filters
  let filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    const matchesPrice =
      selectedPrice === "free"
        ? course.price === 0
        : selectedPrice === "paid"
        ? course.price > 0
        : true;
    const matchesLectures = selectedLectures
      ? (selectedLectures === "20+" && course.lectures > 20) ||
        (selectedLectures === "11-20" && course.lectures >= 11 && course.lectures <= 20) ||
        (selectedLectures === "6-10" && course.lectures >= 6 && course.lectures <= 10) ||
        (selectedLectures === "1-5" && course.lectures >= 1 && course.lectures <= 5)
      : true;
    const matchesRating = selectedRating
      ? course.rating >= selectedRating && course.rating < selectedRating + 1
      : true;

    return matchesCategory && matchesPrice && matchesLectures && matchesRating;
  });

  // Apply chronological sorting
  filteredCourses = filteredCourses.sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    } else {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  };

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
                  <input
                    type="radio"
                    name="rating"
                    value=""
                    onChange={() => setSelectedRating(null)}
                    checked={selectedRating === null}
                    className="mr-2"
                  />
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
                    <span>{"⭐".repeat(rating)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Number of Lectures Filter */}
            <div>
              <h3 className="font-medium mb-2">Number of Lectures</h3>
              <select
                value={selectedLectures || ""}
                onChange={(e) => setSelectedLectures(e.target.value || null)}
                className="w-full p-2 border rounded"
              >
                <option value="">All</option>
                <option value="1-5">1 - 5</option>
                <option value="6-10">6 - 10</option>
                <option value="11-20">11 - 20</option>
                <option value="20+">20+</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-medium mb-2">Price</h3>
              <select
                value={selectedPrice || ""}
                onChange={(e) => setSelectedPrice(e.target.value || null)}
                className="w-full p-2 border rounded"
              >
                <option value="">All</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <select
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full p-2 border rounded"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>


            {/* Chronological Filter */}
            <div>
              <h3 className="font-medium mb-2">Sort by Date</h3>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div>
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"              >
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
          {currentCourses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`} // Dynamic route for course detail page
              className="block hover:shadow-lg transition-shadow duration-200"
            >
              <StudentCourseCard {...course} />
            </Link>
          ))}
        </div>


        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Back to Top
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Go to Last
          </button>
        </div>
      </div>
    </div>
  );
}