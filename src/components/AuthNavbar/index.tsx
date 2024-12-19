"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { FaChevronDown } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";

interface AuthNavbarProps {
  welcomeText?: string;
  onToggleSidebar?: () => void;
  profile?: boolean;
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({
  welcomeText = "",
  onToggleSidebar,
  profile = false,
}): JSX.Element => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const [statsData, setStatsData] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<string>("");
  const [records, setRecords] = useState<any[]>([]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSearchData(value);
  };

  const NotificationData = async () => {
    try {
      if (!session) return;
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/notification/list`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStatsData(response.data.result);
    } catch (error) {
      console.error("Failed to fetch stats data:", error);
    }
  };

  useEffect(() => {
    if (session) {
      NotificationData();
    }
  }, [session]);

  const search = async () => {
    try {
      if (!session) return;
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/search/${searchData}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecords(response.data.result);
    } catch (error) {
      console.error("Failed to fetch stats data:", error);
      toast.error("Error fetching stats data.");
    }
  };

  useEffect(() => {
    if (session && searchData !== "") {
      search();
    }
  }, [session, searchData]);

  const handleResultClick = (id: string) => {
    router.push(`/estimate-detail/${id}`);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div className="bg-white text-black flex justify-between items-center pt-[10px] md:pt-[30px] pb-[10px] md:pb-[27px] px-[20px] md:px-[48px]  h-[87px]">
      <div className="text-[25px] text-[#2C3D33] sm:block">
        <span className="hidden sm:inline">{welcomeText}</span>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <div className="hidden md:block relative">
          <input
            type="text"
            className="w-[300px] mb-0 mt-1 px-2 py-2 border focus:outline-none focus:ring-2 focus:ring-black-500"
            placeholder="Search here..."
            onChange={handleChange}
            value={searchData}
          />
          {searchData && records.length > 0 && (
            <div className="absolute w-full bg-white border rounded  mt-2 z-10">
              {records.map((record, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(record.id)}
                  className="px-4 py-2 text-black cursor-pointer hover:bg-gray-200"
                >
                  {record.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:hidden">
          <Image
            src="/svgs/search.svg"
            alt="Search"
            width={30}
            height={30}
            className="cursor-pointer min-w-[30px] min-h-[30px]"
          />
        </div>

        <div className="relative" ref={notifDropdownRef}>
          <Image
            src="/svgs/Line.svg"
            alt="Notifications"
            width={22}
            height={26}
            className="cursor-pointer min-w-[22px] min-h-[26px]"
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
          />

          {notifDropdownOpen && (
            <div className="absolute left-[80%] right-2 transform -translate-x-[98%] mt-5 p-2 md:w-[250px] lg:w-[300px] max-h-[300px] overflow-auto bg-white border rounded-lg  z-10">
              {statsData.length > 0 ? (
                statsData.map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-center px-2 py-2 text-[#2C3D33] hover:bg-gray-100 w-full font-semibold"
                    title={notification.tooltip || "Notification details"}
                  >
                    {/* Left side - Image */}
                    <img
                      src="./myImages/defaultimage.png"
                      alt="Notification"
                      className="w-8 h-8 rounded-full mr-3"
                    />

                    {/* Center - Notification Text with Date on Right */}
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between text-[12px] text-[#424242]">
                        <span>{notification.text}</span>
                        <span className="text-[10px] whitespace-nowrap">
                          {moment(notification.created_at).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="block px-2 py-2 text-[#2C3D33] font-semibold">
                  No notifications available.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={profileDropdownRef}>
          <button
            className="flex items-center space-x-4 bg-white border-0 p-2 rounded-full text-black"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Image
              src="/svgs/Avatar Image.svg"
              alt="Profile"
              width={50}
              height={50}
              className="w-10 h-10 rounded-full"
            />
            <span className="hidden lg:block">
              {session?.user?.name || "Profile"}
            </span>
            <FaChevronDown className="text-[#4A8C67]" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg  z-10">
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
