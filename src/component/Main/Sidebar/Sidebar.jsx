/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import LogoImage from "../../../assets/auth/logo.png";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaBriefcase, FaBuilding, FaCheckSquare,   FaCog,   FaHeadphones,   FaTh,  FaUserTie } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const dynamicSidebarItems = [
  {
    path: "/",
    name: "Overview",
    icon: <FaTh className="size-6" />,
  },
  {
    path: "/allcandidate",
    name: "AllCandidate",
    icon: <FaUserTie  className="size-6" />,
  },
  {
    path: "/shortlist",
    name: "Shortlist",
    icon: <FaUserTie className="size-6" />,
  },
  {
    path: "/alljob",
    name: "Alljobs",
    icon: <FaCheckSquare className="size-6" />,
  },
  {
    path: "/jobpost",
    name: "JobPost",
    icon: <FaBriefcase className="size-6" />,
  },
  {
    path: "/blog",
    name: "BlogPost",
    icon: <FaBuilding className="size-6" />,
  },
  {
    path: "/faq",
    name: "Faq",
    icon: <FaHeadphones className="size-6" />,
  },
  
  {
    path: "/setting",
    name: "Setting",
    icon: <FaCog className="size-6" />,
  },
  
  

 
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };



  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[330px] h-[100vh] bg-[#0741AD] fixed shadow-2xl z-20 ">
        <div className="flex-col flex justify-between items-center py-3 text-white flex-grow">
          <img src={LogoImage} alt="logo" className=" w-[200px] h-[36.297px] bg-[#FEFEFE] " />
        </div>
       
        <div className="flex flex-col justify-between h-[90%]">
          <div>
            <ul className="w-full flex flex-col gap-3 mt-[15px]">
              {dynamicSidebarItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  className={({ isActive }) =>
                    `w-[60%] mx-auto px-2 py-2 flex justify-start items-center gap-3 transition duration-100 ease-linear hover:pl-3 ${
                      isActive
                        ? "bg-[#052E7B] text-[#FEFEFE] rounded-md border-l-4 border-[#FEFEFE]]"
                        : "text-[#FEFEFE]"
                    }`
                  }
                >
                  {item.icon}
                  <h>{t(item.name)}</h>
                </NavLink>
              ))}
            </ul>
          </div>
          <div>
            {/* <div className="border-b border-gray-500"></div> */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-10 py-4 text-rose-500 mt-4 ml-9"
            >
              <RiLogoutCircleRLine className="size-8" />
              <span>{t("Logout")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-[#0741AD] shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col justify-center items-center pt-5 gap-2 text-white">
          <img src={LogoImage} alt="logo" className="w-32 h-12 bg-[#FEFEFE] " />
        </div>
        <ul className="w-full flex flex-col gap-3 mt-[15px]">
          {dynamicSidebarItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                `w-[60%] mx-auto px-2 py-2 flex justify-start items-center gap-3 transition duration-100 ease-linear hover:pl-3 ${
                  isActive
                    ? "bg-[#161D6F] text-white rounded-md border-l-4 border-[#98DED9]"
                    : "text-[#FEFEFE]"
                }`
              }
            >
              {item.icon}
              <h>{t(item.name)}</h>
            </NavLink>
          ))}
        </ul>
        <button
          onClick={() => {
            handleLogout();
            toggleSidebar();
          }}
          className="flex items-center gap-2 px-10 py-4 text-rose-500 ml-9"
        >
          <RiLogoutCircleRLine className="size-8" />
          <span>{t("Logout")}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
