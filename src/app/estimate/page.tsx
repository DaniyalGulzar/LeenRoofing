"use client";

import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import EstimateCard from "@/components/EstimateCard";
import EstimateCard2 from "@/components/Estimatecard2";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Dropdown, Menu } from "antd";
import withAuth from "@/app/auth/auth/authHOC";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { DownOutlined } from "@ant-design/icons";

function EstimatePage() {
  const [isGridView, setIsGridView] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any>([]);
  const { data: session }: any = useSession();
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any>(null);

  const router = useRouter();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleRecordingComplete = async (audioBlob: any, index: number) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.mp3");

    try {
      setLoading(true);
      const token = session.token;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/file/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const completeFilePath = `${process.env.NEXT_PUBLIC_API_BASE_PATH}${response.data.path}`;
      setItems(completeFilePath);

      toast.success("Audio note uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload audio.");
    } finally {
    }
  };

  const handleMenuClick = (e: any) => {
    setSelectedValue(e.key); // Updates the selected value
  };

  const AudioNoteItem = ({ index, onRecordingComplete }: any) => {
    const recorderControls = useAudioRecorder();
    return (
      <AudioRecorder
        recorderControls={recorderControls}
        onRecordingComplete={(audioData) =>
          onRecordingComplete(audioData, index)
        }
      />
    );
  };

  useEffect(() => {
    if (items) {
      localStorage.setItem("link", items);
      router.push(`/estimate-new`);
    }
  }, [items]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/list?sortBy=${selectedValue}&orderBy=${selectedValue1}&status=${selectedValue2}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecords(response.data.result);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session, selectedValue, selectedValue1, selectedValue2]);


  const handleMenuClick1 = (e: any) => {
    setSelectedValue1(e.key); // Updates the selected value
  };

  const handleMenuClick2 = (e: any) => {
    setSelectedValue2(e.key); // Updates the selected value
  };

  const sortBy_menu = (
    <Menu onClick={handleMenuClick}>
      {/* <Menu.Item key="Order By">Order By</Menu.Item> */}
      <Menu.Item key="Name">Name</Menu.Item>
      <Menu.Item key="Cost">Cost</Menu.Item>
      <Menu.Item key="Status">Status</Menu.Item>
      <Menu.Item key="Created">Created</Menu.Item>
      <Menu.Item key="Reviewed">Reviewed</Menu.Item>
    </Menu>
  );

  const orderBy_menu = (
    <Menu onClick={handleMenuClick1}>
      {/* <Menu.Item key="Order By">Order By</Menu.Item> */}
      <Menu.Item key="Asc">Asc</Menu.Item>
      <Menu.Item key="Desc">Desc</Menu.Item>
    </Menu>
  );

  const Status = (
    <Menu onClick={handleMenuClick2}>
      <Menu.Item key="Completed">Completed</Menu.Item>
      <Menu.Item key="Archived">Archived</Menu.Item>
      <Menu.Item key="Urgent">Urgent</Menu.Item>
      <Menu.Item key="In Progress">In Progress</Menu.Item>
      <Menu.Item key="Draft">Draft</Menu.Item>
    </Menu>
  );



  return (
    <>
      <Loader loading={loading} />
      <div className="h-[100vh] overflow-auto bg-gray-100">
        <AuthWrapper title={`Welcome Back, ${session?.user?.name}`}>
          <div className="w-full px-[20px] md:px-[48px] pt-[15px] md:pt-[35px]">
            {/* Top Section with Two Texts */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-[19px]">
              {/* Heading */}
              <div className="w-full sm:w-auto sm:mr-auto mb-4 sm:mb-0">
                <span className="text-[#2C3D33] text-[20px]">My Estimates</span>
              </div>

              {/* Right Side: Dropdowns and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto space-y-4 sm:space-y-0">
                {/* Dropdowns in One Line */}
                <div className="flex sm:flex-row sm:space-x-2 w-full sm:w-auto items-center gap-2 md:gap-0 space-y-2 sm:space-y-0 flex-wrap justify-end">
                  {/* Sort By Dropdown */}
                  <div className="relative">
                    <Dropdown overlay={sortBy_menu} trigger={["click"]}>
                      <button className="border border-gray-300 rounded-lg p-2 flex justify-center items-center text-xs text-[#4A8C67]">
                        {selectedValue || "Sort By"}
                        <DownOutlined className="ml-2" />{" "}
                      </button>
                    </Dropdown>
                  </div>

                  {/* Order By Dropdown */}
                  <div className="relative">
                    <Dropdown overlay={orderBy_menu} trigger={["click"]}>
                      <button className="border border-gray-300 rounded-lg p-2 flex justify-center items-center text-xs text-[#4A8C67]">
                        {selectedValue1 || "Order By"}
                        <DownOutlined className="ml-2" />{" "}
                      </button>
                    </Dropdown>
                  </div>

                  {/* Status Dropdown */}
                  <div className="relative flex items-center">
                    <Dropdown overlay={Status} trigger={["click"]}>
                      <button className="border border-gray-300 rounded-lg p-2 flex justify-center items-center text-xs text-[#4A8C67]">
                        {selectedValue2 || "Status"}
                        <DownOutlined className="ml-2" />{" "}
                      </button>
                    </Dropdown>
                  </div>

                  <div className="flex items-center justify-end space-x-2">
                    <div
                      className={`flex justify-center items-center w-[32px] rounded-md h-[32px] cursor-pointer ${activeIndex === 0 ? "bg-gray-200" : "bg-white"
                        } hover:bg-green-100`}
                      onClick={() => {
                        setIsGridView(true);
                        handleClick(0);
                      }}
                    >
                      <Image
                        src="/svgs/boxes4.svg"
                        width={12}
                        height={12}
                        alt="Icon 1"
                      />
                    </div>
                    <div
                      className={`flex justify-center items-center rounded-md w-[32px] h-[32px] cursor-pointer ${activeIndex === 1 ? "bg-gray-200" : "bg-white"
                        } hover:bg-green-100`}
                      onClick={() => {
                        setIsGridView(false);
                        handleClick(1);
                      }}
                    >
                      <Image
                        src="/svgs/listline.svg"
                        width={12}
                        height={12}
                        alt="Icon 2"
                      />
                    </div>

                    <Button
                      onClick={openModal}
                      className="font-semibold text-[10px] w-[77px] h-[32px] bg-[#F2BE22] rounded-3xl"
                    >
                      ADD NEW
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-b border-gray-200 mb-[27px]" />

            {records.length !== 0 ? (
              <div className="overflow-y-auto overflow-x-hidden max-h-[800px] pl-0 pr-4">
                <div
                  className={`grid grid-cols-1   ${isGridView && "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    } gap-[24px]`}
                >
                  {records.map((card: any, index: number) => (
                    <>
                      {isGridView ? (
                        <EstimateCard
                          card={card}
                          key={index}
                          fetchData={fetchData}
                          setLoading={setLoading}
                        />
                      ) : (
                        <EstimateCard2
                          card={card}
                          key={index}
                          fetchData={fetchData}
                          setLoading={setLoading}
                        />
                      )}
                    </>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border bg-white rounded-lg  w-full h-[460px] px-4 py-8 md:py-6 sm:justify-center sm:items-center">
                <Image
                  src="/svgs/empty-archive.svg"
                  width={157}
                  height={157}
                  alt="basket"
                  className="mb-5"
                />
                <p className="text-[25px] mb-1 text-center">
                  You haven’t added any estimates yet
                </p>
                <span className="text-[12px] mb-8 text-center">
                  Start creating professional roofing estimates in minutes.
                </span>

                <Button
                  onClick={openModal}
                  className="bg-[#F2BE22] font-semibold text-black h-[48px] w-[116px] text-[15px] rounded-full"
                >
                  ADD NEW
                </Button>
              </div>
            )}
          </div>
        </AuthWrapper>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg  w-[400px] p-5 relative">
              {/* Close button positioned at the modal's top-right */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Estimate Recording</h2>
              </div>
              <div className="flex justify-center items-center">
                <AudioNoteItem onRecordingComplete={handleRecordingComplete} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default withAuth(EstimatePage);
