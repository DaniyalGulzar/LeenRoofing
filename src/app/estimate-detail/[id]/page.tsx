"use client";
import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";
import Stats2 from "@/components/Stats2";
import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Link from "next/link";
import withAuth from "@/app/auth/auth/authHOC";
import { useParams } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";

const Estimatedetail = () => {
  const [records, setRecords] = useState<any>(null);
  const { data: session }: any = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const id = params?.id as string | undefined;

  const showData = async () => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/show/${id}`,
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
    showData();
  }, [session, id]);

  const [activeKey, setActiveKey] = useState<string | string[]>("");

  const handleChangeKey = (key: string | string[]) => {
    setActiveKey(key);
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="h-[100vh] overflow-auto bg-gray-100">
        <AuthWrapper title={`Welcome Back, ${session?.user?.name}`}>
          {records && (
            <div className="px-[20px] md:px-[48px] pt-[15px] md:pt-[35px] w-full">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-[19px]">
                <div className="w-full sm:w-auto sm:mr-auto mb-4 sm:mb-0">
                  <div className="text-sm text-gray-700 mb-2 md:mb-0">
                    <div className="flex items-center space-x-1">
                      <Link href="/dashboard">
                        <span className="text-[12px] text-[#4A8C67]">
                          Dashboard
                        </span>
                      </Link>
                      <span>.</span>
                      <Link href="/estimate">
                        <span className="text-[12px] text-[#4A8C67]">
                          Estimate
                        </span>
                      </Link>
                      <span>.</span>
                      <Link href="/">
                        <span className="text-[12px]">{records.name}</span>
                      </Link>
                    </div>
                    <span className="text-[20px] text-[#2C3D33] block mt-[4px]">
                      Estimates For{" "}
                      <span className=" text-[#2C3D33] font-semibold">
                        {records.name}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto  sm:space-y-0">
                  {/* Dropdowns in One Line */}
                  <div className="flex sm:flex-row sm:space-x-2 w-full sm:w-auto items-center gap-2 md:gap-0  sm:space-y-0 flex-wrap justify-end">
                    <div className="flex   space-y-0 md:space-x-4">
                      {/* <Link href="/export">
                      <Button className="text-[10px] text-[#4A8C67] mt-[10px] w-full md:w-auto">
                        Export
                      </Button>
                    </Link>
                    <Button className="text-[10px] text-[#4A8C67] w-full md:w-auto">
                      Update Estimate
                    </Button>
                    <Button className="text-[10px] p-2 bg-[#4A8C67] text-white rounded-3xl cursor-pointer w-[122px] h-[37px]">
                      Add New Detail
                    </Button> */}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-b border-gray-200 mb-[26px]" />

              <div className="w-full">
                {records && <Stats2 records={records} fetchData={showData} />}
              </div>

              <div className="mt-[21px]">
                {records.items &&
                  records.items.length > 0 &&
                  records.items.map((item: any, index: any) => (
                    <div className="mb-[17px]" key={index}>
                      <Collapse
                        activeKey={activeKey}
                        onChange={handleChangeKey}
                        className="bg-white"
                        expandIconPosition="end"
                        bordered={true}
                        expandIcon={({ isActive }) => (
                          <span
                            style={{
                              color: isActive ? "#4A8C67" : "#4A8C67",
                              fontSize: "14px",
                              paddingTop: "8px",
                            }}
                          >
                            {isActive ? <UpOutlined /> : <DownOutlined />}
                          </span>
                        )}
                      >
                        <Collapse.Panel
                          header={
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                              <span className="text-[20px] text-[#2C3D33]">
                                {item.name}
                              </span>
                            </div>
                          }
                          key={index.toString()} // Unique key for each panel
                        >
                          <div className="mb-[17px] grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg  border p-4">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                                <span className="text-[12px] font-semibold text-[#424242] mb-2 sm:mb-0">
                                  DETAILS
                                </span>
                                <div className="flex items-center space-x-1">
                                  {/* <span className="text-[12px] font-semibold text-[#E35959]">
                                  START RECORDING
                                </span> */}
                                </div>
                              </div>
                              <div className="overflow-auto h-40 p-2">
                                <div className="text-gray-700 text-[12px] flex flex-col items-start h-full space-y-2">
                                  <div className="whitespace-pre-line">
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white rounded-lg  border p-4">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                                <span className="text-[12px] font-semibold text-[#424242] mb-2 sm:mb-0">
                                  ADDITIONAL NOTES
                                </span>
                                <div className="flex items-center space-x-1">
                                  {/* <span className="text-[12px] font-semibold text-[#E35959]">
                                  START RECORDING
                                </span> */}
                                </div>
                              </div>
                              <div className="overflow-auto h-40 p-2">
                                <div className="text-gray-700 text-[12px] flex items-start h-full">
                                  {item.notes
                                    ? item.notes
                                    : "No additional notes available."}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Collapse.Panel>
                      </Collapse>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </AuthWrapper>
      </div>
    </>
  );
};

export default withAuth(Estimatedetail);
