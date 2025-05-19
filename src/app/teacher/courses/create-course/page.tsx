"use client";
import React, {
  useState,
  useRef,
  DragEvent,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import DescriptionEditor from "@/components/DescriptionEditor";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BASE_URL_COURSE_SERVICE } from "@/utils/BaseURL";

const API_URL = "/api/courses";

const CourseDetails: React.FC = () => {

  //initial
  const [categories, setCategories] = useState([])

  // --- Form state ---
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [addCategory, setAddCategory] = useState(false);

  // --- Intro Image ---
  const [introImage, setIntroImage] = useState<string | null>(null);
  const [introImageFile, setIntroImageFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  // --- Intro Video ---
  const [introVideo, setIntroVideo] = useState<string | null>(null);
  const [introVideoFile, setIntroVideoFile] = useState<File | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 10MB
  const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];

  // --- Validation errors ---
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  //initial
  useEffect(() => {
    fetch(BASE_URL_COURSE_SERVICE + "/get-all-categories", {
      credentials: 'include',
      method: "GET"
    }).then(res => res.json())
      .then(data => setCategories(data.data))
  }, [])

  // --- Handlers for Image ---
  const handleImageFile = (file: File) => {
    setUploadError(null);
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setUploadError("Chỉ chấp nhận JPEG hoặc PNG.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setUploadError("Kích thước tối đa 5MB.");
      return;
    }
    setIntroImage(URL.createObjectURL(file));
    setIntroImageFile(file);
  };
  const handleDropImage = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleImageFile(e.target.files[0]);
  };

  // --- Handlers for Video ---
  const handleVideoFile = (file: File) => {
    setVideoError(null);
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      setVideoError("Chỉ chấp nhận MP4, MOV, WEBM.");
      return;
    }
    if (file.size > MAX_VIDEO_SIZE) {
      setVideoError("Kích thước tối đa 50MB.");
      return;
    }
    setIntroVideo(URL.createObjectURL(file));
    setIntroVideoFile(file);
  };
  const handleDropVideo = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleVideoFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleVideoFile(e.target.files[0]);
  };

  // --- Submit handler ---
  const handleSubmit = async (e: FormEvent, status: string) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate
    if (!courseName.trim()) newErrors.courseName = "Course name is required";
    const priceNum = Number(coursePrice);
    if (!coursePrice || isNaN(priceNum) || priceNum <= 0)
      newErrors.coursePrice = "Enter a valid price > 0";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!level.trim()) newErrors.level = "Level is required";
    if (!description.trim())
      newErrors.description = "Description is required";
    if (!introImageFile) newErrors.introImage = "Intro image is required";
    if (!introVideoFile) newErrors.introVideo = "Intro video is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Build FormData
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("price", coursePrice);
    formData.append("category", category);
    formData.append("status", status.toLocaleUpperCase());
    formData.append("level", level.toLocaleUpperCase());
    formData.append("description", description);
    if (introImageFile) formData.append("fileAvt", introImageFile);
    if (introVideoFile) formData.append("videoIntro", introVideoFile);

    // POST to API
    try {
      const res = await fetch(BASE_URL_COURSE_SERVICE + "/add-course", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create course");
      }
      alert("Course created successfully!");
      window.location.href="/teacher/courses"
      // TODO: redirect or reset form
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  return (
    <div className="flex h-screen overflow-y-auto no-scrollbar">
      <main className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button className="mr-2"
            onClick={() => {
              window.location.href = "/teacher/courses"
            }
            }
          >⬅️ Back</button>
          <div>
            <button
              onClick={(e) => { handleSubmit(e,"OPEN" ) }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Publish
            </button>
            <button
              onClick={(e) => { handleSubmit(e, "DRAFT")}}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-700 ml-10"
            >
              Draft
            </button>
          </div>
        </div>

        <form className="flex">
          {/* Left */}
          <div className="w-3/4 bg-white p-6 rounded-lg shadow mr-6">
            {/* Course Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Course Name
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full border p-2 rounded"
              />
              {errors.courseName && (
                <p className="text-red-500 text-sm">{errors.courseName}</p>
              )}
            </div>

            {/* Intro Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Upload Intro Image
              </label>
              <div
                className="border-2 border-dashed border-gray-300 p-6 text-center rounded cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropImage}
                onClick={() => fileInputRef.current?.click()}
              >
                {introImage ? (
                  <img
                    src={introImage}
                    alt="Intro"
                    className="mx-auto max-h-48"
                  />
                ) : (
                  <>
                    <p>
                      Drag & drop, or{" "}
                      <span className="text-blue-500 underline">Browse</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      JPEG, PNG (≤ 5MB)
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageChange}
                className="hidden"
              />
              {uploadError && (
                <p className="text-red-500 text-sm">{uploadError}</p>
              )}
              {errors.introImage && (
                <p className="text-red-500 text-sm">{errors.introImage}</p>
              )}
            </div>

            {/* Intro Video */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Upload Intro Video
              </label>
              <div
                className="border-2 border-dashed border-gray-300 p-6 text-center rounded cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropVideo}
                onClick={() => videoInputRef.current?.click()}
              >
                {introVideo ? (
                  <video
                    src={introVideo}
                    controls
                    className="mx-auto max-h-48"
                  />
                ) : (
                  <>
                    <p>
                      Drag & drop, or{" "}
                      <span className="text-blue-500 underline">Browse</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      MP4, MOV, WEBM (≤ 50MB)
                    </p>
                  </>
                )}
              </div>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/webm"
                onChange={handleVideoChange}
                className="hidden"
              />
              {videoError && (
                <p className="text-red-500 text-sm">{videoError}</p>
              )}
              {errors.introVideo && (
                <p className="text-red-500 text-sm">{errors.introVideo}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">

              <DescriptionEditor
                value={description}
                onChange={setDescription}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="w-1/4 bg-white p-6 rounded-lg shadow">
            {/* Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Course Price(USD)
              </label>
              <input
                type="text"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="w-full border p-2 rounded"
              />
              {errors.coursePrice && (
                <p className="text-red-500 text-sm">{errors.coursePrice}</p>
              )}
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Category
              </label>
              {!addCategory ? (
                <div className="flex">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">-- Chọn category --</option>
                    {categories && categories.map((item) => {
                      return (
                        <option value={item}>{item}</option>
                      );
                    })}
                    {/* <option value="Java">Java</option>
                    <option value="Programming">Programming</option>
                    <option value="Python">Python</option> */}
                  </select>
                  <button
                    type="button"
                    className="px-2 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
                    onClick={() => setAddCategory(true)}
                  >
                    <AiOutlinePlus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <input
                    type="text"
                    placeholder="New category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                  <button
                    type="button"
                    className="px-2 py-2 bg-blue-500 text-white rounded-md flex items-center"
                    onClick={() => setAddCategory(false)}
                  >
                    <AiOutlineMinus className="w-4 h-4" />
                  </button>
                </div>
              )}
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            {/* Level */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">-- Chọn level --</option>
                <option value="BEGINNER">BEGINNER</option>
                <option value="MIDDLE">MIDDLE</option>
                <option value="MASTER">MASTER</option>
              </select>
              {errors.level && (
                <p className="text-red-500 text-sm">{errors.level}</p>
              )}
            </div>

            {serverError && (
              <p className="text-red-500 text-sm mt-4">{serverError}</p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default CourseDetails;
