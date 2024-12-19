"use client";

import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import EstimateCard from "@/components/EstimateCard";
import EstimateCard2 from "@/components/Estimatecard2";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Dropdown, Menu } from "antd";
import withAuth from "@/app/auth/auth/authHOC";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { DownOutlined } from "@ant-design/icons";

function UrgenciesPage() {
  const [isGridView, setIsGridView] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any>([]);
  const { data: session }: any = useSession();
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue1, setSelectedValue1] = useState("");

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/list?sortBy=${selectedValue}&orderBy=${selectedValue1}&status=Urgent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecords(response.data.result);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session, selectedValue, selectedValue1]);

  const handleMenuClick = (e: any) => {
    setSelectedValue(e.key); // Updates the selected value
  };
  const handleMenuClick1 = (e: any) => {
    setSelectedValue1(e.key); // Updates the selected value
  };

  const sortBy_menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Name">Name</Menu.Item>
      <Menu.Item key="Cost">Cost</Menu.Item>
      <Menu.Item key="Status">Status</Menu.Item>
      <Menu.Item key="Created">Created</Menu.Item>
      <Menu.Item key="Reviewed">Reviewed</Menu.Item>
    </Menu>
  );

  const orderBy_menu = (
    <Menu onClick={handleMenuClick1}>
      <Menu.Item key="Asc">Asc</Menu.Item>
      <Menu.Item key="Desc">Desc</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Loader loading={loading} />
      <div className="h-[100vh] overflow-auto bg-gray-100">
        <AuthWrapper title={`Welcome Back, ${session?.user?.name}`}>
          <div className="w-full px-[20px] md:px-[48px] pt-[15px] md:pt-[35px]">
            {/* Top Section with Two Texts */}
            <div className="flex flex-col md:flex-row justify-between mb-[19px] items-center">
              <div className="w-full sm:w-auto sm:mr-auto mb-4 sm:mb-0">
                <span className="text-[#2C3D33] text-[20px]">Urgencies</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto space-y-4 sm:space-y-0">
                {/* Dropdowns in One Line */}
                <div className="flex sm:flex-row sm:space-x-2 w-full sm:w-auto items-center gap-2 md:gap-0 space-y-2 sm:space-y-0 flex-wrap justify-end">
                  {/* Sort By Dropdown */}
                  <div className="relative">
                    <Dropdown overlay={sortBy_menu} trigger={["click"]}>
                      <button className="border border-gray-300 rounded-lg p-2 flex justify-center items-center text-xs text-[#4A8C67]">
                        {selectedValue || "Sort By"}
                        <DownOutlined className="ml-2" />{" "}
                      </button>
                    </Dropdown>
                  </div>

                  {/* Order By Dropdown */}
                  <div className="relative">
                    <Dropdown overlay={orderBy_menu} trigger={["click"]}>
                      <button className="border border-gray-300 rounded-lg p-2 flex justify-center items-center text-xs text-[#4A8C67]">
                        {selectedValue1 || "Order By"}
                        <DownOutlined className="ml-2" />{" "}
                      </button>
                    </Dropdown>
                  </div>

                  <div className="flex items-center justify-end space-x-2">
                    {/* Icons */}
                    <div
                      className={`flex justify-center items-center rounded-md w-[32px] h-[32px] cursor-pointer ${activeIndex === 0 ? "bg-gray-200" : "bg-white"
                        } hover:bg-green-100`}
                      onClick={() => {
                        setIsGridView(true);
                        handleClick(0);
                      }}
                    >
                      <Image
                        src="/svgs/boxes4.svg"
                        width={12}
                        height={12}
                        alt="Icon 1"
                      />
                    </div>
                    <div
                      className={`flex justify-center items-center rounded-md w-[32px] h-[32px] cursor-pointer ${activeIndex === 1 ? "bg-gray-200" : "bg-white"
                        } hover:bg-green-100`}
                      onClick={() => {
                        setIsGridView(false);
                        handleClick(1);
                      }}
                    >
                      <Image
                        src="/svgs/listline.svg"
                        width={12}
                        height={12}
                        alt="Icon 2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-b border-gray-200 mb-[27px]" />
            {records.length !== 0 ? (
              <div className="overflow-y-auto overflow-x-hidden max-h-[800px] pl-0 pr-4">
                <div
                  className={`grid grid-cols-1 ${isGridView && "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    } gap-[24px]`}
                >
                  {records.map((card: any, index: number) => (
                    <>
                      {isGridView ? (
                        <EstimateCard
                          card={card}
                          key={index}
                          fetchData={fetchData}
                          setLoading={setLoading}
                        />
                      ) : (
                        <EstimateCard2
                          card={card}
                          key={index}
                          fetchData={fetchData}
                          setLoading={setLoading}
                        />
                      )}
                    </>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border bg-white rounded-lg  w-full h-[460px] px-4 py-8 md:py-6 sm:justify-center sm:items-center">
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

                <Link href="">
                  <Button className="bg-[#F2BE22] font-semibold text-black h-[48px] w-[116px] text-[15px] rounded-full">
                    ADD NEW
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </AuthWrapper>
      </div>
    </>
  );
}

export default withAuth(UrgenciesPage);
