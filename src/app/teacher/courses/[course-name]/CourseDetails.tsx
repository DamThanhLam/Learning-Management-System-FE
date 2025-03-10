import React, { useState } from "react";

const CourseDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"description" | "faqs">("description");

  return (
    <div className="min-h-screen flex">
        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-6 border-b pb-2">
              Course Details
            </h2>

            {/* Row 1: Course Name & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  defaultValue="Spring boot"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  defaultValue="$ 199.00"
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
                  defaultValue="Java"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                >
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  defaultValue="Beginner"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Upload Intro Video */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Intro Video (mov, mp4 - max 100MB)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center p-6 text-gray-500 cursor-pointer hover:border-gray-400">
                Drag and drop files, or <span className="text-blue-600 ml-1">Browse</span>
              </div>
            </div>

            {/* Upload Intro Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Intro Image (jpg, png - max 15MB)
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
                  className={`pb-2 ${
                    activeTab === "description"
                      ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("faqs")}
                  className={`pb-2 ${
                    activeTab === "faqs"
                      ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  FAQ's
                </button>
              </div>

              {/* Content for each tab */}
              {activeTab === "description" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paragraph
                  </label>
                  <textarea
                    rows={5}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    placeholder="Enter course description here..."
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
                Add
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CourseDetails;
