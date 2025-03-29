"use client";
import { useState } from "react";
import Link from "next/link";

export default function ShoppingCart() {
    // Sample data for cart items
    const cartItemsSample = [
        {
          courseId: "course456",
          courseName: "Introduction to User Experience Design",
          rating: 4.8,
          lectureQuantity: 155,
          price: 40.0,
          urlAva: "https://picsum.photos/200/300",
          teacherName: "John Doe",
        },
        {
          courseId: "course789",
          courseName: "Advanced React Development",
          rating: 4.7,
          lectureQuantity: 200,
          price: 60.0,
          urlAva: "https://picsum.photos/200/300",
          teacherName: "Jane Smith",
        },
        {
          courseId: "course123",
          courseName: "Mastering Python for Data Science",
          rating: 4.9,
          lectureQuantity: 180,
          price: 50.0,
          urlAva: "https://picsum.photos/200/300",
          teacherName: "Alice Johnson",
        },
      ];
  // State to manage cart items
  const [cartItems, setCartItems] = useState(cartItemsSample);

  // Function to handle removing an item
  const handleRemove = (courseId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.courseId !== courseId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.courseId}
              className="flex items-center border p-4 rounded-lg"
            >
              <img
                src={item.urlAva}
                alt={`${item.courseName} Thumbnail`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{item.courseName}</h2>
                <p className="text-sm text-gray-500">By {item.teacherName}</p>
                <p className="text-sm text-gray-500">
                    {item.lectureQuantity} Lectures,{" "}
                    <span className="text-yellow-600">Rated {item.rating.toFixed(1)} ★</span>
                </p>
                <div className="flex space-x-4 mt-2">
                  <button className="text-blue-500 hover:underline">
                    Save for later
                  </button>
                  <button
                    onClick={() => handleRemove(item.courseId)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Price</span>
              <span>
                $
                {cartItems
                  .reduce((total, item) => total + item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between font-bold text-green-400">
              <span>Total</span>
              <span>
                $
                {(
                  cartItems.reduce((total, item) => total + item.price, 0)
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}