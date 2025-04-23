"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Heart, ShoppingCart, Bell } from "lucide-react"; // Ensure you have Lucide icons installed
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import { BASE_URL_USER_SERVICE } from "@/utils/BaseURL";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);
  const [user, setUser] = useState({
    userName: "John Doe",
    urlImage: "https://picsum.photos/200",
  })
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    console.log("Tìm kiếm với:", query);
    router.replace(`/student/category?courseName=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(); // xử lý giống như bấm icon

    }
  };

  useEffect(() => {
    fetch(BASE_URL_USER_SERVICE + "/own", {
      credentials: "include"
    }).then(res => res.json())
      .then(data => {

        data && data.user && setUser(data.user)
      })
  }, [])

  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    if (profileRef.current && !(profileRef.current as HTMLElement).contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  // Attach event listener when dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/student">
        <h1 className="text-xl font-bold cursor-pointer">LMS</h1>
      </Link>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search courses"
          className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Right Section - Icons & Profile */}
      <div className="flex items-center space-x-6">
        {/* <button className="text-gray-600 hover:text-gray-800">Teach on LMS</button> */}
        {/* <Heart className="text-gray-600 hover:text-gray-800 cursor-pointer" size={26} /> */}
        <Link href="/student/shopping-cart">
          <ShoppingCart className="text-gray-600 hover:text-gray-800 cursor-pointer" size={26} />
        </Link>
        {/* <Bell className="text-gray-600 hover:text-gray-800 cursor-pointer" size={26} /> */}

        {/* User Profile Picture / Initials */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none flex flex-col align-middle">
            <Image
              src={user.urlImage || "https://picsum.photos/200"}
              alt="User Avatar"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover "
            />
            <div className="flex items-center justify-center text-sm font-semibold">
              {user.userName}
            </div>
          </button>

          {/* Pop-up Dropdown */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    router.replace("/student/profile/my-profile")
                  }}>Profile</li>
                {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={()=>{
                  router.replace("/student/profile/")
                }}>Settings</li> */}
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    // Xóa tất cả cookies
                    const cookies = document.cookie.split(";");

                    // Lặp qua các cookies và xóa chúng
                    cookies.forEach(cookie => {
                      const cookieName = cookie.split("=")[0].trim();
                      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                    });
                    router.replace("/login")
                  }}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}