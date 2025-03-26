// app/profile/layout.tsx
import { ReactNode } from "react";
import Sidebar from "@/components/student/profile/Sidebar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixed width */}
      <Sidebar />

      {/* Content area takes remaining space */}
      <div className="flex-1 p-8 overflow-x-hidden">{children}</div>
    </div>
  );
}
