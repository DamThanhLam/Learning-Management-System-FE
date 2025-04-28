"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { BASE_URL_COURSE_SERVICE, BASE_URL_PAYMENT_SERVICE } from "@/utils/BaseURL";

export default function CheckoutPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>("Checkout");
    const [paymentMethod, setPaymentMethod] = useState<string>("credit");
    const [formData, setFormData] = useState({
        country: "",
        state: "",
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        paypalEmail: "",
    });
    const [courses, setCourses] = useState<any[]>([])
    const [priceTotal, setPriceTotal] = useState<number>(0)
    const searchParams = useSearchParams()
    const idsParam = searchParams.get('courseIds')
    useEffect(() => {
        const idsArray = searchParams.get('courseIds')?.split(',') || []
        // 1) Build an array of fetch-promises
        const promises = idsArray.map(id =>
            fetch(`${BASE_URL_COURSE_SERVICE}?id=${id}`)
                .then(res => res.json())
        )

        // 2) Wait for them all, then update state exactly once
        Promise.all(promises)
            .then(results => {
                // each result is the parsed JSON, e.g. { data: { price, ... } }
                const courseData = results.map(r => r.data)
                setCourses(courseData)

                const total = courseData
                    .reduce((sum, c) => {
                        const p = Number(c.price)
                        return sum + (isNaN(p) ? 0 : p)
                    }, 0)
                setPriceTotal(total)
            })
            .catch(err => {
                console.error('Error fetching courses:', err)
            })
    }, [idsParam])


    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckout = () => {
        const idsArray = searchParams.get('courseIds')?.split(',') || []
        fetch(BASE_URL_PAYMENT_SERVICE + "/submitOrder", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ courseIds:idsArray ,orderInfo:"AA"})
        })
        .then(res => res.json())
        .then(data=> {
            window.open(data.urlPayment, '_blank');
        })
        .catch(e=> alert(e))
        // router.push("/student/shopping-cart/checkout/order-complete");
    };
    const ItemCourse = (course: any) => {
        return (
            <div className="flex mb-6">
                <div className="w-1/3">
                    <Image
                        src={course.urlAvt}
                        alt="Course Image"
                        width={150}
                        height={150}
                        className="object-cover rounded"
                    />
                </div>
                <div className="w-2/3 pl-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold py-1 rounded mb-2">
                        {course.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {course.courseName}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {course.countLectures} Lectures
                    </p>
                    <p className="text-lg font-semibold text-gray-800 mt-2">
                        ${course.price}
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Checkout Page</h1>
                    <div className="flex space-x-4">
                        {/* <div
                            className={`text-lg ${activeTab === "Details" ? "text-blue-600 font-bold" : "text-gray-600"
                                }`}
                            onClick={() => handleTabClick("Details")}
                        >
                            Details
                        </div>
                        <div
                            className={`text-lg ${activeTab === "Shopping Cart"
                                ? "text-blue-600 font-bold"
                                : "text-gray-600"
                                }`}
                            onClick={() => handleTabClick("Shopping Cart")}
                        >
                            Shopping Cart
                        </div> */}
                        <div
                            className={`text-lg ${activeTab === "Checkout" ? "text-blue-600 font-bold" : "text-gray-600"
                                }`}
                            onClick={() => handleTabClick("Checkout")}
                        >
                            Checkout
                        </div>
                    </div>
                </div>


                {activeTab === "Checkout" && (
                    <div className="grid grid-cols-1 gap-6">
                        {/* <div className="bg-white p-6 rounded-lg shadow">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        placeholder="Enter Country"
                                        className="mt-1 block w-full border rounded p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="state"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        State/Union Territory
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="Enter State"
                                        className="mt-1 block w-full border rounded p-2"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    Payment Method
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="credit"
                                                name="paymentMethod"
                                                value="credit"
                                                checked={paymentMethod === "credit"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <label htmlFor="credit" className="ml-2 flex items-center space-x-2">
                                                <span className="text-gray-700">Credit/Debit Card</span>
                                            </label>
                                        </div>
                                        <img src="/visa.webp" alt="Visa" className="h-6" />
                                    </div>

                                    {paymentMethod === "credit" && (
                                        <div className="space-y-4 pl-6">
                                            <div>
                                                <label
                                                    htmlFor="cardName"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Name of Card
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cardName"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    placeholder="Name of the card"
                                                    className="mt-1 block w-full border rounded p-2"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="cardNumber"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    placeholder="Card Number"
                                                    className="mt-1 block w-full border rounded p-2"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label
                                                        htmlFor="expiryDate"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="expiryDate"
                                                        name="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={handleInputChange}
                                                        placeholder="MM/YY"
                                                        className="mt-1 block w-full border rounded p-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="cvc"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        CVC/CVV
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="cvc"
                                                        name="cvc"
                                                        value={formData.cvc}
                                                        onChange={handleInputChange}
                                                        placeholder="CVC/CVV"
                                                        className="mt-1 block w-full border rounded p-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="paypal"
                                                name="paymentMethod"
                                                value="paypal"
                                                checked={paymentMethod === "paypal"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <label htmlFor="paypal" className="ml-2 text-gray-700">PayPal</label>
                                        </div>
                                        <img src="/paypal.webp" alt="PayPal" className="h-6" />
                                    </div>

                                    {paymentMethod === "paypal" && (
                                        <div className="space-y-4 pl-6 mt-4">
                                            <div>
                                                <label
                                                    htmlFor="paypalEmail"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    PayPal Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="paypalEmail"
                                                    name="paypalEmail"
                                                    value={formData.paypalEmail || ""}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your PayPal email"
                                                    className="mt-1 block w-full border rounded p-2"
                                                />
                                            </div>
                                            <button
                                                onClick={() => alert("Redirecting to PayPal...")} // Replace with actual PayPal redirect logic
                                                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                            >
                                                Proceed to PayPal
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div> */}

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Order Details
                            </h2>
                            {courses.map(course => {
                                return ItemCourse(course)
                            })}


                            {/* <div className="relative flex items-center mb-2 border border-gray-300 rounded-lg p-2 bg-white">
                                <span className="absolute left-3">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 8H8.01M14 14H14.01M15 7L7 15M8.5 8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8C7.5 7.72386 7.72386 7.5 8 7.5C8.27614 7.5 8.5 7.72386 8.5 8ZM14.5 14C14.5 14.2761 14.2761 14.5 14 14.5C13.7239 14.5 13.5 14.2761 13.5 14C13.5 13.7239 13.7239 13.5 14 13.5C14.2761 13.5 14.5 13.7239 14.5 14ZM21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Enter Coupon Code"
                                    className="pl-10 pr-4 py-2 border-none outline-none w-full"
                                />
                                <button className="bg-black text-white px-4 py-2 rounded-lg ml-2">
                                    APPLY
                                </button>
                            </div> */}

                            <div className="space-y-2 mb-6">
                                {/* <div className="flex justify-between">
                                    <span className="text-gray-600">Price</span>
                                    <span className="text-gray-800 font-semibold">${priceTotal}</span>
                                </div> */}
                                {/* <div className="flex justify-between">
                                    <span className="text-gray-600">Discount</span>
                                    <span className="text-gray-800 font-semibold">-$10.00</span>
                                </div> */}
                                {/* <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="text-gray-800 font-semibold">$20.00</span>
                                </div> */}
                                <div className="flex justify-between border-t pt-2">
                                    <span className="text-gray-800 font-semibold">Total</span>
                                    <span className="text-gray-800 font-semibold">${priceTotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-black text-white px-4 py-2 rounded"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
}