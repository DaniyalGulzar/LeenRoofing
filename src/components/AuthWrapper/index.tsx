"use client";
import React, { useState } from "react";
import AuthNavbar from "../AuthNavbar";
import Sidebar from "../Sidebar";

interface AuthWrapperProps {
  children: React.ReactNode;
  title?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className={`flex flex-col overflow-auto h-[100vh] transition-opacity w-full duration-300 ${isSidebarOpen ? "opacity-50" : "opacity-100"}`}>
        <AuthNavbar welcomeText={title} onToggleSidebar={handleToggleSidebar} />
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
