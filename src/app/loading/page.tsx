"use client";
import Image from "next/image";
import { Progress } from "antd";
import React, { useState, useEffect } from "react";

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          window.location.href = "/auth/login"; // Navigate to the next page
          return 100; // Ensure progress stays at 100
        }
        return prev + 2.5; // Increment progress by 2.5 (100/40) to reach 100 in 4 seconds
      });
    }, 100); // 100ms for each increment (40 increments total for 4 seconds)

    return () => clearInterval(interval);
  }, []); // No dependencies, runs once on mount

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#4A8C67] p-4">
      <div className="relative mb-8">
        <Image
          src="/svgs/mainlogo.svg"
          width={591}
          height={107}
          alt="Logo"
          className="max-w-full h-auto" // Responsive image
        />
      </div>
      <div className="absolute bottom-10 w-full px-4 max-w-[591px]">
        <Progress
          percent={progress}
          strokeColor="#F2BE22"
          showInfo={false}
          size="small"
        />
      </div>
      <div className="text-[13px] text-white">Version 1.0.1</div>
    </div>
  );
};

export default LoadingScreen;
