// components/CourseCard.tsx
import Image from 'next/image'
import { useState } from 'react'

export interface CourseCardProps {
  title: string
  author: string
  rating: number
  ratingCount: number
  price: number
  urlAvt: string
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
</svg>`

const toBase64 = (str: string) => (typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str))

export default function CourseCard({ title, author, rating, ratingCount, price, urlAvt }: CourseCardProps) {
  const [imageError, setImageError] = useState(false)
  const defaultImage = '/course-default.jpg'

  // Chuyển đổi giá tiền sang format VND
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

  // Tính số sao (rating từ 0-5)
  const stars = Math.min(Math.max(rating, 0), 5)
  const fullStars = '★'.repeat(Math.floor(stars))
  const emptyStars = '☆'.repeat(5 - Math.floor(stars))

  const handleImageError = () => {
    console.log('Image failed to load:', urlAvt)
    setImageError(true)
  }

  const imageUrl = urlAvt && urlAvt.trim() !== '' ? urlAvt : defaultImage

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative w-full h-40 bg-gray-100">
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{title}</h3>
        <p className="text-xs text-gray-500">By {author}</p>
        <div className="flex items-center text-sm text-yellow-500 space-x-1">
          <span>
            {fullStars}
            {emptyStars}
          </span>
          <span className="text-gray-500 text-xs">({ratingCount} Ratings)</span>
        </div>
        <div className="text-sm font-semibold text-blue-600">{formattedPrice}</div>
      </div>
    </div>
  )
}
