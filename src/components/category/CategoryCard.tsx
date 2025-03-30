
import React from "react";

interface CategoryCardProps {
  name: string;
  courses: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, courses }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg text-center">
      <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-blue-600 text-lg font-bold">{name[0]}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600">{courses} Courses</p>
    </div>
  );
};

export default CategoryCard;