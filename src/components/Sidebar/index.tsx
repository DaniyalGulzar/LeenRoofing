import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
// import { useSession } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";

import { useRouter, usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isDashHovered, setIsDashHovered] = useState(false);
  const [isDashClicked, setIsDashClicked] = useState(false);
  const [isEstHovered, setIsEstHovered] = useState(false);
  const [isEstClicked, setIsEstClicked] = useState(false);
  const [isEst2Hovered, setIsEst2Hovered] = useState(false);
  const [isEst2Clicked, setIsEst2Clicked] = useState(false);
  const [isUrgHovered, setIsUrgHovered] = useState(false);
  const [isUrgClicked, setIsUrgClicked] = useState(false);
  const [isArchHovered, setIsArchHovered] = useState(false);
  const [isArchClicked, setIsArchClicked] = useState(false);
  const [isRecordingHovered, setIsRecordingHovered] = useState(false);
  const [isRecordingClicked, setIsRecordingClicked] = useState(false);
  const [isExportHovered, setIsExportHovered] = useState(false);
  const [isExportClicked, setIsExportClicked] = useState(false);
  const [isHelpHovered, setIsHelpHovered] = useState(false);
  const [isHelpClicked, setIsHelpClicked] = useState(false);
  const [isSettHovered, setIsSettHovered] = useState(false);
  const [isSettClicked, setIsSettClicked] = useState(false);
  const [isAccHovered, setIsAccHovered] = useState(false);
  const [isAccClicked, setIsAccClicked] = useState(false);
  const [islogHovered, setIslogHovered] = useState(false);
  const [islogClicked, setIsClicked] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // const handleLogout = () => {
  //   // window.location.href = "/logout";
  //   router.push("/auth/login");
  // };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMinimized(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleItemClick = (path: string) => {
    router.push(path);
  };

  return (
    <div
      ref={sidebarRef}
      className={`top-0 left-0 z-30 ${
        isMinimized ? "w-[80px]" : "w-[300px]"
      } shadow-[4px_0px_6px_0px_rgba(0,0,0,0.1)] bg-[#19221D] h-screen overflow-auto flex flex-col transition-all duration-300`}
    >
      <div
        className={`relative flex ${
          isMinimized ? "sm:justify-start" : "sm:justify-start"
        } sm:flex-col`}
      >
        <Link href="/">
          <Image
            src={isMinimized ? "/svgs/logosmall.svg" : "/myImages/logo.png"}
            alt="Logo"
            width={isMinimized ? 30 : 170}
            height={30}
            className={`${isMinimized ? "ml-3" : "pl-7"} mt-[25px] ${
              isMinimized ? "w-[30px]" : "w-[170px]"
            }`}
          />
        </Link>

        <div className="absolute inset-0 top-20 flex items-center justify-center">
          <hr className="flex-grow border-b border-[#708090]" />
          <Button
            onClick={toggleSidebar}
            className="text-[#708090] text-sm mr-2 ml-2"
            aria-label={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
          >
            {isMinimized ? ">" : "< Minimize"}
          </Button>
        </div>
      </div>

      <div className="mt-[30px] pr-4 h-full flex flex-col">
        <div className="flex flex-col flex-grow">
          {!isMinimized && (
            <p className="pl-7 mt-8 text-[#FFFFFF50]">Main Menu</p>
          )}
          <div>
            <Link
              href="/dashboard"
              onClick={() => {
                handleItemClick("/dashboard");
                setIsDashClicked(true);
              }}
              aria-label="Dashboard"
            >
              <div
                className={`flex items-center rounded-r-lg p-3 mb-2 transition-colors duration-300 text-[#708090] hover:text-white hover:bg-[#4A8C67] ${
                  pathname === "/dashboard" ? "bg-[#4A8C67] text-white" : ""
                }`}
                onMouseEnter={() => setIsDashHovered(true)}
                onMouseLeave={() => setIsDashHovered(false)}
              >
                <Image
                  src={
                    isDashHovered || isDashClicked || pathname === "/dashboard"
                      ? "/svgs/yellowdash.svg" // Image to show on hover or click
                      : "/svgs/dashboard1.svg" // Default image
                  }
                  alt="dashboard"
                  className="ml-3 h-6 w-6 transition-transform duration-300"
                  height={22}
                  width={22}
                />
                {!isMinimized && (
                  <span
                    className={`pl-3 text-lg font-medium ${
                      pathname === "/dashboard" ? "text-white" : ""
                    }`}
                  >
                    Dashboard
                  </span>
                )}
              </div>
            </Link>

            <Link
              href="/estimate"
              onClick={() => {
                handleItemClick("/estimate2");
                setIsEstClicked(true);
              }}
              aria-label="Estimates"
            >
              <div
                className={`flex items-center p-3 mb-2 rounded-r-lg transition-colors duration-300 text-[#708090] hover:text-white hover:bg-[#4A8C67] ${
                  pathname === "/estimate" ? "bg-[#4A8C67] text-white" : ""
                }`}
                onMouseEnter={() => setIsEstHovered(true)}
                onMouseLeave={() => setIsEstHovered(false)}
              >
                <Image
                  src={
                    isEstHovered || isEstClicked || pathname === "/estimate"
                      ? "/svgs/yellowest.svg" // Image on hover or click
                      : "/svgs/estimate.svg" // Default image
                  }
                  alt="Estimates"
                  className="ml-3 h-6 w-6 transition-colors duration-300"
                  height={22}
                  width={22}
                />
                {!isMinimized && (
                  <span
                    className={`text-lg font-medium pl-3 ${
                      pathname === "/estimate" ? "text-white" : ""
                    }`}
                  >
                    Estimates
                  </span>
                )}
              </div>
            </Link>

            <Link
              href="/urgencies"
              onClick={() => {
                handleItemClick("/urgencies");
                setIsUrgClicked(true); // Maintain click functionality
              }}
              className={`flex items-center p-3 mb-2 rounded-r-lg transition-colors duration-300 text-[#708090] hover:text-white hover:bg-[#4A8C67] ${
                pathname === "/urgencies" ? "bg-[#4A8C67] text-white" : ""
              }`}
              onMouseEnter={() => setIsUrgHovered(true)} // Hover effect for changing image
              onMouseLeave={() => setIsUrgHovered(false)} // Reset on mouse leave
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center">
                  <Image
                    src={
                      isUrgHovered || isUrgClicked || pathname === "/urgencies"
                        ? "/svgs/yellowtime.svg" // Image on hover or click
                        : "/svgs/graytime.svg" // Default image
                    }
                    alt="Urgencies"
                    className="ml-3 h-6 w-6 transition-colors duration-300"
                    height={22}
                    width={22}
                  />
                  {!isMinimized && (
                    <span
                      className={`pl-3 text-lg font-medium ${
                        pathname === "/urgencies" ? "text-white" : ""
                      }`}
                    >
                      Urgencies
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <Link
              href="/estimate-archieve"
              onClick={() => {
                handleItemClick("/estimate-archieve");
                setIsArchClicked(true); // Set hover state on click (optional)
              }}
              className={`flex items-center p-3 mb-2 rounded-r-lg transition-colors duration-300 text-[#708090] hover:text-white hover:bg-[#4A8C67] ${
                pathname === "/estimate-archieve"
                  ? "bg-[#4A8C67] text-white"
                  : ""
              }`}
              onMouseEnter={() => setIsArchHovered(true)} // Hover effect for changing image
              onMouseLeave={() => setIsArchHovered(false)} // Reset on mouse leave
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center">
                  <Image
                    src={
                      isArchHovered ||
                      isArchClicked ||
                      pathname === "/estimate-archieve" // Image change on hover or active path
                        ? "/svgs/inbox1.svg" // Image on hover or active path
                        : "/svgs/inboxarchive.svg" // Default image
                    }
                    alt="Estimate Archive"
                    className="ml-3 h-6 w-6 transition-colors duration-300"
                    height={22}
                    width={22}
                  />
                  {!isMinimized && (
                    <span
                      className={`pl-3 text-lg font-medium ${
                        pathname === "/estimate-archieve" ? "text-white" : ""
                      }`}
                    >
                      Archives
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <Link
              href="/recording"
              onClick={() => {
                handleItemClick("/recording");
                setIsRecordingClicked(true); // Optional: Set hover state on click
              }}
              className={`flex items-center p-3 mb-2 rounded-r-lg transition-colors duration-300 text-[#708090] hover:text-white hover:bg-[#4A8C67] ${
                pathname === "/recording" ? "bg-[#4A8C67] text-white" : ""
              }`}
              onMouseEnter={() => setIsRecordingHovered(true)} // Hover effect for changing image
              onMouseLeave={() => setIsRecordingHovered(false)} // Reset on mouse leave
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center">
                  <Image
                    src={
                      isRecordingHovered ||
                      isRecordingClicked ||
                      pathname === "/recording" // Change image on hover or active path
                        ? "/svgs/mic1.svg" // Image on hover or active path
                        : "/svgs/recording.svg" // Default image
                    }
                    alt="Recording"
                    className="ml-3 h-6 w-6 transition-colors duration-300"
                    height={22}
                    width={22}
                  />
                  {!isMinimized && (
                    <span
                      className={`pl-3 text-lg font-medium ${
                        pathname === "/recording" ? "text-white" : ""
                      }`}
                    >
                      Recording
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <Link
              href="/export"
              onClick={() => {
                handleItemClick("/export");
                setIsExportClicked(true); // Optional: Set hover state on click
              }}
              aria-label="Export"
              onMouseEnter={() => setIsExportHovered(true)} // Hover effect for changing image
              onMouseLeave={() => setIsExportHovered(false)} // Reset on mouse leave
            >
              <div
                className={`flex items-center p-3 mb-2 rounded-r-lg transition-colors duration-300 text-[#708090] hover:text-white hover:bg-[#4A8C67] ${
                  pathname === "/export" ? "bg-[#4A8C67] text-white" : ""
                }`}
              >
                <Image
                  src={
                    isExportHovered || isExportClicked || pathname === "/export" // Change image on hover or active path
                      ? "/svgs/share1.svg" // Image on hover or active path
                      : "/svgs/export.svg" // Default image
                  }
                  alt="Export"
                  className={`ml-3 h-6 w-6 transition-colors duration-300`}
                  height={22}
                  width={22}
                />
                {!isMinimized && (
                  <span
                    className={`pl-3 text-lg font-medium ${
                      pathname === "/export" ? "text-white" : ""
                    }`}
                  >
                    Export
                  </span>
                )}
              </div>
            </Link>
          </div>

          {!isMinimized && (
            <p className="pl-7 text-[#FFFFFF50] mt-5">Help & Account</p>
          )}

          <div>
            <Link
              href="/help-center"
              onClick={() => {
                handleItemClick("/help-center");
                setIsHelpClicked(true); // Optional: Set hover state on click
              }}
              aria-label="Help Center"
              onMouseEnter={() => setIsHelpHovered(true)} // Hover effect for changing image
              onMouseLeave={() => setIsHelpHovered(false)} // Reset on mouse leave
            >
              <div
                className={`flex items-center p-3 mb-2 rounded-r-lg text-[#708090] hover:text-white hover:bg-[#4A8C67] transition-colors duration-300 ${
                  pathname === "/help-center" ? "bg-[#4A8C67] text-white" : ""
                }`}
              >
                <Image
                  src={
                    isHelpHovered ||
                    isHelpClicked ||
                    pathname === "/help-center" // Change image on hover or active path
                      ? "/svgs/help1.svg" // Image on hover or active path
                      : "/svgs/helpcenter.svg" // Default image
                  }
                  alt="Help Center"
                  className="ml-3 h-6 w-6 transition-colors duration-300"
                  height={22}
                  width={22}
                />
                {!isMinimized && (
                  <span
                    className={`pl-3 text-lg font-medium ${
                      pathname === "/help-center" ? "text-white" : ""
                    }`}
                  >
                    Help Center
                  </span>
                )}
              </div>
            </Link>

            <Link
              href="/my-account"
              onClick={() => {
                handleItemClick("/my-account");
                setIsAccClicked(true); // Optional: Set hover state on click
              }}
              className={`flex items-center p-3 mb-2 rounded-r-lg text-[#708090] hover:text-white hover:bg-[#4A8C67] transition-colors duration-300 ${
                pathname === "/my-account" ? "bg-[#4A8C67] text-white" : ""
              }`}
              onMouseEnter={() => setIsAccHovered(true)} // Hover effect for changing image
              onMouseLeave={() => setIsAccHovered(false)} // Reset on mouse leave
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center">
                  <Image
                    src={
                      isAccHovered || isAccClicked || pathname === "/my-account" // Change image on hover or active path
                        ? "/svgs/user1.svg" // Image on hover or active path
                        : "/svgs/profile.svg" // Default image
                    }
                    alt="My Account"
                    className="ml-3 h-6 w-6 transition-colors duration-300"
                    height={22}
                    width={22}
                  />
                  {!isMinimized && (
                    <span
                      className={`pl-3 text-lg font-medium ${
                        pathname === "/my-account" ? "text-white" : ""
                      }`}
                    >
                      My Account
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <div>
              {/* The Logout Button */}
              <Link href="#">
                <div
                  className={`flex items-center p-3 mb-2 rounded-r-lg transition-colors duration-300 text-[#708090] hover:text-white hover:bg-[#4A8C67] ${
                    pathname === "#" ? "bg-[#4A8C67] text-white" : ""
                  }`}
                  onClick={handleOpenModal}
                  onMouseEnter={() => setIslogHovered(true)}
                  onMouseLeave={() => setIslogHovered(false)}
                >
                  <Image
                    src={
                      islogHovered || pathname === "#"
                        ? "/svgs/logout1.svg"
                        : "/svgs/exit.svg"
                    }
                    alt="logout"
                    className="ml-3 h-6 w-6 transition-colors duration-300"
                    height={22}
                    width={22}
                  />
                  {!isMinimized && (
                    <span
                      className={`pl-3 text-lg font-medium ${
                        pathname === "#" ? "text-white" : ""
                      }`}
                    >
                      Logout
                    </span>
                  )}
                </div>
              </Link>

              {/* Modal for logout confirmation */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  {/* Overlay with blur effect */}
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                    onClick={handleCloseModal}
                  ></div>

                  {/* Modal Content with larger width */}
                  <div className="relative bg-white p-8 rounded-lg  z-10 w-full max-w-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                      Are you sure you want to logout?
                    </h2>
                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={handleLogout}
                        className="bg-[#4A8C67] text-white px-6 py-2 rounded hover:bg-[#4A8C67]"
                      >
                        Logout
                      </Button>
                      <Button
                        onClick={handleCloseModal}
                        className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
