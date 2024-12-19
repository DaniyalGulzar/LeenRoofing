import React, { useEffect, useState } from "react";

// Define the type for statsData
type StatsPeriod = "All Time" | "Week" | "Month";

type StatsProps = {
  statsData: any;
};

const Stats: React.FC<StatsProps> = ({ statsData }) => {
  // State to hold the selected period, explicitly typed to the valid periods
  const [selectedPeriod, setSelectedPeriod] = useState<StatsPeriod>("All Time");

  return (
    <div className="border   w-full bg-white min-w-[200px] ">
      {/* Top Section with Two Texts */}
      <div className="flex flex-col md:flex-row justify-between whitespace-nowrap  px-[15px] pt-[15px] pb-[10px] md:px-[20px] md:pt-[20px] md:pb-[15px]  items-center  ">
        <div className="text-left">
          <span className="text-[16px] font-semibold text-[#2C3D33]">
            Stats
          </span>
        </div>
        <div className="flex text-right text-[9px] space-x-2  md:mt-0 ">
          {["All Time", "Week", "Month"].map((period) => (
            <span
              key={period}
              className={`text-sm cursor-pointer ${
                selectedPeriod === period
                  ? "text-[#4A8C67] font-bold"
                  : "hover:text-[#4A8C67] "
              }`}
              onClick={() => setSelectedPeriod(period as StatsPeriod)}
            >
              {period}
            </span>
          ))}
        </div>
      </div>
      <div className="border border-b border-gray-100 "></div>

      {/* Bottom Section with 5 Values and Text */}
      <div className="grid gap-4  grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  px-[15px] pt-[15px] pb-[10px] md:px-[20px] md:pt-[20px] md:pb-[15px]">
        <div className="text-left ">
          <p className=" font-semibold text-[12px] text-[#4A8C67] ">
            {statsData?.total}
          </p>

          <p className="  text-gray-500 text-[16px]">Total</p>
        </div>
        <div className="text-left ">
          <p className="text-[12px] font-semibold text-[#4A8C67] ">
            {statsData?.in_progress}
          </p>

          <p className=" text-gray-500  text-[16px]">In Progress</p>
        </div>
        <div className="text-left ">
          <p className="text-[12px] font-semibold text-[#4A8C67] ">
            {statsData?.urgent}
          </p>

          <p className=" text-gray-500  text-[16px]">Urgent</p>
        </div>
        <div className="text-left ">
          <p className="text-[12px] font-semibold text-[#4A8C67]">
            {statsData?.archived}
          </p>

          <p className=" text-gray-500 text-[16px]">Archived</p>
        </div>
        <div className="text-left ">
          <p className="text-[12px] font-semibold text-[#4A8C67]  ">
            {statsData?.completed}
          </p>
          <p className=" text-gray-500 text-[16px]">Completed</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
