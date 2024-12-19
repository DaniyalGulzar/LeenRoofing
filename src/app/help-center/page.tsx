import AuthWrapper from "@/components/AuthWrapper";
import React from "react";

const HelpCenter = () => {

  return (
    <div className="h-[100vh] overflow-auto bg-gray-100">
      <AuthWrapper title="Welcome Back, Tony">
        <div className="flex justify-center items-center h-screen bg-[#4A8C67]">
          <p className="text-6xl font-bold text-white">Coming Soon</p>
        </div>
      </AuthWrapper>
    </div>
  );
};

export default HelpCenter;
