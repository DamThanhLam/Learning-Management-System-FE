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
import { useParams } from "next/navigation";

interface Course {
  id: string;
  courseName: string;
  description: string;
  price: number;
  category: string;
  level: "BEGINNER" | "MIDDLE" | "MASTER";
  status: "OPEN" | "DRAFT";
  countLectures: number;
  countOrders: number;
  countReviews: number;
  totalReview: number;
  studentsId: string[] | null;
  teacherId: string;
  teacherName: string;
  urlAvt: string;
  urlIntro: string;
}

const CourseDetails: React.FC = () => {
  const params = useParams();
  const courseId = params["course-id"] as string;

  // --- Data state ---
  const [categories, setCategories] = useState<string[]>([]);
  const [course, setCourse] = useState<Course | null>(null);

  // --- Form state mirror ---
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState<"BEGINNER"|"MIDDLE"|"MASTER">("BEGINNER");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"OPEN"|"DRAFT">("OPEN");
  const [introImage, setIntroImage] = useState<string | null>(null);
  const [introImageFile, setIntroImageFile] = useState<File | null>(null);
  const [introVideo, setIntroVideo] = useState<string | null>(null);
  const [introVideoFile, setIntroVideoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [serverError, setServerError] = useState<string|null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
  const ALLOWED_VIDEO_TYPES = ["video/mp4","video/quicktime","video/webm"];

  // --- Fetch categories + course details ---
  useEffect(() => {
    fetch(BASE_URL_COURSE_SERVICE + "/get-all-categories", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setCategories(data.data))
      .catch(console.error);

    fetch(BASE_URL_COURSE_SERVICE + "?id=" + courseId, {
      credentials: "include",
    })
      .then(res => res.json())
      .then((data: Course) => {
        setCourse(data);
        // populate form state
        setCourseName(data.courseName);
        setCoursePrice(String(data.price));
        setCategory(data.category);
        setLevel(data.level);
        setDescription(data.description);
        setStatus(data.status);
        setIntroImage(data.urlAvt);
        setIntroVideo(data.urlIntro);
      })
      .catch(console.error);
  }, [courseId]);

  // --- Handlers for image/video (giống add UI) ---
  const handleImageFile = (file: File) => {
    if (!["image/jpeg","image/png"].includes(file.type)) {
      setErrors(e => ({...e, introImage: "Chỉ JPEG hoặc PNG."}));
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setErrors(e => ({...e, introImage: "Kích thước ≤5MB."}));
      return;
    }
    setIntroImage(URL.createObjectURL(file));
    setIntroImageFile(file);
    setErrors(e => { const {introImage,...rest}=e; return rest; });
  };
  const handleDropImage = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleImageFile(e.dataTransfer.files[0]);
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleImageFile(e.target.files[0]);
  };

  const handleVideoFile = (file: File) => {
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      setErrors(e => ({...e, introVideo: "Chỉ MP4/MOV/WEBM."}));
      return;
    }
    if (file.size > MAX_VIDEO_SIZE) {
      setErrors(e => ({...e, introVideo: "Kích thước ≤50MB."}));
      return;
    }
    setIntroVideo(URL.createObjectURL(file));
    setIntroVideoFile(file);
    setErrors(e => { const {introVideo,...rest}=e; return rest; });
  };
  const handleDropVideo = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleVideoFile(e.dataTransfer.files[0]);
  };
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleVideoFile(e.target.files[0]);
  };

  // --- Submit handler chung ---
  const handleSubmit = async (e: FormEvent, submitStatus: "OPEN"|"DRAFT") => {
    e.preventDefault();
    const newErr: Record<string,string> = {};
    if (!courseName.trim()) newErr.courseName = "Tên khóa học bắt buộc";
    if (!coursePrice || isNaN(Number(coursePrice)) || Number(coursePrice)<=0)
      newErr.coursePrice = "Giá phải >0";
    if (!category) newErr.category = "Chọn category";
    if (!level) newErr.level = "Chọn level";
    if (!description.trim()) newErr.description = "Nhập mô tả";
    if (!introImage && !introImageFile) newErr.introImage = "Chọn ảnh";
    if (!introVideo && !introVideoFile) newErr.introVideo = "Chọn video";

    setErrors(newErr);
    if (Object.keys(newErr).length) return;

    const formData = new FormData();
    formData.append("id", courseId);
    formData.append("courseName", courseName);
    formData.append("price", coursePrice);
    formData.append("category", category);
    formData.append("status", submitStatus);
    formData.append("level", level);
    formData.append("description", description);
    if (introImageFile) formData.append("fileAvt", introImageFile);
    if (introVideoFile) formData.append("videoIntro", introVideoFile);

    try {
      const res = await fetch(
        BASE_URL_COURSE_SERVICE,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Update failed");
      }
      alert("Cập nhật thành công!");
      window.location.reload();
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-y-auto no-scrollbar">
      <main className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => window.history.back()}>
            ⬅️ Back
          </button>
          <div className="space-x-4">
            <button
              onClick={(e) => handleSubmit(e, "OPEN")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Publish
            </button>
            <button
              onClick={(e) => handleSubmit(e, "DRAFT")}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Draft
            </button>
          </div>
        </div>

        <form className="flex" onSubmit={(e) => handleSubmit(e, status)}>
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
                className="border-2 border-dashed p-6 rounded cursor-pointer text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropImage}
                onClick={() => fileInputRef.current?.click()}
              >
                {introImage ? (
                  <img src={introImage} className="mx-auto max-h-48" />
                ) : (
                  <p>Drag & drop, or <span className="underline">Browse</span></p>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageChange}
                className="hidden"
              />
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
                className="border-2 border-dashed p-6 rounded cursor-pointer text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropVideo}
                onClick={() => videoInputRef.current?.click()}
              >
                {introVideo ? (
                  <video src={introVideo} controls className="mx-auto max-h-48" />
                ) : (
                  <p>Drag & drop, or <span className="underline">Browse</span></p>
                )}
              </div>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/webm"
                onChange={handleVideoChange}
                className="hidden"
              />
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
                Course Price
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">-- Chọn category --</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>
            {/* Level */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
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
              <p className="text-red-500 text-sm">{serverError}</p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default CourseDetails;
