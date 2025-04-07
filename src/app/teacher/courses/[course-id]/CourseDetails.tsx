import { BASE_URL_COURSE_SERVICE } from "@/utils/BaseURL";
import functional from "@/utils/functional";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
interface Course {
  id: string;
  courseName: string;
  description: string;
  price: number;
  category: string;
  level: 'BEGINNER' | 'MIDDLE' | 'MASTER'; // Có thể mở rộng enum nếu cần
  status: 'OPEN' | 'DRAFT'; // Giả định thêm các trạng thái có thể có
  countLectures: number;
  countOrders: number;
  countReviews: number;
  totalReview: number;
  studentsId: string[];
  teacherId: string;
  teacherName: string;
  urlAvt: string;
}
const CourseDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"description" | "faqs">("description");
  const [course, setCourse] = useState<Course>()
  const params = useParams();
  const courseId = params["course-id"] as string;
  const [edit, setEdit] = useState(false)
  const [price, setPrice] = useState<any>(0)
  const [changed, setChanged] = useState(false)
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(BASE_URL_COURSE_SERVICE + "?id=" + courseId, {
      credentials: 'include',
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        setCourse(data)
        setPrice(data.price)
      })
      .catch(e => alert(e.message))
  }, [courseId])

  
  return (
    <div className="min-h-screen flex">
      {/* Content Area */}
      <div className="flex-1 overflow-auto">

        <div className="bg-white p-6 rounded-md shadow-sm relative">
          <button className="flex items-center gap-1 text-blue-600 absolute top-1 right-1"
            onClick={() => {
              setEdit(!edit)
            }}
          >
            <PencilSquareIcon className="w-5 h-5" />
            Edit
          </button>

          {/* Row 1: Course Name & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                disabled={!edit}
                type="text"
                defaultValue={course?.courseName}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                onChange={(e) => {
                  if (changed) setChanged(true)
                  setCourse({ ...(course as Course), courseName: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price(VNĐ)
              </label>
              <input
                disabled={!edit}
                type="text"
                value={course?.price}

                onChange={(e) => {
                  if (changed) setChanged(true)
                  setCourse({ ...(course as Course), price: Number(e.target.value) });
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Category & Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                disabled={!edit}
                value={course?.category}
                defaultValue={course?.category}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                onChange={(e) => {
                  if (changed) setChanged(true)
                  setCourse({ ...(course as Course), category: e.target.value });
                }}
              >
                <option value="Java">Java</option>
                <option value="Programming">Programming</option>
                <option value="Python">Python</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                disabled={!edit}
                value={course?.level}
                defaultValue={course?.level}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                onChange={(e) => {
                  if (changed) setChanged(true);

                  const newLevel = e.target.value as "BEGINNER" | "MIDDLE" | "MASTER";  // Ép kiểu một cách an toàn

                  if (["BEGINNER", "MIDDLE", "MASTER"].includes(newLevel)) {
                    setCourse({
                      ...(course as Course),
                      level: newLevel,
                    });
                  }
                }}
              >
                <option value="BEGINNER">Beginner</option>
                <option value="MIDDLE">Middle</option>
                <option value="MASTER">Master</option>
              </select>
            </div>
          </div>

          {/* Upload Intro Video */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Intro Video (mov, mp4 - max 10MB)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center p-6 text-gray-500 cursor-pointer hover:border-gray-400">
              Drag and drop files, or <span className="text-blue-600 ml-1">Browse</span>
            </div>
          </div>

          {/* Upload Intro Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Intro Image (jpg, png - max 5MB)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center p-6 text-gray-500 cursor-pointer hover:border-gray-400">
              Drag and drop files, or <span className="text-blue-600 ml-1">Browse</span>
            </div>
          </div>

          {/* Tabs: Description | FAQ's */}
          <div className="mb-4">
            <div className="flex space-x-6 border-b mb-2">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-2 ${activeTab === "description"
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Description
              </button>
              {/* <button
                  onClick={() => setActiveTab("faqs")}
                  className={`pb-2 ${
                    activeTab === "faqs"
                      ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  FAQ's
                </button> */}
            </div>

            {/* Content for each tab */}
            {activeTab === "description" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paragraph
                </label>
                <textarea
                  disabled={!edit}
                  rows={5}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                  placeholder="Enter course description here..."
                  defaultValue={course?.description}
                />
              </div>
            )}
            {activeTab === "faqs" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FAQ's
                </label>
                <textarea
                  rows={5}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                  placeholder="Enter frequently asked questions..."
                />
              </div>
            )}
          </div>

          {/* Add Button */}
          <div className="mt-6">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Update
            </button>
            <button className="px-4 py-2 bg-red-400 text-white rounded-md ml-4">
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-medium mb-4">You have unsaved changes!</h3>
            <p className="mb-4">Are you sure you want to leave without saving?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => {}}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={() => {}}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
