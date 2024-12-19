"use client";
import AuthWrapper from "@/components/AuthWrapper";
import EstimateCard from "@/components/EstimateCard";
import React, { useEffect, useState, useRef } from "react";
import { Dropdown, Menu } from "antd";
import { useSession } from "next-auth/react";
import axios from "axios";
import withAuth from "@/app/auth/auth/authHOC";
import Loader from "@/components/Loader";
import { DownOutlined } from "@ant-design/icons";

function Recording() {
  const { data: session }: any = useSession();
  const [records, setRecords] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [recordings, setRecordings] = useState<any>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/list?sortBy=${selectedValue}&orderBy=${selectedValue1}&status=${selectedValue2}`,
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
  }, [session, selectedValue, selectedValue1, selectedValue2]);

  const handleMenuClick = (e: any) => {
    setSelectedValue(e.key);
  };

  const handleMenuClick1 = (e: any) => {
    setSelectedValue1(e.key);
  };

  const handleMenuClick2 = (e: any) => {
    setSelectedValue2(e.key);
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

  const Status = (
    <Menu onClick={handleMenuClick2}>
      <Menu.Item key="Completed">Completed</Menu.Item>
      <Menu.Item key="Archived">Archived</Menu.Item>
      <Menu.Item key="Urgent">Urgent</Menu.Item>
      <Menu.Item key="In Progress">In Progress</Menu.Item>
      <Menu.Item key="Draft">Draft</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Loader loading={loading} />
      <div className="h-[100vh] overflow-auto bg-gray-100">
        <AuthWrapper title={`Welcome Back, ${session?.user?.name}`}>
          <div className="w-full px-[20px] md:px-[48px] pt-[15px] md:pt-[35px]">
            <div className="flex flex-col md:flex-row justify-between mb-[19px] items-center">
              <div className="w-full sm:w-auto sm:mr-auto mb-4 sm:mb-0">
                <span className="text-[#2C3D33] text-[20px]">Recordings</span>
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

                  {/* Status Dropdown */}
                  <div className="relative">
                    <Dropdown overlay={Status} trigger={["click"]}>
                      <button className="border border-gray-300 rounded-lg p-2 flex justify-center items-center text-xs text-[#4A8C67]">
                        {selectedValue2 || "Status"}
                        <DownOutlined className="ml-2" />{" "}
                      </button>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-b border-gray-200 mb-[27px]" />
            <div className="flex flex-col lg:flex-row gap-[23px]">
              {/* // yaha calc lage ga height px me nhi deni */}
              <div className="w-full lg:min-w-[350px] lg:w-[350px] h-[800px] pr-2 pb-2 overflow-auto">
                {/* in this place i want to call my api data  */}
                {records.map((card: any, index: number) => (
                  <EstimateCard
                    card={card}
                    key={index}
                    fetchData={fetchData}
                    setLoading={setLoading}
                  />
                ))}
              </div>

              <div className="flex w-full  md:h-[388px]">
                <div className="bg-white  border md:h-[500px] p-4 w-full">
                  <div className="flex flex-col md:flex-row justify-between mb-[21px] items-center">
                    <span className="text-[20px] text-[#2C3D33] ">
                      Recording for{" "}
                      {records.length > 0 ? records[0].name : "N/A"}
                    </span>
                  </div>
                  <hr className="border-gray-300 mb-[21px]" />
                  <div className="mt-10">
                    {records.length < 0
                      ? records[0].recordings
                      : "not data found"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AuthWrapper>
      </div>
    </>
  );
}

export default withAuth(Recording);
