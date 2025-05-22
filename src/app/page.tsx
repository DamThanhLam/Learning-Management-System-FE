"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { BASE_URL_USER_SERVICE } from "@/utils/BaseURL";
import { checkLogin } from "@/utils/API";

export default function RegisterChoice() {
    const router = useRouter();
    const [groups, setGroups] = useState<string[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        checkLogin().then(data => {
            console.log(data)
            setUser(data.data)
        }).catch(e => {
            window.location.href = "/login"

        })

    }, [])
    useEffect(() => {
        if (!user) return;
        setGroups(user.groups)
        if (!user.verifiedEmail) {
            window.location.href = "/verify-otp"
        }

    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Bắt đầu với</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.includes("STUDENT")
                    && <motion.div whileHover={{ scale: 1.05 }}>
                        <Card className="p-6 text-center cursor-pointer bg-white shadow-lg rounded-2xl border hover:shadow-2xl"
                            onClick={() => router.push("/student")}
                        >
                            <CardContent className="flex flex-col items-center">
                                <GraduationCap size={48} className="text-blue-500 mb-4" />
                                <h2 className="text-xl font-semibold">Học sinh</h2>
                                <p className="text-gray-600 mt-2">Tài khoản để học tập và phát triển.</p>
                                <Button className="mt-4">Chọn</Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                }
                {groups.includes("TEACHER")
                    && <motion.div whileHover={{ scale: 1.05 }}>
                        <Card className="p-6 text-center cursor-pointer bg-white shadow-lg rounded-2xl border hover:shadow-2xl"
                            onClick={() => router.push("/teacher")}
                        >
                            <CardContent className="flex flex-col items-center">
                                <User size={48} className="text-green-500 mb-4" />
                                <h2 className="text-xl font-semibold">Giáo viên</h2>
                                <p className="text-gray-600 mt-2">Khoản để giảng dạy và hướng dẫn.</p>
                                <Button className="mt-4">Chọn</Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                }

                {groups.includes("ADMIN")
                    && <motion.div whileHover={{ scale: 1.05 }}>
                        <Card className="p-6 text-center cursor-pointer bg-white shadow-lg rounded-2xl border hover:shadow-2xl"
                            onClick={() => router.push("/admin")}
                        >
                            <CardContent className="flex flex-col items-center">
                                <User size={48} className="text-green-500 mb-4" />
                                <h2 className="text-xl font-semibold">Admin</h2>
                                <p className="text-gray-600 mt-2">Khoản để quản lý</p>
                                <Button className="mt-4">Chọn</Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                }
            </div>
        </div>
    );
}
