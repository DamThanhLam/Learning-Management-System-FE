"use client";

import { useState } from "react";

// Simple feedback form component for students
const StudentFeedbackForm = () => {
  const [studentName, setStudentName] = useState("");
  const [rating, setRating] = useState(0); // rating for overall performance
  const [feedback, setFeedback] = useState("");
  const [communication, setCommunication] = useState(0);
  const [punctuality, setPunctuality] = useState(0);
  const [quality, setQuality] = useState(0);
  const [teamwork, setTeamwork] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally, here we'd submit the form to a server, but we'll show a success message for now.
    setSuccessMessage("Feedback submitted successfully!");
    // Reset the form
    setStudentName("");
    setRating(0);
    setFeedback("");
    setCommunication(0);
    setPunctuality(0);
    setQuality(0);
    setTeamwork(0);
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-6 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">Student Feedback</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col gap-4">
          {/* Student Name */}
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-900">
              Select Student
            </label>
            <input
              id="studentName"
              type="text"
              placeholder="Enter student's name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="mt-2 p-2 w-full border rounded-md"
            />
          </div>

          {/* Overall Rating */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-900">
              Overall Rating
            </label>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`p-2 rounded-full ${rating >= value ? "bg-yellow-500" : "bg-gray-300"}`}
                  onClick={() => setRating(value)}
                >
                  {value} ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Communication Rating */}
          <div>
            <label htmlFor="communication" className="block text-sm font-medium text-gray-900">
              Communication
            </label>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`p-2 rounded-full ${communication >= value ? "bg-yellow-500" : "bg-gray-300"}`}
                  onClick={() => setCommunication(value)}
                >
                  {value} ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Punctuality Rating */}
          <div>
            <label htmlFor="punctuality" className="block text-sm font-medium text-gray-900">
              Punctuality
            </label>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`p-2 rounded-full ${punctuality >= value ? "bg-yellow-500" : "bg-gray-300"}`}
                  onClick={() => setPunctuality(value)}
                >
                  {value} ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Quality of Work Rating */}
          <div>
            <label htmlFor="quality" className="block text-sm font-medium text-gray-900">
              Quality of Work
            </label>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`p-2 rounded-full ${quality >= value ? "bg-yellow-500" : "bg-gray-300"}`}
                  onClick={() => setQuality(value)}
                >
                  {value} ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Teamwork Rating */}
          <div>
            <label htmlFor="teamwork" className="block text-sm font-medium text-gray-900">
              Teamwork
            </label>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`p-2 rounded-full ${teamwork >= value ? "bg-yellow-500" : "bg-gray-300"}`}
                  onClick={() => setTeamwork(value)}
                >
                  {value} ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Additional Feedback */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-900">
              Comments
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here"
              rows={4}
              className="mt-2 p-2 w-full border rounded-md"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
              {successMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentFeedbackForm;
