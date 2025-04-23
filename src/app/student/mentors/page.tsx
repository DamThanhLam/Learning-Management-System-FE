"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { BASE_URL_USER_SERVICE } from "@/utils/BaseURL";
import { useSearchParams } from "next/navigation";

// Tăng số lượng khóa học mẫu để test phân trang
const mockCourses = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    title: "Beginner's Guide to Design",
    price: "$149.99 (Discounted from $169.99)",
    rating: "4.6 stars (based on 120 reviews)",
    imageUrl: "/course-thumb.jpg",
    instructor: "Ronald Richards",
    category: "Design",
    level: "Beginner",
    duration: "8 hours",
    students: "1.2k students"
}));

const Profile = () => {
    const searchParams = useSearchParams(); // ✅ dùng hook này
    const id = searchParams.get("id"); // 👈 lấy giá trị param từ URL
    const [isClient, setIsClient] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [mentorData, setMentorData] = useState({
        name: "Ronald Richards",
        title: "Web designer, UI/UX Designer, and Teacher",
        followers: 154,
        description: "Ronald Richards is an expert in creating user-centric web designs with over a decade of experience. His passion for design and teaching has helped thousands of students master the art of UI/UX design.",
        about: "Ronald Richards is an expert in creating user-centric web designs with over a decade of experience.",
        expertise: [
            "User Experience Design",
            "Interaction Design",
            "Information Architecture",
            "User Research",
            "Visual Design",
            "Wireframing and Prototyping"
        ],
        experience: "Ronald has a strong background in UI/UX design and has worked on various projects.",
        avatar: "/profile.jpg",
        socialLinks: [
            { icon: "🌐", label: "Website", url: "#" },
            { icon: "🐦", label: "Twitter", url: "#" },
            { icon: "📺", label: "YouTube", url: "#" }
        ]
    });
    const coursesPerPage = 3;

    useEffect(() => {
        setIsClient(true);
        // TODO: Fetch mentor data from API
        const fetchMentorData = async () => {
            try {
                const response = await fetch(BASE_URL_USER_SERVICE + "?id=" + id);
                const data = await response.json();
                // setMentorData(data);
            } catch (error) {
                console.error('Error fetching mentor data:', error);
            }
        };
        fetchMentorData();
    }, [id]);

    // Tính toán số trang
    const totalPages = Math.ceil(mockCourses.length / coursesPerPage);

    // Lấy khóa học cho trang hiện tại
    const getCurrentPageCourses = () => {
        const startIndex = (currentPage - 1) * coursesPerPage;
        return mockCourses.slice(startIndex, startIndex + coursesPerPage);
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex-1 w-full">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column - Main Content */}
                    <div className="w-full md:w-2/3 space-y-6">
                        {/* Header */}
                        <header className="flex flex-col items-start space-y-4 bg-white p-6 rounded-lg">
                            <div className="w-full">
                                <h1 className="text-2xl font-bold mb-4">{mentorData.name}</h1>
                                <p className="text-gray-600 mb-2">{mentorData.title}</p>
                                <p className="text-gray-600 mb-4">Followers: {mentorData.followers}</p>
                                <div className="text-gray-700">
                                    <p className="mb-4">{mentorData.description}</p>
                                    <p>He specializes in creating intuitive and beautiful user interfaces that enhance user experience and drive business growth.</p>
                                </div>
                            </div>
                        </header>

                        {/* About Section */}
                        <section className="bg-white p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-4">About</h2>
                            <p className="text-gray-700">{mentorData.about}</p>
                        </section>

                        {/* Areas of Expertise */}
                        <section className="bg-white p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Areas of Expertise</h2>
                            <ul className="space-y-3">
                                {mentorData.expertise&&mentorData.expertise.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Professional Experience */}
                        <section className="bg-white p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Professional Experience</h2>
                            <p className="text-gray-700">{mentorData.experience}</p>
                        </section>
                    </div>

                    {/* Right Column - Profile Image and Social Links */}
                    <div className="w-full md:w-1/3">
                        <div className="sticky top-6">
                            <div className="bg-white p-6 rounded-lg">
                                <div className="relative w-48 h-48 mx-auto">
                                    <Image
                                        src={mentorData.avatar}
                                        alt={`${mentorData.name}'s Profile Picture`}
                                        fill
                                        className="rounded-full object-cover border-4 border-gray-200"
                                    />
                                </div>
                                <div className="flex flex-col space-y-3 w-48 mx-auto mt-6">
                                    {mentorData.contacts&&mentorData.contacts.map(([label, url], index) => (
                                        <a
                                            key={index}
                                            href={url}
                                            className="flex items-center justify-center space-x-2 text-blue-500 hover:text-blue-700 p-2 border rounded-lg hover:bg-gray-50"
                                        >
                                            {/* <span>{link.icon}</span> */}
                                            <span>{label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More Courses Section - Full Width */}
                <div className="mt-6">
                    <section className="bg-white p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">More Courses by Ronald Richards</h2>
                            <div className="text-sm text-gray-600">
                                Showing {((currentPage - 1) * coursesPerPage) + 1} to {Math.min(currentPage * coursesPerPage, mockCourses.length)} of {mockCourses.length} courses
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getCurrentPageCourses().map((course) => (
                                <div key={course.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                    {/* Course Image */}
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={course.imageUrl}
                                            alt={course.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Course Content */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                                            <span className="text-sm text-gray-500">{course.level}</span>
                                        </div>

                                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>

                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <span className="mr-4">{course.duration}</span>
                                            <span>{course.students}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-bold text-blue-600">{course.price}</p>
                                            <div className="flex items-center">
                                                <span className="text-yellow-400 mr-1">★</span>
                                                <span className="text-sm text-gray-600">{course.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center mt-8 space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-md ${currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                    }`}
                            >
                                Previous
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 rounded-md ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-md ${currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
