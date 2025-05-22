"use client";

import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { BASE_URL_TEACHER_MANAGEMENT_SERVICE } from "@/utils/BaseURL";
import { checkLogin } from "@/utils/API";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    teacherName: "",
    gender: "MALE",
    birthday: "",
    email: "",
    phoneNumber: "",
    description: "",
    faceImage: null as File | null,
    cvFile: null as File | null,
  });
  useEffect(() => {
    checkLogin().then(data => {
      window.location.href = "/"
    })
  }, [])
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("teacherName", formData.teacherName);
    form.append("gender", formData.gender);
    form.append("birthday", formData.birthday);
    form.append("email", formData.email);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("description", formData.description);
    if (formData.faceImage) {
      form.append("faceImage", formData.faceImage);
    }
    if (formData.cvFile) {
      form.append("cvFile", formData.cvFile);
    }

    try {
      const response = await fetch(
        BASE_URL_TEACHER_MANAGEMENT_SERVICE + "/require-create-teacher-account",
        {
          method: "POST",
          body: form,
        }
      );

      if (response.ok) {
        alert("Submit thành công!");
      } else {
        const errorData = await response.json();
        alert(`Submit thất bại: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Submit thất bại!");
    }
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#000000",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        Request to create teacher account
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#000000",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Name
          </label>
          <input
            name="teacherName"
            type="text"
            placeholder="XXXXXX"
            value={formData.teacherName}
            onChange={handleInputChange}
            style={{
              width: "100%",
              border: "1px solid #E2E8F0",
              borderRadius: "4px",
              padding: "8px",
              background: "#FFFFFF",
            }}
          />
        </div>

        {/* Gender */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#000000",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            style={{
              width: "100%",
              border: "1px solid #E2E8F0",
              borderRadius: "4px",
              padding: "8px",
              background: "#FFFFFF",
            }}
          >
            <option value="MALE">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Birth */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#000000",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Birth
          </label>
          <input
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleInputChange}
            style={{
              width: "100%",
              border: "1px solid #E2E8F0",
              borderRadius: "4px",
              padding: "8px",
              background: "#FFFFFF",
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#000000",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="XXXXXX"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: "100%",
              border: "1px solid #E2E8F0",
              borderRadius: "4px",
              padding: "8px",
              background: "#FFFFFF",
            }}
          />
        </div>

        {/* Phone Number */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#000000",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="text"
            placeholder="XXXXXX"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            style={{
              width: "100%",
              border: "1px solid #E2E8F0",
              borderRadius: "4px",
              padding: "8px",
              background: "#FFFFFF",
            }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#000000",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={{
              width: "100%",
              height: "120px",
              border: "1px solid #E2E8F0",
              borderRadius: "4px",
              padding: "8px",
              background: "#FFFFFF",
            }}
          ></textarea>
        </div>

        {/* Upload Face Image */}
        <label htmlFor="face-upload">
          <div
            style={{
              border: "2px dashed #E2E8F0",
              borderRadius: "4px",
              background: "#F7FAFC",
              padding: "16px",
              textAlign: "center",
              marginBottom: "16px",
              cursor: "pointer",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#000000",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              UPLOAD YOUR FACE
            </p>
            <CloudUploadIcon style={{ color: "#3182CE", fontSize: "24px" }} />
            <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#000000",
                marginTop: "8px",
                marginBottom: "4px",
              }}
            >
              Drag and drop files or click to upload
            </p>
            <p style={{ fontSize: "12px", color: "#A0AEC0" }}>
              Upload Thumbnail in JPG, PNG largest 15M
            </p>
          </div>
        </label>
        <input
          id="face-upload"
          name="faceImage"
          type="file"
          accept=".jpg,.png"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Upload CV */}
        <label htmlFor="cv-upload">
          <div
            style={{
              border: "2px dashed #E2E8F0",
              borderRadius: "4px",
              background: "#F7FAFC",
              padding: "16px",
              textAlign: "center",
              marginBottom: "16px",
              cursor: "pointer",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#000000",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              UPLOAD YOUR CV
            </p>
            <CloudUploadIcon style={{ color: "#3182CE", fontSize: "24px" }} />
            <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#000000",
                marginTop: "8px",
                marginBottom: "4px",
              }}
            >
              Drag and drop files or click to upload
            </p>
            <p style={{ fontSize: "12px", color: "#A0AEC0" }}>
              Upload file largest 15M
            </p>
          </div>
        </label>
        <div className="text-center">
          <a href="/login" className="text-blue-600 text-center underline">You already have an account</a>
        </div>
        <input
          id="cv-upload"
          name="cvFile"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Submit */}
        <button
          type="submit"
          style={{
            background: "#3182CE",
            color: "#FFFFFF",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
