import Image from "next/image";

interface TopReviewCardProps {
  userName: string;
  content: string;
  avaUrl: string;
}

export default function TopReviewCard({ userName, content, avaUrl }: TopReviewCardProps) {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-md text-center">
      <div className="flex justify-center mb-4">
        <Image
          src={avaUrl}
          alt={userName}
          className="w-16 h-16 object-cover rounded-full"
          width={64}
          height={64}
        />
      </div>
      <p className="text-gray-600 italic mb-4">"{content}"</p>
      <h4 className="text-lg font-semibold">{userName}</h4>
    </div>
  );
}