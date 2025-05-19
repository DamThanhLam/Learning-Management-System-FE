import Image from 'next/image'
interface TopCourseCardProps {
  courseName: string
  teacherName: string
  price: string
  overallReview: number
  countReviews: number
  avaUrl: string
}

export default function TopCourseCard({ courseName, teacherName, price, overallReview, countReviews, avaUrl }: TopCourseCardProps) {
  return (
    <div
      className="bg-white border rounded-lg shadow-md flex flex-col overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-2"
      style={{ width: '18rem', height: '30rem' }} // Custom dimensions
    >
      {/* Image Section */}
      <div className="h-1/2 w-full">
        <Image
          src={avaUrl}
          alt={courseName}
          className="w-full h-full object-cover"
          width={336} // Matches the card width (21rem = 336px)
          height={168} // Matches 50% of the card height
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between p-4">
        {/* Course Name */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{courseName}</h3>

        {/* Teacher Name */}
        <p className="text-sm text-gray-500 mt-1 flex items-center">By {teacherName}</p>

        {/* Reviews */}
        <div className="flex items-center text-yellow-500 mt-2">
          <span className="text-base">{'⭐'.repeat(Math.round(overallReview))}</span>
          <span className="text-sm ml-2">{overallReview.toFixed(1)}</span>
          <p className="text-xs text-gray-500 ml-2">({countReviews} Reviews)</p>
        </div>

        {/* Price */}
        <p className="text-gray-800 font-bold text-lg mt-3">
          <span className="text-green-600">{price}</span>
        </p>
      </div>
    </div>
  )
}
