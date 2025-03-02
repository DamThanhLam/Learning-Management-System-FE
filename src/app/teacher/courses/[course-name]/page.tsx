// pages/courses.tsx

import CourseCard from "@/components/course/CourseCard";

interface Course {
  title: string;
  price: string;
  chapters: number;
  orders: number;
  certificates: number;
  reviews: number;
  addedToShelf: number;
}

const Courses: React.FC = () => {
  const courses: Course[] = [
    {
      title: "Beginner's Guide to Design",
      price: "$0.00",
      chapters: 13,
      orders: 254,
      certificates: 25,
      reviews: 25,
      addedToShelf: 500,
    },
    {
      title: "Beginner's Guide to Design",
      price: "$50.00",
      chapters: 13,
      orders: 254,
      certificates: 25,
      reviews: 25,
      addedToShelf: 500,
    },
    {
      title: "Spring boot",
      price: "$50.00",
      chapters: 13,
      orders: 254,
      certificates: 25,
      reviews: 25,
      addedToShelf: 500,
    },
  ];

  return (

    <div className="grid grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          title={course.title}
          price={course.price}
          chapters={course.chapters}
          orders={course.orders}
          certificates={course.certificates}
          reviews={course.reviews}
          addedToShelf={course.addedToShelf}
        />
      ))}
    </div>
  );
};

export default Courses;