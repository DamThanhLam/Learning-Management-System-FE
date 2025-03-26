// components/student/tabs/CoursesTab.tsx
import CourseCard from "@/components/student/profile/CourseCard";

export default function CoursesTab() {
    return (
        <>
            <h1 className="text-2xl font-bold ml-auto mb-4">Courses (12)</h1>
            <div className="flex items-center mb-12">
                <div className="flex items-center space-x-4">
                    <div className="relative border rounded-full border-black w-[600px]">
                        <input
                            type="text"
                            placeholder="Search courses"
                            className="p-2 w-full pl-10 rounded-full"
                        />
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 0 0-4.89 8.25l-2.83 2.83a1 1 0 1 0 1.41 1.41l2.83-2.83A5.5 5.5 0 1 0 9 3.5zm0 1.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    <div className="relative">
                        <select title="Sort" className="border border-black rounded-lg p-4 pr-10 appearance-none">
                            <option>Sort By</option>
                            <option>Relevance</option>
                        </select>
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <button className="border border-black rounded-lg p-4 flex items-center">
                        Filter
                        <span className="ml-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 12H17.5M5 7H20M10 17H15" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </button>
                </div>


            </div>
            <div className="grid grid-cols-4 gap-6">
                {Array(8)
                    .fill(null)
                    .map((_, index) => (
                        <CourseCard key={index} />
                    ))}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
                <button className="text-black">←</button>
                <button className="bg-black text-white px-4 py-2 rounded">1</button>
                <button className="text-black">2</button>
                <button className="text-black">3</button>
                <button className="text-black">→</button>
            </div>
        </>
    );
}