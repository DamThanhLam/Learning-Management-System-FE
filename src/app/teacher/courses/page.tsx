import CourseCard from "@/components/course/CourseCard";

export default function Courses() {
  const courses = [
    { title: "Beginner’s Guide to Design", price: "$0.00", chapters: 13, orders: 254, certificates: 25, reviews: 25, shelf: 500 },
    { title: "Beginner’s Guide to Design", price: "$0.00", chapters: 13, orders: 254, certificates: 25, reviews: 25, shelf: 500 },
    { title: "Spring Boot", price: "$50.00", chapters: 13, orders: 254, certificates: 25, reviews: 25, shelf: 500 },
    { title: "Beginner’s Guide to Design", price: "$0.00", chapters: 13, orders: 254, certificates: 25, reviews: 25, shelf: 500 },
    { title: "Beginner’s Guide to Design", price: "$0.00", chapters: 13, orders: 254, certificates: 25, reviews: 25, shelf: 500 },
    { title: "Spring Boot", price: "$50.00", chapters: 13, orders: 254, certificates: 25, reviews: 25, shelf: 500 }
  ];

  return (
    <div className="flex">
      <main className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Courses</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Course</button>
        </div>

        <div className="flex flex-wrap  gap-4">

          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              price={course.price}
              chapters={course.chapters}
              orders={course.orders}
              certificates={course.certificates}
              reviews={course.reviews}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
