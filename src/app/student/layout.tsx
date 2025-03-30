"use client";

import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const authentication = useSelector((state: RootState) => state.authentication);
  if(!authentication.authentication || !authentication.user?.groups?.includes("STUDENT")) window.location.href="/login"
  return (
    <div className="min-h-screen flex flex-col border border-indigo-600 text-sm">
      <Navbar />
      <main className="flex-1 w-full px-4 lg:px-6 py-4">{children}</main>
      <Footer />
    </div>
  );
}
