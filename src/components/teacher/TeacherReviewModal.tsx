"use client";

import { useState } from "react";

interface RequireAccount {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  description: string;
  accountStatus: string;
  gender: string;
  urlImage: string;
  cvFile: string;
}

interface TeacherReviewModalProps {
  selectedApp: RequireAccount;
  setSelectedApp: (app: RequireAccount | null) => void;
  refreshData: () => void;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const TeacherReviewModal = ({
  selectedApp,
  setSelectedApp,
  refreshData,
}: TeacherReviewModalProps) => {
  const [adminDescription, setAdminDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"ACCEPT" | "REJECT">(
    "ACCEPT"
  );

  const handleDecision = async () => {
    if (!selectedApp?.id) {
      alert("Cannot submit: User ID is missing!");
      return;
    }

    if (adminDescription.length < 50 || adminDescription.length > 500) {
      alert("Description must be between 50 and 500 characters.");
      return;
    }

    setLoading(true);

    try {
      const token = getCookie("access_token");

      console.log("Send Decision:", {
        id: selectedApp.id,
        action: selectedAction,
        description: adminDescription,
      });

      const res = await fetch(
        "http://localhost:8082/api/v1/teacher/decision-making-create-teacher-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          credentials: "include",
          body: JSON.stringify({
            id: selectedApp.id,
            action: selectedAction,
            description: adminDescription,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert(data.data || "Success");
        setSelectedApp(null);
        refreshData();
      } else {
        alert(data.message || "Error occurred");
      }
    } catch (error) {
      console.error(error);
      alert("Request failed");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedApp) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden relative">
        {/* Nút đóng */}
        <button
          onClick={() => setSelectedApp(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
        >
          ✖
        </button>

        {/* Nội dung */}
        <div
          className="overflow-y-auto p-8"
          style={{ maxHeight: "calc(95vh - 40px)" }}
        >
          {/* Thông tin User */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Teacher Information
            </h2>

            <div className="flex flex-col items-center space-y-4">
              <img
                src={selectedApp.urlImage}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 shadow-sm"
              />

              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedApp.userName}
                </h3>
                <p className="text-gray-600">{selectedApp.email}</p>
                <p className="text-gray-600">
                  Birthday: {selectedApp.birthday}
                </p>
                <p className="text-gray-600">
                  Gender:{" "}
                  {selectedApp.gender ? selectedApp.gender.toLowerCase() : "-"}
                </p>

                <p className="text-gray-600">
                  Account Status: {selectedApp.accountStatus}
                </p>
              </div>

              {/* Description */}
              <div className="w-full">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Self Description:
                </h4>
                <p className="text-gray-700 whitespace-pre-line p-4 border rounded bg-gray-50 max-h-40 overflow-y-auto">
                  {selectedApp.description}
                </p>
              </div>

              {/* CV Preview */}
              {selectedApp.cvFile && (
                <div className="w-full">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    CV Preview:
                  </h4>
                  <div className="border rounded overflow-hidden h-80 bg-gray-100">
                    <iframe
                      src={`https://docs.google.com/gview?url=https://lam-dev-iuh.s3.ap-southeast-1.amazonaws.com/${selectedApp.cvFile}&embedded=true`}
                      style={{ width: "100%", height: "100%" }}
                      frameBorder="0"
                      title="CV Preview"
                    ></iframe>
                  </div>
                  <a
                    href={`https://lam-dev-iuh.s3.ap-southeast-1.amazonaws.com/${selectedApp.cvFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center mt-2 text-blue-500 underline"
                  >
                    View Full CV
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-300" />

          {/* Phần quyết định của Admin */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Admin Decision
            </h2>

            <div className="flex flex-col space-y-4">
              {/* Admin nhập mô tả */}
              <textarea
                placeholder="Enter decision description (50-500 characters)..."
                value={adminDescription}
                onChange={(e) => setAdminDescription(e.target.value)}
                className="w-full h-32 p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 resize-none"
              />

              {/* Select Action */}
              <select
                title="Select Action"
                value={selectedAction}
                onChange={(e) =>
                  setSelectedAction(e.target.value as "ACCEPT" | "REJECT")
                }
                className="w-full p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400"
              >
                <option defaultValue={"ACCEPT"} value="ACCEPT">
                  Accept Teacher
                </option>
                <option value="REJECT">Reject Teacher</option>
              </select>

              {/* Submit Button */}
              <button
                onClick={handleDecision}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {loading ? "Processing..." : "Submit Decision"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherReviewModal;
