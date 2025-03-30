"use client";

// Component WorkspaceNameSection
const WorkspaceNameSection = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-2xl">📷</span>
        </div>
        <div className="ml-4 flex-1 relative">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded pr-8"
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">📎</span>
        </div>
      </div>
    </div>
  );
};

// Dữ liệu admins
const admins = [
  { name: "John Johnson", role: "CEO", avatar: "👨‍💼" },
  { name: "Jane Cooper", role: "Design Lead", avatar: "👩‍💼" },
];

// Component AdminsSection
const AdminsSection = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Workspace admins</h2>
      <div className="grid grid-cols-3 gap-4">
        {admins.map((admin, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded p-4 relative">
            <div className="absolute top-2 right-2 text-gray-500 cursor-pointer">✖️</div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl">{admin.avatar}</span>
              </div>
              <div className="ml-4">
                <div className="font-bold text-black">{admin.name}</div>
                <div className="text-gray-500">{admin.role}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-white border-2 border-blue-500 rounded p-4 flex items-center justify-center cursor-pointer">
          <div className="text-blue-500 font-bold">+ Add admin</div>
        </div>
      </div>
    </div>
  );
};


// Component WorkspaceSettings
const WorkspaceSettings = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">WORKSPACE ADMIN</h1>
      <WorkspaceNameSection />
      <AdminsSection />
    </div>
  );
};

// Component chính của trang
export default function Page() {
  return (
    <div className="flex">
      <WorkspaceSettings />
    </div>
  );
}