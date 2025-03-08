import { Outlet } from "react-router-dom";
import Sidebar from "../component/Main/Sidebar/Sidebar";
import Header from "../component/Main/Header/Header";
import { useState } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <main className="w-full  min-h-screen  flex ">
      <Sidebar isSidebarOpen={isSidebarOpen}  toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <section className="w-full h-full">
        <div className="md:ml-[330px] z-10 sticky top-0 left-0">
          <Header toggleSidebar={toggleSidebar} />
        </div>
        <div className="">
          {/* bg-[#FAFBFC] */}
          <div className="md:ml-[340px] md:px-3 pt-4">
          <Outlet />
        </div>
        </div>
      </section>

      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </main>
  );
};
export default MainLayout;
