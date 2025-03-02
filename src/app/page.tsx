"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { decrement, increment } from "@/store/slice/slice";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Counter App</h1>
        <div className="flex justify-center space-x-4">
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Increment
          </button>
          <span className="text-xl font-bold">{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}
