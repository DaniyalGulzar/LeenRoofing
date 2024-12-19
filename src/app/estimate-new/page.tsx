"use client";
import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { Collapse, Select } from "antd";
import Image from "next/image";
import InputField from "@/components/InputField";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import withAuth from "@/app/auth/auth/authHOC";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const AudioNoteItem = ({ index, onRecordingComplete }: any) => {
  const recorderControls = useAudioRecorder();
  return (
    <AudioRecorder
      recorderControls={recorderControls}
      onRecordingComplete={(audioData) => onRecordingComplete(audioData, index)}
    />
  );
};

const Estimatedetailnew = () => {
  const { data: session }: any = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const link = localStorage.getItem("link");
  const [isOpen, setIsOpen] = useState(false);

  const [items, setItems] = useState<any>([]);
  const [audioItems, setAudioItems] = useState<any>(null);
  const [activeKey, setActiveKey] = useState<string | string[]>("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (audioItems) handleAnalyze(audioItems);
  }, [audioItems]);

  const handleRecordingComplete = async (audioBlob: any, index: number) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.mp3");

    try {
      setLoading(true);
      const token = session.token;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/file/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const completeFilePath = `${process.env.NEXT_PUBLIC_API_BASE_PATH}${response.data.path}`;
      setAudioItems(completeFilePath);

      toast.success("Audio note uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload audio.");
    } finally {
    }
  };

  const handleChangeKey = (key: string | string[]) => {
    setActiveKey(key); // Update active key
  };

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "",
    cost: "",
    status: "In Progress",
  });

  const options = [
    { value: "individual", label: "Individual" },
    { value: "org", label: "Organization" },
  ];

  const handleAnalyze = async (link: any) => {
    try {
      setLoading(true);
      const token = session.token;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/file/analyze`,
        {
          url: link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedItems =
        response.data.final_result.estimates[0].estimate.items;

      // Add the required string property to each item
      const updatedItems = fetchedItems.map((item: any) => {
        // Construct the dimension string dynamically
        let dimensionString = "";
        if (item.has_dimension) {
          if (item.dimension_1) {
            dimensionString += `Dimension: ${item.dimension_1} feet`;
          }
          if (item.dimension_1 && item.dimension_2) {
            dimensionString += ` × ${item.dimension_2} feet`;
          }
          if (item.dimension_1 && item.dimension_2 && item.dimension_3) {
            dimensionString += ` × ${item.dimension_3} feet`;
          }
        }

        return {
          ...item,
          description: `Quantity: ${item.quantity}\n${dimensionString}`,
        };
      });

      // Update state
      setItems(updatedItems);

      // Update formData
      setFormData({
        ...formData,
        name: response.data.final_result.estimates[0].estimate.property
          .property_name,
        address:
          response.data.final_result.estimates[0].estimate.property
            .property_address,
      });

      closeModal();
    } catch (error: any) {
      console.error(
        "File upload failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyze(link);
  }, [link]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let formattedValue = value;
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleFieldChange = (
    index: number,
    field: string,
    value: string | number | boolean
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = session.token;
      const payload = {
        ...formData,
        items,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/store`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/estimate");
    } catch (error: any) {
      setLoading(false);
      console.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const saveDraft = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = session.token;
  
      // Create a payload with the 'type' set to 'draft'
      const payload = {
        ...formData,
        status: 'Draft',
        items,
      };
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/store`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      router.push("/estimate");
    } catch (error: any) {
      setLoading(false);
      console.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Loader loading={loading} />
      <div className="h-[100vh] overflow-auto bg-gray-100">
        <AuthWrapper title={`Welcome Back, ${session?.user?.name}`}>
          <div className="md:px-[48px] md:pt-[35px] px-[30px] pt-[25px] w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-[19px]">
                <div className="w-full sm:w-auto sm:mr-auto  sm:mb-0">
                  <div className="text-sm text-gray-700  md:mb-0 text-left">
                    <div className="flex flex-row items-center space-x-1">
                      <Link href="/dashboard">
                        <span className="text-[12px] text-[#4A8C67]">
                          Dashboard
                        </span>
                      </Link>
                      <span className="inline">.</span>
                      <Link href="/estimate">
                        <span className="text-[12px] text-[#4A8C67]">
                          Estimate
                        </span>
                      </Link>
                      <span className="inline">.</span>
                      <Link href="/">
                        <span className="text-[12px] cursor-pointer">
                          Add New Estimate
                        </span>
                      </Link>
                    </div>

                    <span className="text-[20px] text-[#2C3D33] mt-[4px] block font-semibold">
                      Add new estimate
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 w-full md:w-auto space-y-4 sm:space-y-0">
                  <div className="flex sm:flex-row sm:space-x-2 w-full  items-end gap-2 md:gap-0 space-y-2 sm:space-y-0 flex-wrap justify-end">
                    <div className="flex space-x-2">
                      <Button type="button" onClick={saveDraft} className="text-[10px] font-semibold p-2 text-white rounded-3xl bg-[#4A8C67] cursor-pointer h-[30px] w-[80px] md:h-[37px] md:w-[122px] ">
                        SAVE DRAFT
                      </Button>
                      <Button
                        type="submit"
                        className="text-[10px] font-semibold p-2 bg-[#F2BE22] text-black rounded-3xl cursor-pointer h-[30px] w-[80px] md:h-[37px] md:w-[122px] "
                      >
                        SAVE
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-b border-gray-200 mb-[26px]" />

              <div className="border rounded-lg   bg-white">
                <div className="flex flex-col md:flex-row justify-between  px-[31px]  py-[23px] items-center ">
                  <div className="w-full sm:w-auto sm:mr-auto mb-4 sm:mb-0">
                    <span className="text-[#2C3D33] text-[20px]">
                      My Estimates
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 w-full md:w-auto space-y-4 sm:space-y-0">
                    <div className="flex sm:flex-row sm:space-x-2 w-full  items-end gap-2 md:gap-0 space-y-2 sm:space-y-0 flex-wrap justify-end">
                      <div className="flex space-x-2">
                        <Button className="font-semibold text-[#818181] text-[10px] p-2 bg-[#CECECE] h-[23px] w-[75px] cursor-pointer">
                          NORMAL
                        </Button>
                        <Button className="font-semibold text-white text-[10px] p-2 bg-[#E35959]   h-[23px] w-[75px]cursor-pointer">
                          URGENT
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="mb-2" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[21px] px-[31px] py-[30px]">
                  <InputField
                    type="text"
                    required={true}
                    name="name"
                    value={formData.name}
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    required={true}
                    name="address"
                    value={formData.address}
                    placeholder="Full Address"
                    onChange={handleChange}
                  />
                  <InputField
                    type="number"
                    required={true}
                    name="phone"
                    value={formData.phone}
                    placeholder="Contact Phone"
                    onChange={handleChange}
                  />
                  <InputField
                    type="email"
                    required={true}
                    name="email"
                    value={formData.email}
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <InputField
                    type="select"
                    required={true}
                    placeholder="Type (Individual/Org)"
                    name="type"
                    value={formData.type}
                    options={options}
                    onChange={handleChange}
                  />

                  {/* <Select
                    placeholder="Filled"
                    options={options}
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full h-[48px] p-2 mt-1"
                  /> */}
                  <InputField
                    type="number"
                    required={true}
                    name="cost"
                    value={formData.cost}
                    placeholder="Total Cost"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>

            <div className="mt-[21px]">
              {items.length > 0 &&
                items.map((item: any, index: number) => (
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
                          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 w-full">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) =>
                                handleFieldChange(index, "name", e.target.value)
                              }
                              className="text-[16px] sm:text-[20px] text-[#2C3D33] border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
                              autoFocus
                            />
                            {/* Uncomment this span if you want to display a name */}
                            {/* <span className="text-[16px] sm:text-[20px] text-[#2C3D33]">
    {item.name}
  </span> */}
                          </div>
                        }
                        key={index.toString()}
                      >
                        <div className="mb-[17px] grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Quantity and Dimensions Section */}
                          <div className="bg-white rounded-lg  border p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                              <span className="text-[12px] font-semibold text-[#424242] mb-2 sm:mb-0">
                                DETAILS
                              </span>
                            </div>
                            <div className="overflow-auto space-y-3">
                              <textarea
                                rows={10}
                                value={item.description}
                                onChange={(e) =>
                                  handleFieldChange(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="   rounded p-1 text-gray-700 w-full focus:outline-gray-200"
                              />
                            </div>
                          </div>

                          {/* Notes Section */}
                          <div className="bg-white rounded-lg  border p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                              <span className="text-[12px] font-semibold text-[#424242] mb-2 sm:mb-0">
                                ADDITIONAL NOTES
                              </span>
                            </div>
                            <div className="overflow-auto space-y-3">
                              <textarea
                                rows={10}
                                value={item.notes || ""}
                                onChange={(e) =>
                                  handleFieldChange(
                                    index,
                                    "notes",
                                    e.target.value
                                  )
                                }
                                className="   rounded p-1 text-gray-700 w-full focus:outline-gray-200"
                                placeholder="Enter additional notes..."
                              />
                            </div>
                          </div>
                        </div>
                      </Collapse.Panel>
                    </Collapse>
                  </div>
                ))}
            </div>
          </div>
        </AuthWrapper>
        <div className="absolute right-10 bottom-10">
          <div
            onClick={openModal}
            className="flex justify-center items-center rounded-full w-[82px] h-[82px] bg-[#4A8C67] mt-20"
          >
            <Image
              src="/svgs/microphone.svg"
              className="  w-[38px] h-[38px] object-cover cursor-pointer "
              width={100}
              height={50}
              alt="logo"
              priority
            />
          </div>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg  w-[400px] p-5 relative">
              {/* Close button positioned at the modal's top-right */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Estimate Recording</h2>
              </div>
              <div className="flex justify-center items-center">
                <AudioNoteItem onRecordingComplete={handleRecordingComplete} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default withAuth(Estimatedetailnew);
