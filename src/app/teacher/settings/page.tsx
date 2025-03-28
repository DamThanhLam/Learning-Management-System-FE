"use client"
import React, { useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const [image, setImage] = useState<string | null>(null);
  const [links, setLinks] = useState({
    website: "",
    twitter: "",
    youtube: "",
    facebook: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinks({ ...links, [event.target.name]: event.target.value });
  };

  return (
    <div className="w-4/5 p-6 h-screen overflow-y-auto no-scrollbar">
      <h1 className="text-3xl font-bold">My profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
              {image && <Image src={image} alt="Profile" width={96} height={96} className="rounded-full" />}
            </div>
            <h2 className="mt-4 text-lg font-semibold">John Doe</h2>
            <button className="mt-2 px-4 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600">Share Profile</button>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="mt-2 text-blue-500">
              <li><input type="text" name="website" placeholder="Website" value={links.website} onChange={handleLinkChange} className="border px-2 py-1 rounded w-full" /></li>
              <li><input type="text" name="twitter" placeholder="Xi (Formerly Twitter)" value={links.twitter} onChange={handleLinkChange} className="border px-2 py-1 rounded w-full" /></li>
              <li><input type="text" name="youtube" placeholder="Youtube" value={links.youtube} onChange={handleLinkChange} className="border px-2 py-1 rounded w-full" /></li>
              <li><input type="text" name="facebook" placeholder="Facebook" value={links.facebook} onChange={handleLinkChange} className="border px-2 py-1 rounded w-full" /></li>
            </ul>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-lg font-semibold">Image Preview</h3>
          <div className="mt-4 flex flex-col items-center">
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-lg">
              {image ? <Image src={image} alt="Preview" width={200} height={200} className="rounded-lg" /> : "No image selected"}
            </div>
            <label className="mt-4 w-full text-center cursor-pointer border px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">
              Upload Image
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Name" className="border px-4 py-2 rounded-lg w-full" />
          <input type="text" placeholder="Phone number" className="border px-4 py-2 rounded-lg w-full" />
          <input type="email" placeholder="Email" className="border px-4 py-2 rounded-lg w-full" />
          <input type="date" placeholder="Birth day" className="border px-4 py-2 rounded-lg w-full" />
          <input type="text" placeholder="Gender" className="border px-4 py-2 rounded-lg w-full" />
        </div>
        <textarea placeholder="Description" className="mt-4 border px-4 py-2 rounded-lg w-full" />
      </div>
    </div>
  );
}