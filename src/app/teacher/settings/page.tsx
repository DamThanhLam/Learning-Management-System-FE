"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { BASE_URL_USER_SERVICE } from "@/utils/BaseURL";

type Contacts = Record<string, string>;

export default function ProfilePage() {
  // --- 1. State cho form ---
  const [initialData, setInitialData] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [birthday, setBirthday] = useState<string | null>(null); // yyyy-MM-dd
  const [gender, setGender] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contacts>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isClient, setIsClient] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 2. Fetch dữ liệu ban đầu ---
  useEffect(() => {
    setIsClient(true);
    (async () => {
      try {
        const res = await fetch(`${BASE_URL_USER_SERVICE}/own`, {
          credentials: "include",
        });
        const body = await res.json();
        if (body.code === 200 && body.user) {
          const u = body.user;
          setInitialData(u);
          setUserName(u.userName ?? "");
          setEmail(u.email);
          setPhoneNumber(u.phoneNumber);
          setBirthday(u.birthday ?? null);
          setGender(u.gender ?? null);
          setDescription(u.description ?? null);
          setContacts(u.contacts ?? {});
          setImagePreview(u.urlImage); // nếu có
        }
      } catch (e: any) {
        console.error(e);
        setError("Không tải được thông tin người dùng");
      }
    })();
  }, []);

  // --- 3. Các handler cho form ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleContactChange = (key: string, value: string) => {
    setContacts(prev => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    if (!initialData) return;
    setUserName(initialData.userName);
    setEmail(initialData.email);
    setPhoneNumber(initialData.phoneNumber);
    setBirthday(initialData.birthday ?? null);
    setGender(initialData.gender ?? null);
    setDescription(initialData.description ?? null);
    setContacts(initialData.contacts ?? {});
    setImageFile(null);
    setImagePreview(initialData.urlImage ?? null);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("userName", userName);
      if (email) form.append("email", email);
      if (phoneNumber) form.append("phoneNumber", phoneNumber);
      if (birthday) form.append("birthday", birthday);
      if (gender) form.append("gender", gender);
      if (description) form.append("description", description);
      // contacts: append mỗi pair
      Object.entries(contacts).forEach(([k, v]) => {
        form.append(`contacts[${k}]`, v);
      });
      if (imageFile) {
        form.append("imageAvt", imageFile);
      }
      // nếu có cvFile: form.append("cvFile", cvFile);

      const res = await fetch(BASE_URL_USER_SERVICE, {
        method: "PUT",
        credentials: "include",
        body: form,
      });
      const body = await res.json();
      if (body.status === "success") {
        // cập nhật lại initialData để sau này Cancel sẽ lấy đúng
        setInitialData({ ...initialData, userName, email, phoneNumber, birthday, gender, description, contacts, urlImage: imagePreview });
      } else {
        throw new Error(JSON.stringify(body.errors || body.error));
      }
    } catch (e: any) {
      console.error(e);
      setError("Cập nhật thất bại: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-4/5 p-6 h-screen overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My profile</h1>
        <div className="space-x-2">
          <button
            onClick={handleCancel}
            disabled={saving}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* PROFILE HEADER & IMAGE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* left */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              )}
            </div>
            <h2 className="mt-4 text-lg font-semibold">{userName}</h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 px-4 py-2 border rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Change Avatar
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Contacts */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Contacts</h3>
            {["website", "twitter", "youtube", "facebook"].map((key) => (
              <div key={key} className="mt-2">
                <input
                  type="text"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="border px-2 py-1 rounded w-full"
                  value={contacts[key] ?? ""}
                  onChange={(e) => handleContactChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* right */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-lg font-semibold">Personal Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Name"
              className="border px-4 py-2 rounded-lg w-full"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone number"
              className="border px-4 py-2 rounded-lg w-full"
              value={phoneNumber ?? ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="border px-4 py-2 rounded-lg w-full"
              value={email ?? ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              placeholder="Birth day"
              className="border px-4 py-2 rounded-lg w-full"
              value={birthday ?? ""}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <select
              className="border px-4 py-2 rounded-lg w-full"
              value={gender ?? ""}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <textarea
            placeholder="Description"
            className="mt-4 border px-4 py-2 rounded-lg w-full"
            value={description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
