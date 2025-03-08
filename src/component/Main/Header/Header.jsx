// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */

// import { useSelector, useDispatch } from "react-redux";

// import { FiBell } from "react-icons/fi";

// import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";
// import { Image } from "antd";
// import { useGetUserQuery } from "../../../redux/features/setting/settingApi";


// const Header = () => {
//   const dispatch = useDispatch();
//   // const { user } = useSelector((state) => state.auth);
//   const { data } = useGetUserQuery({});
//   const user = data?.data.attributes
//   console.log(user)

//   const getFullImageUrl = (path) => {
//     if (!path) return "/default-image.jpg"; // If `featureImage` is missing, use a default image
//     if (path.startsWith("http")) return path; // If it's already a full URL, return as is
//     return `${ImageBaseUrl}${path}`; // Convert relative path to absolute URL
//   };


//   return (
//     <div className="border-t-2 bg-[#FEFEFE] border-purple-500 flex justify-between items-center py-3 px-5 shadow-lg">
//       {/* Search Bar Section */}


//       {/* Date and Notification Icon */}
//       <div className="flex items-center space-x-4 mx-auto">
//         <span className="text-blue-600 text-center">
//           {new Date().toLocaleDateString('en-US', {
//             weekday: 'long', // "Tuesday"
//             year: 'numeric', // "2025"
//             month: 'long', // "March"
//             day: 'numeric' // "5"
//           })}
//         </span>
//       </div>


//       {/* Profile Section */}
//       <div className="flex items-center space-x-3">
//         <FiBell className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500" />
//         {/* User Role */}
//         <span className="text-sm text-gray-500">{user?.role || "User"}</span>

//         {/* Profile Image */}
//         <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
//           <Image
//             src={getFullImageUrl(user?.profileImage)} // Ensure correct path
//             alt="Blog Image"
//             width={50}
//             height={50}
//             className="rounded-lg w-full"
//           />
//         </div>



//         {/* Logout Button */}

//       </div>
//     </div>
//   );
// };

// export default Header;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import { Image } from "antd";
import { useGetUserQuery } from "../../../redux/features/setting/settingApi";
import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";
import { useGetNotificationQuery } from "../../../redux/features/notification/notificatioin";

const Header = ({toggleSidebar}) => {

  const { data } = useGetUserQuery({});
  const user = data?.data.attributes;
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Fetch notifications
  const { data: notificationData } = useGetNotificationQuery();
  const notifications = notificationData?.data?.attributes || []; // Ensure it's an array

  console.log(notifications)
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getFullImageUrl = (path) => {
    if (!path) return "/default-image.jpg";
    if (path.startsWith("http")) return path;
    return `${ImageBaseUrl}${path}`;
  };

  return (
    <div className="w-full border-t-2 bg-[#FEFEFE]  flex justify-between items-center py-3 px-5 shadow-lg relative">
      {/* Date Section */}
      <button
        className="md:hidden text-gray-500 text-2xl"
        onClick={toggleSidebar}
      >
        <FiMenu />
      </button>
      <div className="lg:flex items-center space-x-4 mx-auto sm: hidden">
        <span className="text-blue-600 text-center">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-3 relative">
        {/* Notification Bell */}
        <div className="relative">
          <FiBell
            className="text-gray-600 border w-[30] h-[30] rounded-full text-2xl cursor-pointer hover:text-blue-500"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {/* Notification Counter (if notifications exist) */}
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifications.length}
            </span>
          )}

          {/* Notification Dropdown */}
          {showNotifications && (
            <div
              ref={notificationRef}
              className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
            >
              <div className="p-3 border-b font-semibold text-gray-600">Notifications</div>
              {notifications.length > 0 ? (
                <div className="max-h-60 overflow-y-auto">
                  {notifications.map((notif, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 text-sm border-b last:border-none hover:bg-gray-100 flex items-start"

                    >

                      {/* Notification Avatar (if exists) */}
                      <div key={index} className="flex items-center ">
                        <div>
                          {notif?.user && (
                            <Image
                              src={getFullImageUrl(notif.user.profileImage)}
                              alt="Notif Avatar"
                              width={50}
                              height={50}
                              className="w-full h-full rounded-full mr-5"
                            />
                          )}
                        </div>
                        <div>
                          <h1 className="text-gray-800 font-bold px-3">{notif?.user.fullName}</h1>
                          <p className="text-gray-800 font-medium px-3">{notif?.message || "New Notification"}</p>
                          <span className="text-gray-500 text-xs px-3">
                            {notif?.createdAt
                              ? new Date(notif.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                              }) +
                              " " +
                              new Date(notif.createdAt).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })
                              : "Just now"}
                          </span>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-3">No new notifications</p>
              )}
            </div>
          )}
        </div>

        {/* User Role */}
        <span className="text-sm text-gray-500">{user?.role || "User"}</span>

        {/* Profile Image */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={getFullImageUrl(user?.profileImage)}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-lg w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

