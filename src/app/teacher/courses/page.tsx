"use client"

import CourseCard from "@/components/course/CourseCard";
import { BASE_URL_COURSE_SERVICE } from "@/utils/BaseURL";
import { useEffect, useState } from "react";
interface Course {
  id: string,
  courseName: string,
  price: number,
  countLectures: number,
  countOrders: number,
  countReviews: number
}
export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    fetch(BASE_URL_COURSE_SERVICE + "/teacher?pageSize=5000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("access_token"),

      },
      credentials: "include",
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.code === 200) {
          setCourses(data.data)
        }
        else alert("Error: " + data.message)
      }).catch(e => {
        alert("Error: " + e)
      })
  }, [])

  return (
    <div className="flex-1 p-6 h-screen overflow-y-auto no-scrollbar">
      <main className="bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Courses</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-5"
          onClick={()=>{
            window.location.href+="/create-course"
          }}
          >Add Course</button>
        </div>

        <div className="flex flex-row flex-wrap  gap-4">

          {courses.map((course, index) => {
            return (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.courseName}
                price={course.price}
                chapters={course.countLectures}
                orders={course.countOrders}
                reviews={course.countReviews}
              />
            )
          })}
        </div>
      </main>
    </div>
  );
}
