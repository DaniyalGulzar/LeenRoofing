"use client";
import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";
import Stats2 from "@/components/Stats2";
import React, { useState } from "react";
import withAuth from "@/app/auth/auth/authHOC";
import Image from "next/image";
import InputField from "@/components/InputField";
import Link from "next/link";

const Estimatedetailnew3 = () => {
  const handleChange = (e: any) => {};
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  return (
    <div className="h-[100vh] overflow-auto bg-gray-100">
      <AuthWrapper title="Welcome Back, Tony">
        <div className="px-[20px] md:px-[48px] pt-[15px] md:pt-[35px] w-full">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-[19px]">
            <div className="text-sm text-gray-700 mb-2 md:mb-0">
              <div className="flex items-center space-x-1">
                <Link href="/dashboard">
                  <span className="text-[12px] text-[#4A8C67]">Dashboard</span>
                </Link>
                <span>.</span>
                <Link href="/estimate">
                  <span className="text-[12px] text-[#4A8C67]">Estimate</span>
                </Link>
                <span>.</span>
                <span className="text-[12px] cursor-pointer">
                  Add new Estimate
                </span>
              </div>
              <span className="text-[20px] text-[#2C3D33] mt-[4px] font-semibold block ">
                Add new estimate
              </span>
            </div>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              {/* <Button className="text-xs text-[#4A8C67] w-full md:w-auto">
                Export
              </Button> */}
              <Button className="text-[10px] font-semibold p-2 text-white rounded-3xl bg-[#4A8C67] cursor-pointer h-[37px] w-[122px] ">
                Save draft
              </Button>
              <Button className="text-[10px] font-semibold p-2 bg-[#F2BE22] text-black rounded-3xl cursor-pointer h-[37px] w-[122px] ">
                Publish
              </Button>
            </div>
          </div>

          <hr className="border-b border-gray-200 mb-[26px]" />

          <div className="border rounded-lg   bg-white">
            <div className="flex flex-col md:flex-row justify-between  px-[31px]  py-[23px] items-center ">
              <span className="text-[20px] text-[#2C3D33] ">My Estimates</span>
              <div className="flex space-x-2">
                {/* Add New Button */}
                <Button className="font-semibold text-[#818181] text-[10px] p-2 bg-[#CECECE] h-[23px] w-[75px] cursor-pointer">
                  NORMAL
                </Button>
                {/* Another Button */}
                <Button className="font-semibold text-white text-[10px] p-2 bg-[#E35959]   h-[23px] w-[75px]cursor-pointer">
                  URGENT
                </Button>
              </div>
            </div>

            {/* Divider */}
            <hr className="mb-2" />

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[21px] px-[31px] py-[30px]">
              <InputField
                type="text"
                required={true}
                name="Full Name"
                placeholder="Full Name"
              />
              <InputField
                type="text"
                required={true}
                name="Full Address"
                placeholder="Full Address"
              />
              <InputField
                type="text"
                required={true}
                name="Contact Phone"
                placeholder="Contact Phone"
              />
              <InputField
                type="email"
                required={true}
                name="email"
                placeholder="Email Address"
              />
              <InputField
                type="select"
                required={true}
                name="type (Individual/org)"
                placeholder="Type (Individual/Org)"
                options={options}
                onChange={handleChange}
              />
              <InputField
                type="text"
                required={true}
                name="Total_cost"
                placeholder="Total Cost"
              />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
            <div className=" h-[283px] bg-white rounded-lg  border px-[31px] py-[26px]">
              <div className="flex justify-center sm:justify-start items-center">
                <p className="text-[20px] text-[#2C3D33]">item #1</p>
              </div>
              <div className="overflow-y-auto h-[193px] p-3 border">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                  <span className="text-[12px] text-[#424242] mb-2 sm:mb-0">
                    ROOF DETAILS
                  </span>
                  <div className="flex items-center">
                    <span className="text-[12px] text-[#F2BE22]">
                      RECORDING COMPLETE
                    </span>
                  </div>
                </div>
                <p className="text-[#424242] text-[12px]">
                  1 layer gable roof Split level, walking 6 feet of ice and
                  water shield on top and 3 feet on lower section and garage.
                  Giant metal hailings: stays 1 small on garage ch|
                </p>
              </div>
            </div>

            <div className="h-[283px] bg-white rounded-lg  border px-[31px] py-[26px]">
              <div className="flex justify-center sm:justify-start items-center">
                <p className="text-[20px] text-[#2C3D33]">item #2</p>
              </div>
              <div className="overflow-y-auto h-[193px] p-3 border">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                  <span className="text-[12px] text-[#424242] mb-2 sm:mb-0">
                    ROOF DETAILS
                  </span>
                  <div className="flex items-center">
                    <span className="text-[12px] text-[#4A8C67]">
                      RECORDING COMPLETE
                    </span>
                  </div>
                </div>

                <p className="text-[#424242] text-[12px]">
                  1 layer gable roof Split level, walking 6 feet of ice and
                  water shield on top and 3 feet on lower section and garage.
                  Giant metal hailings: stays 1 small on garage ch|
                </p>
              </div>
            </div>

            <div className="h-[283px] bg-white rounded-lg  border px-[31px] py-[26px]">
              <div className="flex justify-center sm:justify-start items-center">
                <p className="text-[20px] text-[#2C3D33]">item #3</p>
              </div>
              <div className="overflow-y-auto h-[193px] p-3 border">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                  <span className="text-[12px] text-[#424242] mb-2 sm:mb-0">
                    ROOF DETAILS
                  </span>
                  {/* <div className="flex items-center">
                    <span className="text-[12px] text-[#4A8C67]">
                      RECORDING COMPLETE
                    </span>
                  </div> */}
                </div>

                <p className="text-[#424242] text-[12px]">
                  1 layer gable roof Split level, walking 6 feet of ice and
                  water shield on top and 3 feet on lower section and garage.
                  Giant metal hailings: stays 1 small on garage ch|
                </p>
                <div className="flex justify-end mt-20">
                  <Button className=" text-[12px] text-[#4A8C67]  py-1 ">
                    Save
                  </Button>
                  <Button className=" text-[12px] text-black px-4 py-2 rounded">
                    Edit
                  </Button>
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-lg  border  p-4">
              <div className="flex items-center">
                <h3 className="text-lg">item #3</h3>
              </div>
              <div className="flex flex-col justify-center items-center h-[193px] p-3 border">
                <div className="flex items-center">
                  <Image
                    src="/svgs/pause.svg"
                    width={52}
                    height={52}
                    alt="Pause"
                    className="mx-1"
                  />
                  <Image
                    src="/svgs/audiored.svg"
                    width={52}
                    height={52}
                    alt="Audio Red"
                    className="mx-1"
                  />
                </div>
                <Image
                  src="/svgs/newaudio.svg"
                  width={236}
                  height={30}
                  alt="Audionew"
                  className="mx-1 mt-2" // Add margin-top for spacing
                />
                <span className="text-[#424242] text-sm mt-1">1:52</span>
              </div>
            </div> */}
          </div>

          <div className="flex flex-col justify-center items-center mt-[20px] mb-[44px] py-[38px]  border rounded-lg  bg-white cursor-pointer">
            <span className="text-[20px]">Add Notes/Items</span>
            <div className="flex items-center  mt-[24px] gap-[13px]">
              <Image
                src="/svgs/microphoneupdated.svg"
                width={52}
                height={52}
                alt="Image 1"
                className=" min-w-[30px] min-h-[30px] "
              />
              <Image
                src="/svgs/yellowpen.svg"
                width={52}
                height={52}
                alt="Image 2"
                className=" min-w-[30px] min-h-[30px]"
              />
            </div>
          </div>
        </div>
      </AuthWrapper>
    </div>
  );
};

export default withAuth(Estimatedetailnew3);
