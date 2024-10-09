"use client";
import { useGetUserProfile, useUpdateUserProfile } from "@/src/hooks/auth.hook";
import {
  CheckBadgeIcon,
  PencilIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { handleImageUpload } from "@/src/services/ImageUpload";
import Loading from "../../UI/Loading";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";

export default function ProfileHeader() {
  const { data: profile } = useGetUserProfile();
  const {mutate: updateProfile, isPending} = useUpdateUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    phone: "",
    profileImg: "",
    bio: "",
  });
  const [formData, setFormData] = useState({
    ...originalData,
    profileImgFile: null, // Store File object here
  });

  useEffect(() => {
    if (profile) {
      const profileData = {
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        profileImg: profile.profileImg || "",
        bio: profile.preferences || "This is a short bio about me.",
      };
      setOriginalData(profileData);
      setFormData({ ...profileData, profileImgFile: null });
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev: any) => ({
        ...prev,
        profileImgFile: file,
        profileImg: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = async () => {
    let uploadedImageUrl = formData.profileImg;

    // Upload image if a new file has been selected
    if (formData.profileImgFile) {
      try {
        uploadedImageUrl = await handleImageUpload(formData.profileImgFile) as string;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    updateProfile({name: formData.name, phone: formData.phone, preferences: formData.bio, profileImg: uploadedImageUrl})

    // Set the uploaded image URL in formData and update originalData
    const updatedData = { ...formData, profileImg: uploadedImageUrl, profileImgFile: null };
    setFormData(updatedData);
    setOriginalData(updatedData);
    setIsEditing(false);
  };


  const handleCancel = () => {
    setFormData({ ...originalData, profileImgFile: null }); 
    setIsEditing(false);
  };

  if (!profile) return <ProfileHeaderSkeleton />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
      {
        isPending && <Loading />
      }
      {/* Enhanced Profile Header */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          <Image
            src={formData.profileImg || "/default-profile.png"}
            alt={`${formData.name}'s profile`}
            layout="fill"
            className="rounded-full object-cover"
          />
          {profile.isVerified && (
            <CheckBadgeIcon className="w-8 h-8 absolute bottom-2 right-2 text-blue-500" />
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="text-2xl font-semibold text-gray-700 dark:text-gray-300 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mb-2 p-2 w-full rounded-md"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="text-gray-700 dark:text-gray-300 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Bio"
                className="mt-2 text-gray-700 dark:text-gray-300 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full"
              />

              <div className="mt-4 flex">
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <CameraIcon className="w-5 h-5" />
                  <span>Upload Image</span>
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </div>

              <div className="mt-4 flex justify-center sm:justify-start space-x-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {formData.name}
                </h1>
                {profile.isVerified && (
                  <CheckBadgeIcon className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {profile.email}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {formData.phone}
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {formData.bio}
              </p>
              <div className="mt-4 flex justify-center sm:justify-start space-x-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
