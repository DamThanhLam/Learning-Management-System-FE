import Image from "next/image";

interface TopTeacherCardProps {
  name: string;
  expertise: string;
  overallReview: number;
  avaUrl: string;
}

export default function TopTeacherCard({ name, expertise, overallReview, avaUrl }: TopTeacherCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 text-center shadow-md w-56 h-72 flex flex-col items-center">
      <Image
        src={avaUrl}
        alt={name}
        className="w-20 h-20 object-cover rounded-full mb-2"
        width={80}
        height={80}
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500 text-sm mt-1">{expertise}</p>
        <p className="text-yellow-500 mt-2">
          {"⭐".repeat(Math.round(overallReview))} {overallReview}
        </p>
      </div>
    </div>
  );
}