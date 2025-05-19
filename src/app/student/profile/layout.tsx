// app/profile/layout.tsx
'use client'

import { ReactNode, useEffect, useState } from 'react'
import Sidebar from '@/components/student/profile/Sidebar'
import { BASE_URL_USER_SERVICE } from '@/utils/BaseURL'
import axios from 'axios'

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('John Doe')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL_USER_SERVICE}/own`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          withCredentials: true
        })

        if (response.data.code === 200 && response.data.status === 'success') {
          const userData = response.data.user
          setUserName(userData.userName || 'John Doe')
          setAvatarUrl(userData.urlImage || null)
        }
      } catch (err) {
        console.error('Error fetching user data for sidebar:', err)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="flex min-h-screen">
      {/* Pass user data to Sidebar */}
      <Sidebar userName={userName} avatarUrl={avatarUrl} />

      {/* Content area takes remaining space */}
      <div className="flex-1 p-8 overflow-x-hidden">{children}</div>
    </div>
  )
}
