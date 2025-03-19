// components/CourseItem.tsx
import React from 'react';
import Link from 'next/link';

interface CourseItemProps {
  id: string;
  name: string;
  description: string;
}

const CourseItem: React.FC<CourseItemProps> = ({ id, name, description }) => {
  return (
    <div className="course-item">
      <h3>{name}</h3>
      <p>{description}</p>
      <Link href={`/courses/${id}`}>
        <a>View Details</a>
      </Link>
    </div>
  );
};

export default CourseItem;
