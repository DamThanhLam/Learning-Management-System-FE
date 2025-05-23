'use client'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { BASE_URL_AUTH_SERVICE } from '@/utils/BaseURL'
import { checkLogin } from '@/utils/API'

const OTP_LENGTH = 6
const RESEND_TIMEOUT = 60 // seconds

const VerifyOtp: React.FC = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [message, setMessage] = useState('')
  const [loadingSend, setLoadingSend] = useState(false)
  const [loadingVerify, setLoadingVerify] = useState(false)
  const [resendCounter, setResendCounter] = useState(0)

  const inputsRef = useRef([])
  // useEffect(() => {
  //   checkLogin().then(data => {
  //     window.location.href = "/"
  //   })
  // }, [])
  // Load email + send OTP on mount
  useEffect(() => {
    const stored = localStorage.getItem('email')
    if (stored) {
      setEmail(stored)
      triggerSendOtp(stored)
    }
  }, [])

  // Countdown
  useEffect(() => {
    if (resendCounter <= 0) return
    const timer = setTimeout(() => setResendCounter(resendCounter - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCounter])

  // Send OTP
  const triggerSendOtp = async (mail) => {
    if (!mail) return
    try {
      setLoadingSend(true)
      setMessage('')
      const res = await axios.get(`${BASE_URL_AUTH_SERVICE}/send-otp`, {
        params: { email: mail },
        withCredentials: true
      })
      if (res.data.code === 200) {
        setMessage(`✅ OTP sent to ${mail}`)
        setResendCounter(RESEND_TIMEOUT)
        setOtp(Array(OTP_LENGTH).fill(''))
        inputsRef.current[0]?.focus()
      } else {
        setMessage('❌ Failed to send OTP.')
      }
    } catch {
      setMessage('❌ Error sending OTP.')
    } finally {
      setLoadingSend(false)
    }
  }

  // Check if OTP complete
  const isComplete = otp.every((d) => d !== '')

  // Handle change, allow delete
  const handleOtpChange = (e, idx) => {
    const val = e.target.value
    // only empty or single digit
    if (val === '' || /^\d$/.test(val)) {
      const newOtp = [...otp]
      newOtp[idx] = val
      setOtp(newOtp)
      if (val && idx < OTP_LENGTH - 1) {
        inputsRef.current[idx + 1]?.focus()
      }
    }
  }

  // Handle key down for backspace
  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newOtp = [...otp]
      if (otp[idx]) {
        // clear current
        newOtp[idx] = ''
        setOtp(newOtp)
      } else if (idx > 0) {
        // move focus back and clear previous
        inputsRef.current[idx - 1]?.focus()
        newOtp[idx - 1] = ''
        setOtp(newOtp)
      }
    }
  }

  // Verify OTP
  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length < OTP_LENGTH) {
      setMessage('⚠️ Please enter full OTP')
      return
    }
    try {
      setLoadingVerify(true)
      setMessage('')
      const res = await axios.post(`${BASE_URL_AUTH_SERVICE}/verify-otp`, { email, code }, { withCredentials: true })
      if (res.data.valid) {
        setMessage('✅ Verified successfully!')
        window.location.href = '/'
      } else {
        setMessage('❌ Invalid OTP.')
      }
    } catch {
      setMessage('❌ Verification failed.')
    } finally {
      setLoadingVerify(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">Verification Code</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter code sent to <span className="font-medium text-gray-800">{email}</span>
        </p>

        <div className="flex justify-between mb-4 space-x-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e, idx)}
              onKeyDown={(e) => handleOtpKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
              className={`w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 
                ${isComplete ? 'border-green-400 focus:ring-green-500' : 'border-gray-300 focus:ring-green-500'}`}
            />
          ))}
        </div>

        {message && (
          <p className="text-center mb-4 text-sm text-gray-700" aria-live="polite">
            {message}
          </p>
        )}

        <button
          onClick={handleVerify}
          disabled={loadingVerify}
          className={`w-full py-2 rounded-lg font-medium transition-colors duration-200 
            ${loadingVerify ? 'bg-green-300 text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}>
          {loadingVerify ? 'Verifying...' : 'Confirm Code'}
        </button>

        <div className="mt-4 text-center">
          <button
            onClick={() => triggerSendOtp(email)}
            disabled={resendCounter > 0 || loadingSend}
            className={`text-sm font-medium transition-colors duration-200 focus:outline-none
              ${loadingSend || resendCounter > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:text-green-800'}`}>
            {loadingSend ? 'Sending...' : resendCounter > 0 ? `Resend in ${resendCounter}s` : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp
