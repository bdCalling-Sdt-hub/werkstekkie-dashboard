import { useState, useRef } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
 
 
import { useUpdateUserMutation } from "../../../redux/features/setting/settingApi";
import { toast } from "sonner";
 

const ProfileSettings = () => {
  const [fullName, setFullName] = useState("Devid Jhon");
  const [phoneNumber, setPhoneNumber] = useState("+990 3343 7865");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // Store File object
    }
  };

  // Handle Update Profile
  const handleUpdateProfile = async () => {
    const formData = {
      fullName,
      phoneNumber,
      email,
      currentPassword,
      newPassword,
      profileImage,
    };

    try {
      await updateUser(formData).unwrap();
      toast.success("Profile updated successfully!");
      console.log(formData)
    } catch (error) {
      toast.error("Failed to update profile!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <div className="flex items-center border p-2 rounded-md">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center border p-2 rounded-md">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button className="px-6 py-2 border rounded-md">Cancel</button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
              onClick={handleUpdateProfile}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-4">Your Photo</h2>
          <div className="mb-4">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
            )}
            <div
              className="mt-2 text-sm text-blue-600 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              Update
            </div>
            <div className="mt-1 text-sm text-red-600 cursor-pointer">Delete</div>
          </div>
          <div
            className="border-dashed border-2 p-6 rounded-lg cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <p className="text-gray-600 text-sm">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max, 800 x 800px)</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
