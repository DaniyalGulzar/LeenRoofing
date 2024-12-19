"use client";
import React from "react";
import Logo from "../../../../public/svgs/greenlogo.svg";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Image from "next/image";

const RestPassword = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="block md:hidden absolute top-4 left-4">
          <Image
            src={Logo}
            alt="logo"
            width={190}
            height={90}
            className="w-[200px] h-auto"
          />
        </div>

        <div className="hidden md:flex md:w-[597px] w-full items-center justify-center">
          <Image
            src="/svgs/loginimage.svg"
            alt="login image"
            width={100}
            height={50}
            className="min-w-[597px] "
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md p-4  text-center bg-white">
            {" "}
            <p className="text-[45px] text-center text-[#2C3D33]">
              RESET PASSWORD
            </p>
            <form className="mt-10 space-y-4">
              <div>
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="w-[100%]  px-4 py-4 md:py-4 border focus:outline-none focus:ring-2 focus:ring-black-500" // Centered input with specific width
                />
              </div>
              <div>
                <InputField
                  type="password"
                  placeholder=" Confirm Password"
                  id="confirm_password"
                  required
                  className="w-[100%] px-4 py-4 md:py-4 border focus:outline-none focus:ring-2 focus:ring-black-500" // Centered input with specific width
                />
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-[200px] md:w-[245px] h-[48px] md:h-[56px] text-[17px] rounded-3xl mt-10 items-center flex justify-center py-2 px-4 bg-[#4A8C67] text-white hover:bg-[#4A8C67]"
                >
                  Change Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestPassword;
