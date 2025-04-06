"use client";

import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { useSelector } from "react-redux";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col border border-indigo-600 text-sm">
      <Navbar />
      <main className="flex-1 w-full px-4 lg:px-6 py-4">{children}</main>
      <Footer />
    </div>
  );
}
