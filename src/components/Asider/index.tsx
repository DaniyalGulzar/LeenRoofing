import React from "react";
import Image from "next/image";
import AudioPlayer from "../AudioPlayer";

interface AsiderProps {
  statsData: any;
}

export const Asider: React.FC<AsiderProps> = ({ statsData }) => {
  return (
    <>
      <div className="w-full ">
        <div className="flex justify-center items-center overflow-auto h-[158px] mb-6 bg-white w-full  py-[45px] px-[60px]">
          <div className="flex gap-[24px]">
            <Image
              src="/myImages/question.png"
              width={31}
              height={31}
              alt="Question"
            />
            <Image
              src="/myImages/control.png"
              width={31}
              height={31}
              alt="Control"
            />
            <Image src="/myImages/user.png" width={31} height={31} alt="User" />
            <Image src="/myImages/exit.png" width={31} height={31} alt="Exit" />
          </div>
        </div>

        {/* Recordings Section */}
        {statsData && (
          <div className="bg-white w-full ">
            <div className="flex justify-between items-center  px-[15px] pt-[5px] pb-[5px] md:px-[20px] md:pt-[10px] md:pb-[10px]">
              <span className="text-[16px] text-[#2C3D33]">Recordings</span>
              <span className="text-[7px] font-bold cursor-pointer">
                VIEW ALL
              </span>
            </div>
            <hr className="border-gray-300 " />

            <div className="flex flex-col space-y-4  bg-[#FAFAFA] px-[15px] pt-[15px] pb-[15px] md:px-[20px] md:pt-[20px] md:pb-[20px] gap-2">
              {statsData.recordings.map((recording: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center w-full"
                >
                  <div className="flex flex-col items-start w-[60px] md:items-start">
                    <span className="text-[9px] text-[#2C3D33] font-semibold">
                      {recording.type}
                    </span>
                    <span className="text-[8px]">Length: 11:00</span>
                  </div>
                  <AudioPlayer
                    key={index}
                    audio={recording.content}
                    className="h-[40px] lg:w-[120px] w-full mt-2 md:mt-0 ml-2"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-white  border  w-full h-[190px] mt-[14px]">
          <div className="flex justify-between items-center px-[15px] pt-[5px] pb-[5px] md:px-[20px] md:pt-[10px] md:pb-[10px]">
            <span className="text-[16px] text-[#2C3D33]">Urgencies</span>
            <span className="text-[7px] font-bold cursor-pointer">
              VIEW ALL
            </span>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-center items-center flex-col mt-4">
            <span className="text-3xl text-red-500">
              {statsData?.urgencies}
            </span>
            <p className="text-lg text-[#2C3D33]">marked as urgent</p>
          </div>
        </div>
      </div>
    </>
  );
};
