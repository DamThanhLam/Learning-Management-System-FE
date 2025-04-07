"use client"

import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import Sidebar from '@/components/course/Sidebar';

const salesData = [
    { month: '1', sales: 50, commission: 20 },
    { month: '2', sales: 80, commission: 40 },
    { month: '3', sales: 120, commission: 60 },
    { month: '4', sales: 220, commission: 100 },
    { month: '5', sales: 300, commission: 150 },
    { month: '6', sales: 350, commission: 180 },
    { month: '7', sales: 400, commission: 220 },
    { month: '8', sales: 520, commission: 300 },
    { month: '9', sales: 600, commission: 400 },
    { month: '10', sales: 750, commission: 500 },
    { month: '11', sales: 820, commission: 550 },
    { month: '12', sales: 900, commission: 600 },
];

const Dashboard = () => {
    
    return (
        <div className="flex bg-gray-100 max-h-screen">
            <Sidebar pathname={"dashboard"} />
            <div className="p-6 grid gap-6  h-screen overflow-y-auto no-scrollbar">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
                    <div className='flex-col justify-around'>
                        <Card className="m-3"><CardContent className="p-4 "><div className="text-sm text-muted-foreground">Life Time Courses Commission</div><div className="text-xl font-semibold">$1K</div></CardContent></Card>
                        <Card className="m-3"><CardContent className="p-4 "><div className="text-sm text-muted-foreground">Life Time Received Commission</div><div className="text-xl font-semibold">$800.00</div></CardContent></Card>
                        <Card className="m-3"><CardContent className="p-4"><div className="text-sm text-muted-foreground">Life Time Pending Commission</div><div className="text-xl font-semibold">$200.00</div></CardContent></Card>
                    </div>
                    <Card className="md:col-span-1 row-span-1 col-span-3 md:col-span-3">

                        <CardContent className="p-4 h-full">
                            <div className="text-sm mb-2 font-medium">Life Time Sales</div>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" />
                                    <Area type="monotone" dataKey="commission" stroke="#82ca9d" fillOpacity={1} fill="url(#colorCommission)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Reviews</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-2">
                        {[
                            { label: 'Total Reviews', value: '1000' },
                            { label: '1 star reviews', value: '100', score: '1.0', color: 'text-red-500' },
                            { label: '2 star reviews', value: '100', score: '2.0', color: 'text-yellow-500' },
                            { label: '3 star reviews', value: '100', score: '3.0', color: 'text-yellow-400' },
                            { label: '4 star reviews', value: '100', score: '4.0', color: 'text-green-500' },
                            { label: '5 star reviews', value: '100', score: '5.0', color: 'text-green-600' },
                        ].map((item, i) => (
                            <Card key={i}><CardContent className="p-3 text-center"><div className="text-sm font-medium">{item.label}</div><div className="text-xl font-bold">{item.value}</div>{item.score && <div className={`text-sm font-semibold ${item.color}`}>{item.score}</div>}</CardContent></Card>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        {Array(3).fill(0).map((_, i) => (
                            <Card key={i}><CardContent className="p-4">
                                <div className="text-sm font-medium mb-1">Free</div>
                                <div className="font-semibold text-base">Beginner’s Guide to Design</div>
                                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                                    <div>Price</div><div>$50.00</div>
                                    <div>Chapters</div><div>13</div>
                                    <div>Orders</div><div>254</div>
                                    <div>Certificates</div><div>25</div>
                                    <div>Reviews</div><div>25</div>
                                    <div>Added to Shelf</div><div>500</div>
                                </div>
                            </CardContent></Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;