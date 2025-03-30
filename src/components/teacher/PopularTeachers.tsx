"use client";

import Link from "next/link"; 
import TeacherCard from "./TeacherCard";

const teachers = [
  { id: 1, name: "Alice Johnson", expertise: "UI/UX Design", rating: 4.9, students: 3000, urlAva: "https://picsum.photos/200" },
  { id: 2, name: "David Smith", expertise: "Full-Stack Development", rating: 4.8, students: 4500, urlAva: "https://picsum.photos/200" },
  { id: 3, name: "Emma Brown", expertise: "Machine Learning", rating: 4.7, students: 2800, urlAva: "https://picsum.photos/200" },
  { id: 4, name: "Michael Lee", expertise: "Cybersecurity", rating: 4.9, students: 3200, urlAva: "https://picsum.photos/200" },
  { id: 5, name: "Sophia Wilson", expertise: "Cloud Computing", rating: 4.6, students: 2500, urlAva: "https://picsum.photos/200" },
];

export default function PopularTeachers() {
  return (
    <div className="mt-10 bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Popular Teachers</h2>

      {/* Evenly Spaced Teacher Cards */}
      <div className="flex flex-wrap justify-between gap-4">
        {teachers.map((teacher) => (
          <Link
            key={teacher.id}
            href={`/teachers/${teacher.id}`} // Dynamic route for teacher detail page
            className="flex-1 min-w-[200px] max-w-[250px] block hover:shadow-lg transition-shadow duration-200"
          >
            <TeacherCard {...teacher} />
          </Link>
        ))}
      </div>
    </div>
  );
}