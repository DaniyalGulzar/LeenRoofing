"use client";
import { Asider } from "@/components/Asider";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import Stats from "@/components/Stats";
import EstimateCard from "@/components/EstimateCard";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import withAuth from "@/app/auth/auth/authHOC";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const AudioNoteItem = ({ index, onRecordingComplete }: any) => {
  const recorderControls = useAudioRecorder();
  return (
    <AudioRecorder
      recorderControls={recorderControls}
      onRecordingComplete={(audioData) => onRecordingComplete(audioData, index)}
    />
  );
};

interface Stats {
  users: number;
  resellers: number;
  cvs: number;
  revenue: number | null;
}

function Dashboard() {
  const { data: session }: any = useSession();
  const [statsData, setStatsData] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any>(null);

  const router = useRouter();

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

  useEffect(() => {
    if (items) {
      localStorage.setItem("link", items);
      router.push(`/estimate-new`);
    }
  }, [items]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!session) return;
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/dashboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStatsData(response.data.result);
    } catch (error) {
      console.error("Failed to fetch stats data:", error);
      toast.error("Error fetching stats data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Loader loading={loading} />

      <div className=" relative h-[100vh] overflow-auto bg-gray-100">
        <AuthWrapper title={`Welcome Back, ${session?.user?.name}`}>
          <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 gap-[16px] w-full md:px-[48px] md:pt-[37px] p-6">
            {/* 1st div */}
            <div className="col-span-12 xl:col-span-8 lg:col-span-8 md:col-span-12 w-full mb-[57px]">
              <div className="mb-6">
                <Stats statsData={statsData} />
              </div>

              <div className="bg-[#FFFFFF]  ">
                <div className="flex flex-col sm:flex-row justify-between px-[15px] pt-[15px] pb-[10px] md:px-[20px] md:pt-[20px] md:pb-[15px] items-center">
                  <span className="text-[#2C3D33] text-[16px] font-semibold">
                    Active Estimates
                  </span>
                  <div className="flex flex-col sm:flex-row items-center">
                    <Link href="estimate">
                      <span className="font-semibold p-2 text-[9px] cursor-pointer">
                        VIEW ALL
                      </span>
                    </Link>
                    <Button
                      onClick={openModal}
                      className="font-semibold text-[9px] p-2 bg-[#F2BE22] rounded-3xl cursor-pointer"
                    >
                      ADD NEW
                    </Button>
                  </div>
                </div>
                <hr className="border-b border-gray-100 mb-[23px]" />

                {statsData && statsData.estimates.length !== 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-[24px] px-[15px] pb-[15px] md:px-[20px] md:pb-[20px]">
                    {statsData.estimates.map((card: any, index: number) => (
                      <EstimateCard
                        card={card}
                        key={index}
                        fetchData={fetchData}
                        setLoading={setLoading}

                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center bg-white rounded-lg w-full h-[460px] px-4 py-8 md:py-6 sm:justify-center sm:items-center">
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
            </div>
            {/* 2nd div */}
            <div className="col-span-12 xl:col-span-4 lg:col-span-4 md:col-span-12 lg:block w-full ">
              <Asider statsData={statsData} />
            </div>
          </div>
        </AuthWrapper>
        <div className="absolute right-10 bottom-10">
          <div
            onClick={openModal}
            className="flex justify-center items-center rounded-full w-[82px] h-[82px] bg-[#4A8C67] mt-20"
          >
            <Image
              src="/svgs/microphone.svg"
              className="  w-[38px] h-[38px] object-cover cursor-pointer "
              width={100}
              height={50}
              alt="logo"
              priority
            />
          </div>
        </div>

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

export default withAuth(Dashboard);
