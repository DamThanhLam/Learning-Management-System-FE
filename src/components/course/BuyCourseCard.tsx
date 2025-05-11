import React from 'react'

interface BuyCourseCardProps {
  urlAvt: string
  price: number
  purchased: boolean // New prop to indicate if the course is purchased
  onAddToCart: () => void
  onBuyNow: () => void
  onLearnNow: () => void // Callback for "Learn Now" button
}

export default function BuyCourseCard({ urlAvt, price, purchased, onAddToCart, onBuyNow, onLearnNow }: BuyCourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-sm">
      <img src={urlAvt} alt="Course Avatar" className="w-full h-48 object-cover rounded-lg mb-4" />
      <p className="text-3xl font-bold text-green-600 mb-5">${price?.toFixed(2) || '0.00'}</p>
      {purchased ? (
        <>
          <p className="text-green-500 font-semibold mb-3">You have owned this course already</p>
          <button className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full transition-all duration-300" onClick={onLearnNow}>
            Learn Now
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full mb-3 transition-all duration-300"
            onClick={onAddToCart}>
            Add To Cart
          </button>
          <button className="bg-black text-white px-4 py-3 rounded-lg shadow-md hover:bg-gray-800 w-full transition-all duration-300" onClick={onBuyNow}>
            Buy Now
          </button>
        </>
      )}
    </div>
  )
}
