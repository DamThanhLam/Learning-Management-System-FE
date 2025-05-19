// components/ReviewCard.tsx
import Image from 'next/image'

type ReviewCardProps = {
  userName: string
  review: number
  urlAvt: string
  content: string
}

export default function ReviewCard({ userName, review, urlAvt, content }: ReviewCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      <div className="flex gap-4 p-4">
        <Image src={urlAvt} alt={userName} width={120} height={80} className="w-32 h-20 object-cover rounded" />
        <div className="flex-1">
          <p className="text-xs text-gray-500">By {userName}</p>
          <div className="flex items-center text-sm text-yellow-500 space-x-1 mt-1">
            <span>{'★'.repeat(review)}</span>
          </div>
          <p className="text-sm text-gray-700 mt-2">{content}</p>
        </div>
      </div>
    </div>
  )
}
