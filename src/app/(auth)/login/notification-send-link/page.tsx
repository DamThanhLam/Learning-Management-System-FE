"use client";

import { actionCodeSettings, app } from '@/config/firebase';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import React from 'react';

interface LoginLinkSentProps {
  /**
   * Địa chỉ email nhận link đăng nhập
   */
  email: string;
  /**
   * Callback khi người dùng muốn gửi lại email
   */
  onResend?: () => void;
}
const auth = getAuth(app);

/**
 * Thành phần UI thông báo link đăng nhập đã được gửi tới email
 */

const LoginLinkSentNotification = () => {
  const email = window.localStorage.getItem('emailForSignIn');
  const handleResend = async (e: React.FormEvent) => {
    email && sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        // ...
        window.location.href = "/login/notification-send-link"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
    e.preventDefault();


  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm text-center">
        {/* Icon phong thư */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0L12 3 3 8"
          />
        </svg>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Link đăng nhập đã được gửi!
        </h2>
        <p className="mt-2 text-gray-600">
          Vui lòng kiểm tra email của bạn tại{' '}
          <span className="font-medium text-gray-800">{email}</span>
          {' '}để nhận link đăng nhập.
        </p>
        <p className="mt-1 text-gray-500 text-sm">
          Nếu không thấy email trong hộp thư đến, hãy kiểm tra thư mục SPAM hoặc
          gửi lại.
        </p>

        <div className="mt-6 flex flex-col space-y-3">
          <button
            onClick={handleResend}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Gửi lại email
          </button>
          <a
            href="/login"
            className="w-full block py-2 px-4 text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition"
          >
            Quay về trang đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginLinkSentNotification;
