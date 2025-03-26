// components/CourseCard.tsx
import Image from "next/image";

type CourseCardProps = {
  title: string;
  author: string;
  rating: number;
  ratingCount: number;
  imageUrl: string;
};

export default function CourseCard({
  title,
  author,
  rating,
  ratingCount,
  imageUrl,
}: CourseCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={200}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-500">By {author}</p>
        <div className="flex items-center text-sm text-yellow-500 space-x-1">
          <span>★★★★★</span>
          <span className="text-gray-500 text-xs">({ratingCount} Ratings)</span>
        </div>
      </div>
    </div>
  );
}
