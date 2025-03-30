import Image from "next/image";
import { Star } from "lucide-react";

interface StudentCourseCardProps {
  courseName: string;
  category: string;
  price: number;
  startTime: string;
  lectures: number;
  rating: number;
  urlAvt: string;
}

const StudentCourseCard: React.FC<StudentCourseCardProps> = ({
  courseName,
  category,
  price,
  startTime,
  lectures,
  rating,
  urlAvt,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 w-auto h-auto">
      {/* Course Image */}
      <div className="w-full h-40 relative">
        <Image
          src={urlAvt} // Use urlAvt for the image source
          alt={courseName}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>

      {/* Course Details */}
      <div className="p-4">
        {/* Course Name */}
        <h3 className="text-lg font-bold mb-1">{courseName}</h3>
        {/* Category */}
        <p className="text-sm text-gray-500 mb-2">
          <strong>Category:</strong> {category}
        </p>
        {/* Start Time */}
        <p className="text-sm text-gray-500 mb-2">
          <strong>Start Time:</strong> {new Date(startTime).toLocaleDateString()}
        </p>
        {/* Number of Lectures */}
        <p className="text-sm text-gray-500 mb-2">
          <strong>Lectures:</strong> {lectures}
        </p>
        {/* Ratings */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
          <span className="text-gray-600 text-sm ml-2">({rating} Stars)</span>
        </div>
        {/* Price */}
        <p className="text-xl font-bold mt-2">
          {price === 0 ? "Free" : `$${price.toFixed(2)}`}
        </p>
      </div>
    </div>
  );
};

export default StudentCourseCard;