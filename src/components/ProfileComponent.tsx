"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@/types/User";
import { BASE_URL_USER_SERVICE } from "@/utils/BaseURL";

export default function ProfileComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);
  const [previewCV, setPreviewCV] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    gender: "",
    imageAvt: null as File | null,
    cvFile: null as File | null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch(BASE_URL_USER_SERVICE + "/own", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("refresh_token"),

      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setFormData({
          userName: data.user.userName || "",
          email: data.user.email || "",
          phoneNumber: data.user.phoneNumber || "",
          birthday: data.user.birthday || "",
          gender: data.user.gender || "",
          imageAvt: null,
          cvFile: null,
        });
      })
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  const handleUpdateProfile = async () => {
    const form = new FormData();
    form.append("userName", formData.userName);
    form.append("email", formData.email);
    form.append("phoneNumber", formData.phoneNumber);
    if (formData.birthday) form.append("birthday", formData.birthday);
    if (formData.gender) form.append("gender", formData.gender);
    if (formData.imageAvt) form.append("imageAvt", formData.imageAvt);
    if (formData.cvFile) form.append("cvFile", formData.cvFile);

    try {
      const response = await fetch(BASE_URL_USER_SERVICE, {
        method: "PUT",
        credentials: "include",
        body: form,
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("refresh_token"),

        }
      });

      if (response.status === 204) {
        alert("Profile updated successfully");
        setShowModal(false);
        window.location.reload();
        return;
      }

      const data = await response.json();

      if (data.status === "success") {
        alert("Profile updated successfully");
        setShowModal(false);
        window.location.reload();
      } else {
        const extractedErrors: { [key: string]: string } = {};
        if (Array.isArray(data.errors)) {
          data.errors.forEach(
            (err: {
              field: string;
              defaultMessage?: string;
              message?: string;
            }) => {
              const field = err.field || "";
              const message =
                err.defaultMessage || err.message || "Validation error";
              extractedErrors[field] = message;
            }
          );
        } else if (typeof data.errors === "string") {
          extractedErrors.general = data.errors;
        }
        setErrors(extractedErrors);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  if (!user) return null;

  return (
    <div className="p-4 mt-auto text-center">
      <div
        className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-700 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <img
          src={
            user.urlImage ||
            "https://khoi-dev-ktpm.s3.ap-southeast-1.amazonaws.com/default-icon.png"
          }
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-600"
        />
        <span className="text-base font-medium text-white">
          {user.userName}
        </span>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              onClick={() => {
                setShowModal(false);
                setEditMode(false);
                setErrors({});
              }}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              {editMode ? "Edit Profile" : "User Information"}
            </h2>

            {/* Avatar upload */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="relative">
                <img
                  src={
                    previewAvatarUrl || user.urlImage || "/default-avatar.png"
                  }
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                {editMode && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreviewAvatarUrl(URL.createObjectURL(file)); // Chỉ preview
                        setFormData({ ...formData, imageAvt: file }); // Lưu file gốc
                      }
                    }}
                    className="absolute top-0 left-0 w-24 h-24 opacity-0 cursor-pointer"
                    title="Change Avatar"
                  />
                )}
              </div>
            </div>

            {!editMode ? (
              <div className="space-y-4 text-gray-700 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{user.email || "Not updated"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{user.phoneNumber || "Not updated"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Birthday:</span>
                  <span>
                    {user.birthday
                      ? new Date(user.birthday).toLocaleDateString()
                      : "Not updated"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Gender:</span>
                  <span>{user.gender || "Not updated"}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Editable form fields */}
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium">Username</label>
                  <input
                    type="text"
                    value={formData.userName}
                    onChange={(e) =>
                      setFormData({ ...formData, userName: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-xs">{errors.userName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Birthday */}
                <div>
                  <label className="block text-sm font-medium">Birthday</label>
                  <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) =>
                      setFormData({ ...formData, birthday: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Upload CV */}
                <div>
                  <label className="block text-sm font-medium">CV File</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreviewCV(URL.createObjectURL(file)); // Chỉ preview
                        setFormData({ ...formData, cvFile: file }); // Lưu file gốc
                      }
                    }}
                    className="w-full mt-1"
                  />
                </div>

                {previewCV && (
                  <div className="mt-4">
                    <iframe
                      src={previewCV}
                      className="w-full h-64 border rounded-md"
                      title="CV Preview"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition"
                >
                  Update Profile
                </button>
              ) : (
                <button
                  onClick={handleUpdateProfile}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition"
                >
                  Save Changes
                </button>
              )}

              <Link
                href="/signout"
                className="w-full bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg transition"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
