import React from "react";

const UnsuccessfulPurchase = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Purchase Unsuccessful
        </h2>
        <p className="text-gray-700 mb-4">
          Unfortunately, your purchase could not be completed. Please try again.
        </p>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Retry Purchase
        </button>
      </div>
    </div>
  );
};

export default UnsuccessfulPurchase;