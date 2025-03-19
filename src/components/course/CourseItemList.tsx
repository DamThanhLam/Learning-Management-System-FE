// components/CourseList.tsx
import React from 'react';
import CourseItem from './CourseItem';

interface Course {
  id: string;
  name: string;
  description: string;
}

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div>
      <h2>Available Courses</h2>
      <div>
        {courses.map((course) => (
          <CourseItem
            key={course.id}
            id={course.id}
            name={course.name}
            description={course.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
