// app/layout.tsx
import "../globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
