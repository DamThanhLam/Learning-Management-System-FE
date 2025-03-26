// components/student/tabs/ProfileTab.tsx
"use client";

import { useState, useRef } from "react";

export default function ProfileTab() {
    // State for Container 1: Profile Information
    const [profileInfo, setProfileInfo] = useState({
        firstName: "",
        lastName: "",
        headline: "",
        description: "",
        language: "",
    });

    // State for Container 2: Image Preview
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageLabel, setImageLabel] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State for Container 3: Links
    const [links, setLinks] = useState({
        website: "",
        x: "",
        linkedin: "",
        youtube: "",
        facebook: "",
    });

    // Handle input changes for Profile Information
    const handleProfileInfoChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProfileInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image selection for Image Preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSaveImage = () => {
        console.log("Saving image:", { image: imagePreview, label: imageLabel });
    };
    const handleLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLinks((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-full md:max-w-5xl mx-auto">
            <div className="mb-8 p-6 bg-white shadow rounded-lg">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-bold text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={profileInfo.firstName}
                            onChange={handleProfileInfoChange}
                            className="mt-1 block w-full border rounded p-2"
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-bold text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={profileInfo.lastName}
                            onChange={handleProfileInfoChange}
                            className="mt-1 block w-full border rounded p-2"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div>
                        <label htmlFor="headline" className="block text-sm font-bold text-gray-700">
                            Headline
                        </label>
                        <input
                            type="text"
                            id="headline"
                            name="headline"
                            value={profileInfo.headline}
                            onChange={handleProfileInfoChange}
                            className="mt-1 block w-full border rounded p-2"
                            placeholder="Enter your headline"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-bold text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={profileInfo.description}
                            onChange={handleProfileInfoChange}
                            className="mt-1 block w-full border rounded p-2"
                            rows={4}
                            placeholder="Enter your description"
                        />
                    </div>

                    <div>
                        <label htmlFor="language" className=" block text-sm font-bold text-gray-700">
                            Language
                        </label>
                        <select
                            id="language"
                            name="language"
                            value={profileInfo.language}
                            onChange={handleProfileInfoChange}
                            className="mt-1 block w-full border rounded p-2"
                        >
                            <option value="">Select a language</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="mb-8 p-6 bg-white shadow rounded-lg">
                <h2 className="text-xl font-bold mb-4">Image Preview</h2>
                <div className="flex justify-center mb-4">
                    <img

                        src={imagePreview || "https://via.placeholder.com/150"}
                        alt="Image Preview"
                        className="w-40 h-40 object-cover rounded bg-gray-200"
                    />
                </div>
                {/* Add/Change Image Button */}
                <div className="flex justify-center mb-4">
                    <h4
                        onClick={triggerFileInput}
                        className="text-black mr-auto rounded "
                    >
                        Add/Change Image
                    </h4>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
                <div className="mb-4">

                    <div className="flex items-center space-x-4 mt-1">
                        <input
                            type="text"
                            id="imageLabel"
                            value={imageLabel}
                            onChange={(e) => setImageLabel(e.target.value)}
                            className="block w-9/12 border rounded p-2"
                            placeholder="Enter image label"
                        />
                        <button
                            onClick={triggerFileInput}
                            className="border-1 text-black border-black text-white rounded"
                        >
                            Upload Image
                        </button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleSaveImage}
                        className="bg-black text-white px-4 py-2 rounded mr-auto"
                    >
                        Save Image
                    </button>
                </div>
            </div>

            {/* Container 3: Links */}
            <div className="mb-8 p-6 bg-white shadow rounded-lg">
                <h2 className="text-xl font-bold mb-4">Links</h2>
                <div className="space-y-4">
                    {/* Website */}
                    <div>
                        <label htmlFor="website" className="block text-sm font-bold text-gray-700">
                            Website
                        </label>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            value={links.website}
                            onChange={handleLinksChange}
                            className="mt-1 block w-full border rounded p-2"
                            placeholder="https://yourwebsite.com"
                        />

                    </div>

                    {/* X */}
                    <div>
                        <label htmlFor="x" className="block text-sm font-bold text-gray-700">
                            X
                        </label>
                        <input
                            type="url"
                            id="x"
                            name="x"
                            value={links.x}
                            onChange={handleLinksChange}
                            className="mt-1 block w-full border rounded p-2"
                            placeholder="https://x.com/yourprofile"
                        />
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label htmlFor="linkedin" className="block text-sm font-bold text-gray-700">
                            LinkedIn
                        </label>
                        <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            value={links.linkedin}
                            onChange={handleLinksChange}
                            className="mt-1 block w-full border rounded p-2"
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>

                    {/* YouTube */}
                    <div>
                        <label htmlFor="youtube" className="block text-sm font-bold text-gray-700">
                            YouTube
                        </label>
                        <input
                            type="url"
                            id="youtube"
                            name="youtube"
                            value={links.youtube}
                            onChange={handleLinksChange}
                            className="mt-1 block w-full border rounded p-2"
                            placeholder="https://youtube.com/yourchannel"
                        />
                    </div>

                    {/* Facebook */}
                    <div>
                        <label htmlFor="facebook" className="block text-sm font-bold text-gray-700">
                            Facebook
                        </label>
                        <input
                            type="url"
                            id="facebook"
                            name="facebook"
                            value={links.facebook}
                            onChange={handleLinksChange}
                            className="mt-1 block w-full border rounded p-2"
                            placeholder="https://facebook.com/yourprofile"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}