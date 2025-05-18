import Image from 'next/image'
import { Star } from 'lucide-react'

interface StudentCourseCardProps {
  courseName: string
  category: string
  price: number
  totalReview: number
  countReviews: number
  urlAvt: string
  teacherName: string
}

const StudentCourseCard: React.FC<StudentCourseCardProps> = ({ courseName, category, price, totalReview = 0, countReviews, urlAvt, teacherName }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Course Image */}
      <div className="w-full h-40 relative">
        <Image src={urlAvt} alt={courseName} layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div>

      {/* Course Details */}
      <div className="p-4 flex flex-col gap-2">
        {/* Course Name */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{courseName}</h3>

        {/* Teacher Name */}
        <p className="text-sm text-gray-500">
          <strong>By:</strong> {teacherName}
        </p>

        {/* Category */}
        <p className="text-sm text-blue-700">
          <strong>Category:</strong> {category}
        </p>

        {/* Ratings */}
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < Math.round(totalReview) ? 'text-yellow-500' : 'text-gray-300'} />
          ))}
          <span className="text-yellow-600 text-sm ml-2">
            {totalReview.toFixed(1)} ({countReviews} Reviews)
          </span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-green-600 mt-2">{price === 0 ? 'Free' : `$${price.toFixed(2)}`}</p>
      </div>
    </div>
  )
}

export default StudentCourseCard
