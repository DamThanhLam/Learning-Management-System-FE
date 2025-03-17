import React from "react";

const SuccessfulPurchase = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Purchase Successful!
        </h2>
        <p className="text-gray-700 mb-4">
          Thank you for your purchase !!!
        </p>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Start your course now
        </button>
      </div>
    </div>
  );
};

export default SuccessfulPurchase;
