/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useSelector, useDispatch } from "react-redux";

import { FiBell } from "react-icons/fi";

import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";
import { Image } from "antd";
import { useGetUserQuery } from "../../../redux/features/setting/settingApi";


const Header = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  const {data} = useGetUserQuery({});
  const user= data?.data.attributes
  console.log(user)

  const getFullImageUrl = (path) => {
    if (!path) return "/default-image.jpg"; // If `featureImage` is missing, use a default image
    if (path.startsWith("http")) return path; // If it's already a full URL, return as is
    return `${ImageBaseUrl}${path}`; // Convert relative path to absolute URL
  };


  return (
    <div className="border-t-2 bg-[#FEFEFE] border-purple-500 flex justify-between items-center py-3 px-5 shadow-lg">
      {/* Search Bar Section */}
      

      {/* Date and Notification Icon */}
      <div className="flex items-center space-x-4  mx-auto ">
        <span className="text-blue-600 text-center">{new Date().toLocaleDateString()}</span>
        {/* Notification Icon */}

      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-3">
        <FiBell className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500" />
        {/* User Role */}
        <span className="text-sm text-gray-500">{user?.role || "User"}</span>

        {/* Profile Image */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={getFullImageUrl(user?.profileImage)} // Ensure correct path
            alt="Blog Image"
            width={50}
            height={50}
            className="rounded-lg w-full"
          />
        </div>



        {/* Logout Button */}

      </div>
    </div>
  );
};

export default Header;
