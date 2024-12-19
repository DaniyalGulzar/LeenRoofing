"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Logo from "../../../../public/svgs/greenlogo.svg";
import Man from "../../../../public/myImages/workingman.png";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Link from "next/link";
import useLogin from "./useLogin";
import Loader from "@/components/Loader";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { loginData, handleChange, handleSubmit, loading } = useLogin();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  return (
    <>
      <Loader loading={loading} />
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Logo at the top-left corner on small screens */}
        <div className="block md:hidden absolute top-4 left-4 ">
          <Image
            src={Logo}
            alt="logo"
            width={190}
            height={90}
            className="w-[150px] h-auto" // Adjust size as needed
          />
        </div>

        <div className="hidden md:flex md:w-[597px] w-full items-center justify-center h-screen">
          {/* Second Image (Man) */}
          <Image
            src="/svgs/loginimage.svg"
            alt="login image"
            width={100}
            height={50}
            className="min-w-[597px] "
          />
        </div>

        {/* Right Section for Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md p-4 text-center bg-white">
            <p className="text-[45px] text-center text-[#2C3D33] ">
              Welcome Back
            </p>
            <span className="text-[#424242] ml-4 text-center text-base">
              Lorem Ipsum door iset emit,
            </span>
            <span className="text-[#424242] text-base">
              consecutor adisping elit.
            </span>

            <span className="flex justify-center text-center text-base text-[#424242] mt-1">
              Nullam ut interdum tellus.
            </span>

            <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
              <div>
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="User ID"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 md:py-4 border focus:outline-none focus:ring-2 focus:ring-black-500"
                />
              </div>

              <div>
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 md:py-4 border focus:outline-none focus:ring-2 focus:ring-black-500"
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="radio"
                    className="h-18 w-18 text-gray-300 focus:ring-[#424242] border-gray-200"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-[#424242] text-[14px]"
                  >
                    Keep me logged in
                  </label>
                </div>

                <div className="mt-4 md:mt-0">
                  <Link
                    href="/auth/forgot-password"
                    className="underline text-[#4A8C67] text-[14px]"
                  >
                    Forgot ID or Password?
                  </Link>
                </div>
              </div>

              {/* Sign In Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-[200px] md:w-[245px] h-[48px] md:h-[56px] text-[17px] rounded-3xl mt-10 items-center flex justify-center py-2 px-4 bg-[#4A8C67] text-white hover:bg-[#4A8C67]"
                >
                  LOG IN
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
