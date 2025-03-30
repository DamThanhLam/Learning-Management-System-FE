"use client"

import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Giả sử Material-UI đã được cài đặt

const FeedbackForm = () => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        maxWidth: '600px', // Tùy chọn: Điều chỉnh dựa trên nhu cầu thiết kế
        margin: '0 auto', // Căn giữa biểu mẫu nếu cần
      }}
    >
      {/* Tiêu đề */}
      <h1
        style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#000000',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        Request to create teacher account
      </h1>

      <form>
       

        {/* Trường Name */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#000000',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Name
          </label>
          <input
            type="text"
            placeholder="XXXXXX"
            style={{
              width: '100%',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              padding: '8px',
              background: '#FFFFFF',
            }}
          />
        </div>

        {/* Trường Gender */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#000000',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Gender
          </label>
          <select
            style={{
              width: '100%',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              padding: '8px',
              background: '#FFFFFF',
            }}
          >
            <option value="man">man</option>
            {/* Có thể thêm các tùy chọn khác nếu cần */}
          </select>
        </div>

        {/* Trường Birth */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#000000',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Birth
          </label>
          <input
            type="text"
            placeholder="XXXXXX"
            style={{
              width: '100%',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              padding: '8px',
              background: '#FFFFFF',
            }}
          />
        </div>

        {/* Trường Email */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#000000',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Email
          </label>
          <input
            type="text"
            placeholder="XXXXXX"
            style={{
              width: '100%',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              padding: '8px',
              background: '#FFFFFF',
            }}
          />
        </div>

        {/* Trường Phone Number */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#000000',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Phone Number
          </label>
          <input
            type="text"
            placeholder="XXXXXX"
            style={{
              width: '100%',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              padding: '8px',
              background: '#FFFFFF',
            }}
          />
        </div>

        {/* Phần Description */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#000000',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Description
          </label>
          <textarea
            style={{
              width: '100%',
              height: '120px',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              padding: '8px',
              background: '#FFFFFF',
            }}
          ></textarea>
        </div>

        {/* Phần Upload Your Face */}
        <label htmlFor="face-upload">
          <div
            style={{
              border: '2px dashed #E2E8F0',
              borderRadius: '4px',
              background: '#F7FAFC',
              padding: '16px',
              textAlign: 'center',
              marginBottom: '16px',
              cursor: 'pointer',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#000000',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              UPLOAD YOUR FACE
            </p>
            <CloudUploadIcon style={{ color: '#3182CE', fontSize: '24px' }} />
            <p
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#000000',
                marginTop: '8px',
                marginBottom: '4px',
              }}
            >
              Drag and drop files or click to upload
            </p>
            <p
              style={{
                fontSize: '12px',
                color: '#A0AEC0',
              }}
            >
              Upload Thumbnail in JPG, PNG largest 15M
            </p>
          </div>
        </label>
        <input
          id="face-upload"
          type="file"
          accept=".jpg,.png"
          style={{ display: 'none' }}
        />

        {/* Phần Upload Your CV */}
        <label htmlFor="cv-upload">
          <div
            style={{
              border: '2px dashed #E2E8F0',
              borderRadius: '4px',
              background: '#F7FAFC',
              padding: '16px',
              textAlign: 'center',
              marginBottom: '16px',
              cursor: 'pointer',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#000000',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              UPLOAD YOUR CV
            </p>
            <CloudUploadIcon style={{ color: '#3182CE', fontSize: '24px' }} />
            <p
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#000000',
                marginTop: '8px',
                marginBottom: '4px',
              }}
            >
              Drag and drop files or click to upload
            </p>
            <p
              style={{
                fontSize: '12px',
                color: '#A0AEC0',
              }}
            >
              Upload file largest 15M
            </p>
          </div>
        </label>
        <input
          id="cv-upload"
          type="file"
          style={{ display: 'none' }}
        />

        {/* Nút Submit */}
        <button
          type="submit"
          style={{
            background: '#3182CE',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;