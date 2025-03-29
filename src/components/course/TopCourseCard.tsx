import Image from "next/image";

interface TopCourseCardProps {
  courseName: string;
  teacherName: string;
  price: string;
  overallReview: number;
  countReviews: number;
  avaUrl: string;
}

export default function TopCourseCard({ courseName, teacherName, price, overallReview, countReviews, avaUrl }: TopCourseCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 text-center shadow-md w-64 h-80 flex flex-col justify-between">
      <Image
        src={avaUrl}
        alt={courseName}
        className="w-full h-32 object-cover rounded-md"
        width={256}
        height={128}
      />
      <div>
        <h3 className="text-lg font-semibold mt-2">{courseName}</h3>
        <p className="text-gray-500">By {teacherName}</p>
        <p className="text-yellow-500 mt-2">
          {"⭐".repeat(Math.round(overallReview))} {overallReview}
          <span className="block text-yellow-500 mt-1">({countReviews} Reviews)</span>
        </p>
      </div>
      <p className="text-gray-500 mt-1">{price}</p>
    </div>
  );
}