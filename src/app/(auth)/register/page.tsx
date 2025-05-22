"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkLogin } from "@/utils/API";

export default function RegisterChoice() {
  const router = useRouter();
  useEffect(() => {
    checkLogin().then(data => {
      window.location.href = "/"
    })
  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Chọn loại tài khoản</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="p-6 text-center cursor-pointer bg-white shadow-lg rounded-2xl border hover:shadow-2xl"
            onClick={() => router.push("/register/student")}
          >
            <CardContent className="flex flex-col items-center">
              <GraduationCap size={48} className="text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold">Đăng ký Học sinh</h2>
              <p className="text-gray-600 mt-2">Tạo tài khoản để học tập và phát triển.</p>
              <Button className="mt-4">Chọn</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="p-6 text-center cursor-pointer bg-white shadow-lg rounded-2xl border hover:shadow-2xl"
            onClick={() => router.push("/register/teacher")}
          >
            <CardContent className="flex flex-col items-center">
              <User size={48} className="text-green-500 mb-4" />
              <h2 className="text-xl font-semibold">Đăng ký Giáo viên</h2>
              <p className="text-gray-600 mt-2">Tạo tài khoản để giảng dạy và hướng dẫn.</p>
              <Button className="mt-4">Chọn</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
