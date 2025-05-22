"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import encryptPassword from '@/utils/rsa';
import { BASE_URL_AUTH_SERVICE } from '@/utils/BaseURL';
import { checkLogin } from '@/utils/API';

interface Account {
  id: string;
  username: string;
  email: string;
  urlAvt: string;
}

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [account, setAccount] = useState<Account>();
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Resend timer
  const [timer, setTimer] = useState<number>(60);
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);

  useEffect(()=>{
    checkLogin().then(data=>{
      window.location.href="/"
    })
  },[])
  // Step 1: Search by email and fetch account
  const handleSearch = async () => {
    try {
      setError('');
      const response = await axios.get<Account>(
        `${BASE_URL_AUTH_SERVICE}/search`,
        { params: { email } }
      );
      setAccount(response.data);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Email not found');
    }
  };

  // Step 2 & Resend: Send OTP
  const handleSendOtp = async () => {
    if (!account) return;
    try {
      setError('');
      await axios.get(
        `${BASE_URL_AUTH_SERVICE}/send-otp`,
        { params: { email } }
      );
      // Move to OTP step if not already
      setStep(3);
      // Reset timer
      setTimer(60);
      setIsResendEnabled(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error sending OTP');
    }
  };

  // Step 3: Reset password
  const handleReset = async () => {
    if (!account) return;
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setError('');
      await axios.post(
        `${BASE_URL_AUTH_SERVICE}/forgot-password`,
        { email, otpCode: otp, password: encryptPassword(newPassword) }
      );
      setStep(4);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error resetting password');
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 3 && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (step === 3 && timer === 0) {
      setIsResendEnabled(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-4"
      >
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center">
              {step === 1 && 'Forgot Password'}
              {step === 2 && 'Send OTP'}
              {step === 3 && 'Reset Password'}
              {step === 4 && 'Success'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            {step === 1 && (
              <div className="space-y-4">
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Button onClick={handleSearch} className="w-full">
                  Search
                </Button>
                <div className="text-center">
                  <Link href="/login" className="text-sm text-blue-600 hover:underline">
                    Back to Login
                  </Link>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 text-center">
                <Image
                  src={account?.urlAvt || '/avatar-default-svgrepo-com.svg'}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full mx-auto"
                />
                <p>
                  {account?.username} ({account?.email})
                </p>
                <div className="flex justify-between">
                  <Button variant="secondary" onClick={goBack}>
                    Back
                  </Button>
                  <Button onClick={handleSendOtp}>
                    Send OTP Email
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                  />
                  <Button
                    variant="link"
                    onClick={handleSendOtp}
                    disabled={!isResendEnabled}
                  >
                    {isResendEnabled ? 'Resend OTP' : `Resend in ${timer}s`}
                  </Button>
                </div>
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />

                <div className="flex justify-between">
                  <Button variant="secondary" onClick={goBack}>
                    Back
                  </Button>
                  <Button onClick={handleReset}>
                    Reset Password
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-4">
                <p>Your password has been reset successfully!</p>
                <Link href="/login">
                  <Button className="w-full">Go to Login</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
