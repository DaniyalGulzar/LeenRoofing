"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Logo from "../../../../public/svgs/greenlogo.svg";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Loader from "@/components/Loader";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loginData, setLoginData] = useState({ email: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Assume some API or logic to handle forgot password request here
      // e.g., await sendForgotPasswordRequest(loginData.email);
      toast.success("Password reset email sent!");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Logo at the top-left corner on small screens */}
        <div className="block md:hidden absolute top-4 left-4">
          <Image
            src={Logo}
            alt="logo"
            width={190}
            height={90}
            className="w-[150px] h-auto"
          />
        </div>

        <div className="hidden md:flex md:w-[597px] w-full items-center justify-center">
          {/* Second Image (Man) */}
          <Image
            src="/svgs/loginimage.svg"
            alt="login image"
            width={100}
            height={50}
            className="min-w-[597px]"
          />
        </div>

        {/* Right Section for Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md p-4 bg-white text-center">
            {/* Heading */}
            <div className="flex flex-col md:flex-row justify-center items-center">
              <p className="text-[45px] text-center text-[#2C3D33]">
                FORGOT PASSWORD
              </p>
            </div>

            {/* Form */}
            <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
              <div>
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 md:py-4 border focus:outline-none focus:ring-2 focus:ring-black-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-[200px] md:w-[245px] h-[48px] md:h-[56px] text-[17px] rounded-3xl mt-10 flex items-center justify-center py-2 px-4 bg-[#4A8C67] text-white hover:bg-[#4A8C67]"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
