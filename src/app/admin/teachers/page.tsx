"use client";

const TeacherApplication = () => {
  const applications = [
    {
      applicant: "Andrew Bojangles",
      email: "andrew@gmail.com",
      submitted: "Feb 15, 2025",
      expertise: "Software engineering",
      status: "Pending",
    },
    {
      applicant: "Andrew Bojangles",
      email: "andrew@gmail.com",
      submitted: "Feb 25, 2025",
      expertise: "Software engineering",
      status: "Approved",
    },
    {
      applicant: "Andrew Bojangles",
      email: "andrew@gmail.com",
      submitted: "Feb 25, 2025",
      expertise: "Software engineering",
      status: "Rejected",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">TEACHER APPLICATION</h1>
      <div className="flex items-center mb-6">
        <div className="relative w-64 flex-1">
          <input
            type="text"
            placeholder="Search applicant"
            className="w-full p-2 border rounded"
          />
          <span className="absolute right-2 top-2">🔍</span>
        </div>
        <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
      <div className="flex space-x-4 mb-4">
        <select className="p-2 border rounded">
          <option>ALL</option>
        </select>
        <select className="p-2 border rounded">
          <option>ALL STATUS</option>
        </select>
        <select className="p-2 border rounded">
          <option>Activity: most recent</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Applicant</th>
            <th className="text-left p-2">Submitted</th>
            <th className="text-left p-2">Expertise</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">
                <div>{app.applicant}</div>
                <div className="text-gray-500">{app.email}</div>
              </td>
              <td className="p-2">{app.submitted}</td>
              <td className="p-2">{app.expertise}</td>
              <td className="p-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    app.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : app.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td className="p-2">
                <button className="bg-blue-600 text-white px-4 py-1 rounded mr-2">
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherApplication;