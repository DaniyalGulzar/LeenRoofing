"use client";
import React from "react";
import Logo from "../../../../public/myImages/logo.png";
import Man from "../../../../public/myImages/workingman.png";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Image from "next/image";

const SignupPage = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Section with Background and Images */}
        <div className="hidden md:flex md:w-[600px] w-full bg-[#4A8C67] relative items-center justify-center">
          {/* First Image (Logo) - Centered on large screens */}
          <div className="absolute top-52 left-0 right-0 bottom-0 z-30 flex items-center justify-center md:justify-start md:items-start md:p-8 lg:justify-center">
            <Image
              src={Logo}
              alt="logo"
              width={100}
              height={50}
              className="w-[200px] md:w-[322px] h-[40px] md:h-[48px]"
            />
          </div>

          {/* Second Image (Man) */}
          <Image
            src={Man}
            alt="workingman"
            width={100}
            height={50}
            className="absolute bottom-0 right-0 z-20 w-full h-[300px] md:h-[500px]"
          />
        </div>

        {/* Right Section for Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full  p-4 bg-white">
            <p className="text-3xl md:text-5xl text-center">
              {" "}
              Welcome To Sign Up
            </p>

            <div className="col-span-12 mt-14">
              <form className="">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <InputField
                    type="text"
                    required={true}
                    name="first_name"
                    placeholder="First Name"
                  />
                  <InputField
                    // label="Last Name"
                    type="text"
                    required={true}
                    name="last_name"
                    placeholder="Last Name"
                  />
                  <InputField
                    // label="Email"
                    type="email"
                    required={true}
                    name="email"
                    placeholder="Email"
                  />
                  <InputField
                    // label="Password"
                    type="password"
                    required={true}
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex justify-center  my-[20px] gap-10">
                  <Button
                    type="submit"
                    className="w-[100px] md:w-[175px] h-[48px] md:h-[56px] rounded-3xl mt-10 items-center flex justify-center py-2 px-4 bg-[#4A8C67] text-white hover:bg-[#4A8C67]"
                  >
                    SIGN UP
                  </Button>
                  <Button
                    type="button"
                    className="w-[100px] md:w-[175px] h-[48px] md:h-[56px] rounded-3xl mt-10 items-center flex justify-center py-2 px-4 bg-[#4A8C67] text-white hover:bg-[#4A8C67]"
                  >
                    LOG IN
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
