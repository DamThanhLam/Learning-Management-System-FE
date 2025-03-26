// components/OrderSuccess.tsx
"use client";

import { useRouter } from "next/navigation";

export default function OrderSuccess() {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <svg width="201" height="200" viewBox="0 0 201 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100.5" cy="100" r="100" fill="#16A34A" />
                <g clip-path="url(#clip0_853_7355)">
                    <path d="M137.327 54.0942L89.6734 116.921L61.5 88.7677L48.5 101.768L91.8266 145.094L152.5 67.0942L137.327 54.0942Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_853_7355">
                        <rect width="104" height="104" fill="white" transform="translate(48.498 48)" />
                    </clipPath>
                </defs>
            </svg>
            <h1 className="mt-2 text-3xl font-bold text-gray-800 mb-2">Order Complete</h1>
            <p className="text-lg text-gray-600 mb-6">
                You Will Receive a confirmation email soon!
            </p>
        </div>
    );
}