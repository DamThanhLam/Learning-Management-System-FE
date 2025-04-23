import React from 'react'

interface BuyCourseCardProps {
  urlAvt: string
  price: number
  onAddToCart: () => void
  onBuyNow: () => void
}

export default function BuyCourseCard({
  urlAvt,
  price,
  onAddToCart,
  onBuyNow
}: BuyCourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-sm">
      <img
        src={urlAvt}
        alt="Course Avatar"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <p className="text-3xl font-bold text-green-600 mb-5">
        ${price?.toFixed(2) || '0.00'}
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full mb-3 transition-all duration-300"
        onClick={onAddToCart}>
        Add To Cart
      </button>
      <button
        className="bg-black text-white px-4 py-3 rounded-lg shadow-md hover:bg-gray-800 w-full transition-all duration-300"
        onClick={onBuyNow}>
        Buy Now
      </button>
    </div>
  )
}
