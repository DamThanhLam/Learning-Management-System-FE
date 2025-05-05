"use client"

import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
} from '@/components/ui/card'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import Sidebar from '@/components/course/Sidebar'
import { BASE_URL_COURSE_SERVICE, BASE_URL_STATISTICAL_SERVICE } from '@/utils/BaseURL'

export default function Dashboard() {
    const [year] = useState(new Date().getFullYear())
    const [salesData, setSalesData] = useState([])
    const [topCourses, setTopCourses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                // Lấy dữ liệu doanh thu theo tháng
                const respSales = await fetch(
                    `${BASE_URL_STATISTICAL_SERVICE}/life-time-sales?year=${year}`,
                    { credentials: 'include' }
                )
                const jsonSales = await respSales.json()
                const formattedSales = Array.from({ length: 12 }, (_, i) => ({
                    month: `${i + 1}`,
                    sales: jsonSales.data[i + 1] || 0,
                }))
                setSalesData(formattedSales)

                // Lấy top courses
                const size = 6
                const respCourses = await fetch(
                    `${BASE_URL_COURSE_SERVICE}/top-my-courses?size=${size}`,
                    { credentials: 'include' }
                )
                const jsonCourses = await respCourses.json()
                setTopCourses(jsonCourses.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [year])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-lg">Đang tải dữ liệu...</span>
            </div>
        )
    }

    return (
        <div className="flex bg-gray-50 h-screen">
            <Sidebar pathname="dashboard" />
            <div className="flex-1 p-6 overflow-y-auto">
                <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
                <Card>
                    <CardContent className="p-12">
                        <div className="text-lg font-medium mb-4">Doanh thu {year} hàng tháng</div>
                        <ResponsiveContainer width="100%" height={240}>
                            <AreaChart
                                data={salesData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#6366f1"
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                {/* Layout: Biểu đồ doanh thu và Top khóa học cùng hiển thị */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
                    {/* Sales Chart */}


                    {/* Top Courses */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                        {topCourses.map((course) => (
                            <Card
                                key={course.id}
                                className="hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="p-4">
                                    <div className="text-sm text-gray-500 mb-1">
                                        {course.category || 'Chưa đặt danh mục'}
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">
                                        {course.courseName}
                                    </h3>
                                    <div className="text-sm grid grid-cols-2 gap-2">
                                        <div>Giá:</div>
                                        <div>{course.price?.toLocaleString()}$</div>
                                        <div>Bài giảng:</div>
                                        <div>{course.countLectures}</div>
                                        <div>Đơn hàng:</div>
                                        <div>{course.countOrders}</div>
                                        <div>Đánh giá:</div>
                                        <div>{course.countReviews}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
