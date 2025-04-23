"use client";

import { useState, useRef, useEffect } from "react";
import { BASE_URL_USER_SERVICE } from "@/utils/BaseURL";
import axios from "axios";

interface UserProfile {
    id: string;
    userName: string;
    email: string | null;
    phoneNumber: string | null;
    birthday: string | null;
    gender: string | null;
    description: string | null;
    urlImage: string | null;
    cvFile: string | null;
    contacts: string | null;
}

export default function ProfilePage() {
    // State for Container 1: Profile Information
    const [profileInfo, setProfileInfo] = useState({
        firstName: "",
        lastName: "",
        description: "",
        language: "",
        birthday: "",
        phoneNumber: "",
        gender: "",
        email: "",
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

    // API related states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL_USER_SERVICE}/own`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });

            if (response.data.code === 200 && response.data.status === "success") {
                const userData = response.data.user;
                setUserId(userData.id);

                // Split userName into firstName and lastName
                const nameParts = (userData.userName || '').split(' ');
                const firstName = nameParts[0] || '';
                const lastName = nameParts.slice(1).join(' ') || '';

                setProfileInfo(prev => ({
                    ...prev,
                    firstName,
                    lastName,
                    description: userData.description || '',
                    birthday: userData.birthday || '',
                    phoneNumber: userData.phoneNumber || '',
                    gender: userData.gender || '',
                    email: userData.email || '',
                }));

                if (userData.urlImage) {
                    setAvatarPreview(userData.urlImage);
                }

                if (userData.contacts) {
                    try {
                        const contactsData = JSON.parse(userData.contacts);
                        setLinks(prev => ({
                            ...prev,
                            ...contactsData
                        }));
                    } catch (e) {
                        console.error('Error parsing contacts:', e);
                    }
                }
            } else {
                setError('Failed to fetch profile data');
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError('Failed to fetch profile data');
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes for Profile Information
    const handleProfileInfoChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProfileInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Handle avatar image selection
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSaveAll = async () => {
        if (!userId) return;

        try {
            setLoading(true);
            let imageUrl = avatarPreview;

            // If there's a new avatar file, upload it first
            if (avatarFile) {
                const formData = new FormData();
                formData.append('imageAvt', avatarFile);

                try {
                    const imageResponse = await axios.put(`${BASE_URL_USER_SERVICE}/${userId}/avatar`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        withCredentials: true
                    });

                    if (imageResponse.data.code === 200 && imageResponse.data.status === "success") {
                        imageUrl = imageResponse.data.urlImage; // Assuming the API returns the URL in this format
                    } else {
                        throw new Error('Failed to upload avatar');
                    }
                } catch (error) {
                    console.error('Error uploading avatar:', error);
                    alert('Failed to upload avatar. Please try again.');
                    return;
                }
            }

            // Format birthday to LocalDate format (YYYY-MM-DD)
            const birthdayDate = profileInfo.birthday ? new Date(profileInfo.birthday) : null;
            const formattedBirthday = birthdayDate ? birthdayDate.toISOString().split('T')[0] : null;

            // Update user profile with all data including the new image URL
            const updatedData = {
                userName: `${profileInfo.firstName} ${profileInfo.lastName}`.trim(),
                description: profileInfo.description || '',
                contacts: JSON.stringify(links),
                birthday: formattedBirthday,
                phoneNumber: profileInfo.phoneNumber || null,
                gender: profileInfo.gender || null,
                email: profileInfo.email || null,
                urlImage: imageUrl
            };

            const response = await axios.put(`${BASE_URL_USER_SERVICE}/${userId}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            if (response.data.code === 200 && response.data.status === "success") {
                alert('Profile updated successfully!');
                await fetchUserProfile(); // Refresh data
            } else {
                if (response.data.code === 400) {
                    if (response.data.errors) {
                        if (typeof response.data.errors === 'string') {
                            alert(`Error: ${response.data.errors}`);
                        } else if (Array.isArray(response.data.errors)) {
                            const errorMessages = response.data.errors
                                .map((error: any) => error.defaultMessage || error)
                                .join('\n');
                            alert(`Validation errors:\n${errorMessages}`);
                        }
                    } else {
                        alert('Invalid data submitted. Please check your inputs.');
                    }
                } else {
                    alert('Failed to update profile. Please try again.');
                }
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Failed to update profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLinks((prev) => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-8 p-8 bg-white shadow rounded-lg w-full">
                <div className="space-y-4 max-w-full">
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
                        <label htmlFor="language" className="block text-sm font-bold text-gray-700">
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

            <div className="mb-8 bg-white shadow rounded-lg w-full">
                <h2 className="text-xl font-bold px-8 pt-6 mb-4">Avatar</h2>
                <div className="px-8 pb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Profile Image</h2>
                        <div className="flex flex-col items-center">
                            <div
                                className="relative w-48 h-32 mb-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition-colors"
                                onClick={triggerFileInput}
                            >
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={triggerFileInput}
                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Add/Change Image
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Recommended: JPG, PNG. Max 5MB
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8 bg-white shadow rounded-lg w-full">
                <h2 className="text-xl font-bold px-8 pt-6 mb-4">Links</h2>
                <div className="px-8 pb-8 space-y-4 max-w-full">
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

            {/* Save Button at the bottom */}
            <div className="mb-8 p-8 bg-white shadow rounded-lg w-full">
                <div className="flex justify-center">
                    <button
                        onClick={handleSaveAll}
                        disabled={loading}
                        className={`px-8 py-2.5 bg-white text-blue-500 border-2 border-blue-500 rounded-lg shadow-lg hover:bg-amber-800 hover:text-white hover:border-amber-800 transition-colors
                            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </span>
                        ) : 'Save All Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}