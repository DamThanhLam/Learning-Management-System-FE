"use client";
import React, { useState, useRef, DragEvent, ChangeEvent } from "react";

import DescriptionEditor from "@/components/DescriptionEditor";

// =====================================================

const CourseDetails: React.FC = () => {
  // State cho form
  const [courseName, setCourseName] = useState("Spring Boot");
  const [coursePrice, setCoursePrice] = useState("$199.00");
  const [category, setCategory] = useState("Java");
  const [level, setLevel] = useState("Beginner");

  // State cho Upload Intro Image
  const [introImage, setIntroImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_SIZE = 15 * 1024 * 1024; // 15MB

  // Xử lý drag & drop và file change
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadError(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Kiểm tra định dạng
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setUploadError("Chỉ chấp nhận file JPEG hoặc PNG.");
      return;
    }
    // Kiểm tra kích thước
    if (file.size > MAX_SIZE) {
      setUploadError("Kích thước file tối đa 15MB.");
      return;
    }
    // Tạo URL từ file
    const imageURL = URL.createObjectURL(file);
    setIntroImage(imageURL);
  };

  

  // Lưu
  const handleSave = () => {
    
    alert("Course details saved!");
  };

  // Publish
  const handlePublish = () => {
    console.log("Publishing course...");
    alert("Course published!");
  };

  return (
    // Thêm scroll ngoài cùng bằng cách dùng h-screen và overflow-y-auto
    <div className="flex h-screen overflow-y-auto no-scrollbar">

      <main className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button className="mr-2">⬅️ Back</button>
          </div>
          <div>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handlePublish}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Left Section: Course Name, Upload Intro Image, Description */}
          <div className="w-3/4 bg-white p-6 rounded-lg shadow mr-6">
            {/* Course Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Course Name
              </label>
              <input
                placeholder="Enter course name"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Upload Intro Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Upload Intro Image
              </label>
              <div
                className="border-2 border-dashed border-gray-300 p-6 text-center rounded cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {introImage ? (
                  <img
                    src={introImage}
                    alt="Uploaded Intro"
                    className="mx-auto max-h-48"
                  />
                ) : (
                  <>
                    <p>
                      Drag and drop files, or{" "}
                      <span className="text-blue-500 underline">Browse</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Thumbnail in JPEG, PNG (largest 15M)
                    </p>
                    {uploadError && (
                      <p className="text-sm text-red-500">{uploadError}</p>
                    )}
                  </>
                )}
                <input
                  placeholder="Enter course name"
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Description */}
            <DescriptionEditor/>
          </div>

          {/* Right Section: Price, Category, Level */}
          <div className="w-1/4 bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Course Price
              </label>
              <input
                placeholder="Enter course price"
                type="text"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Category
              </label>
              <input
                placeholder="Enter category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                title="Select level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
