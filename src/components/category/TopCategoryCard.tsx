import React from 'react'

interface TopCategoryCardProps {
  name: string
  courses: number
  icon: React.ReactNode
}

export default function TopCategoryCard({ name, courses, icon }: TopCategoryCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 text-center shadow-md">
      <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      {/* <p className="text-sm text-gray-500">{courses} Courses</p> */}
    </div>
  )
}
