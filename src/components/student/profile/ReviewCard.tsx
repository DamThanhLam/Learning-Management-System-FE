// components/ReviewCard.tsx
import Image from "next/image";

type ReviewCardProps = {
  courseTitle: string;
  author: string;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  reviewText: string;
};

export default function ReviewCard({
  courseTitle,
  author,
  rating,
  ratingCount,
  imageUrl,
  reviewText,
}: ReviewCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      <div className="flex gap-4 p-4">
        <Image
          src={imageUrl}
          alt={courseTitle}
          width={120}
          height={80}
          className="w-32 h-20 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{courseTitle}</h3>
          <p className="text-xs text-gray-500">By {author}</p>
          <div className="flex items-center text-sm text-yellow-500 space-x-1 mt-1">
            <span>{"★".repeat(rating)}</span>
            <span className="text-gray-500 text-xs">({ratingCount} Ratings)</span>
          </div>
          <p className="text-sm text-gray-700 mt-2">{reviewText}</p>
        </div>
      </div>
    </div>
  );
}
