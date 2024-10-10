"use client";
import { useState } from "react";
import { IUser } from "@/src/types";
import { handleImageUpload } from "@/src/services/ImageUpload";

interface EditUserModalProps {
  user: Partial<IUser>;
  onSave: (id: string, updatedUser: Partial<IUser>) => void;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [profileImg, setProfileImg] = useState(user.profileImg || "");
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
      setProfileImgFile(file);
    }
  };

  const handleSave = async () => {
    let uploadedImageUrl = profileImg;

    // Upload the image if a new file was selected
    if (profileImgFile) {
      try {
        uploadedImageUrl = (await handleImageUpload(profileImgFile)) as string;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const updatedUser: Partial<IUser> = {
      name,
      email,
      role,
      profileImg: uploadedImageUrl,
    };
    onSave(user._id as string, updatedUser);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <label className="block mb-2">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <label className="block mb-2">Profile Image</label>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={profileImg || "/default-profile.png"}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
