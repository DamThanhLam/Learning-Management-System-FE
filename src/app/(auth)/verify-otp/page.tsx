"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { BASE_URL_USER_SERVICE } from '@/utils/BaseURL';

const OTP_LENGTH = 6;
const RESEND_TIMEOUT = 60; // 60s

const VerifyOtp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [message, setMessage] = useState<string>('');
  const [loadingSend, setLoadingSend] = useState<boolean>(false);
  const [loadingVerify, setLoadingVerify] = useState<boolean>(false);
  const [resendCounter, setResendCounter] = useState<number>(0);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Lấy email từ localStorage và tự động gửi OTP
  useEffect(() => {
    const storedEmail = window.localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      triggerSendOtp(storedEmail);
    }
  }, []);

  // Countdown resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCounter > 0) {
      timer = setTimeout(() => setResendCounter(resendCounter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCounter]);

  // Gửi OTP
  const triggerSendOtp = async (emailToSend: string) => {
    if (!emailToSend) return;
    try {
      setLoadingSend(true);
      setMessage('');
      const res = await axios.get(`${BASE_URL_USER_SERVICE}/send-otp`, {
        params: { email: emailToSend },
        withCredentials: true,
      });
      if (res.data.code === 200) {
        setMessage(`✅ OTP đã được gửi đến ${emailToSend}`);
        setResendCounter(RESEND_TIMEOUT); // reset countdown
        setOtp(Array(OTP_LENGTH).fill('')); // clear old OTP
        inputsRef.current[0]?.focus();
      } else {
        setMessage('❌ Gửi OTP thất bại. Vui lòng thử lại.');
      }
    } catch {
      setMessage('❌ Lỗi khi gửi OTP. Vui lòng thử lại sau.');
    } finally {
      setLoadingSend(false);
    }
  };

  const isComplete = otp.every((d) => d !== '');

  // Xử lý nhập
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/\D/, '');
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val.charAt(val.length - 1);
    setOtp(newOtp);
    if (idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  // Xử lý Backspace
  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  // Xác thực OTP
  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      setMessage('⚠️ Vui lòng nhập đầy đủ mã OTP.');
      return;
    }
    try {
      setLoadingVerify(true);
      setMessage('');
      const response = await axios.post(
        `${BASE_URL_USER_SERVICE}/verify-otp`,
        { email, code },
        { withCredentials: true }
      );
      if (response.data.valid) {
        setMessage('✅ Xác thực OTP thành công!');
        window.location.href="/"
      } else {
        setMessage('❌ Mã OTP không hợp lệ. Vui lòng thử lại.');
      }
    } catch {
      setMessage('❌ Xác thực thất bại. Vui lòng thử lại sau.');
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">
          Verification Code
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Please enter the code sent to{' '}
          <span className="font-medium text-gray-800">{email}</span>
        </p>

        {/* OTP Inputs */}
        <div className="relative flex justify-between mb-4 space-x-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit || ''}
              onChange={(e) => handleOtpChange(e, idx)}
              onKeyDown={(e) => handleOtpKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
              className={`w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 
                ${isComplete 
                  ? 'border-green-400 focus:ring-green-500' 
                  : 'border-gray-300 focus:ring-green-500'}`}
            />
          ))}
        
        </div>

        {message && (
          <p className="text-center mb-4 text-sm text-gray-700" aria-live="polite">
            {message}
          </p>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleVerify}
          disabled={loadingVerify}
          className={`w-full py-2 rounded-lg font-medium transition-colors duration-200 
            ${loadingVerify
              ? 'bg-green-300 text-white'
              : 'bg-green-600 text-white hover:bg-green-700'}`}
        >
          {loadingVerify ? 'Verifying...' : 'Confirm Code'}
        </button>

        {/* Resend */}
        <div className="mt-4 text-center">
          <button
            onClick={() => triggerSendOtp(email)}
            disabled={resendCounter > 0 || loadingSend}
            className={`text-sm font-medium transition-colors duration-200 focus:outline-none
              ${loadingSend || resendCounter > 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-green-600 hover:text-green-800'}`}
          >
            {loadingSend
              ? 'Sending...'
              : resendCounter > 0
              ? `Resend in ${resendCounter}s`
              : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
