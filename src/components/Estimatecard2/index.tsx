"use client";

import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

// Define the type for statsData
type StatsPeriod = "All Time" | "Week" | "Month";

type EstimateCardProps = {
  card: any;
  fetchData: any;
  setLoading: any
};

const EstimateCard: React.FC<EstimateCardProps> = ({
  card,
  fetchData,
  setLoading
}) => {

  const { data: session }: any = useSession();

  const handleDetails = async (id: any) => {
    setLoading(true);
    router.push(`/estimate-detail/${id}`);
  };

  const handleDeleteEstimate = async (id: any) => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleUrgentEstimate = async (id: any) => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/mark-urgent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleNotUrgentEstimate = async (id: any) => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/mark-not-urgent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleArchivedEstimate = async (id: any) => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/mark-archived/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleunArchivedEstimate = async (id: any) => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/mark-unarchived/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteEstimate = async (id: any) => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/mark-complete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleInCompleteEstimate = async (id: any) => {
    setLoading(true);
    try {
      if (!session) return;

      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/estimate/mark-incomplete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };



  const router = useRouter();
  const handleEdit = async (id: any) => {
    router.push(`/estimate-edit/${id}`);
  };

  const handleCSV = async () => {
    toast.error("Coming soon");
  };

  return (
    <>
      {/* Cards Container */}
      <div
        className={`border bg-white rounded-md  transition-transform transform hover:scale-105 mb-2 min-w-[200px] ${
          card.status === "urgent" ? "bg-red-100" : ""
        } ${
          card.status === "Completed"
            ? "hover:bg-green-100"
            : card.status === "In Progress"
            ? ""
            : card.status === "Archived"
            ? "hover:bg-gray-100"
            : card.status === "urgent"
            ? "hover:bg-pink-100"
            : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center p-3 space-y-2 sm:space-y-0 sm:space-x-4">
          <div
            className={`flex justify-center items-center rounded-full w-[54px] h-[54px] ${
              card.status === "Completed"
                ? "bg-[#4A8C67]"
                : card.status === "Archived"
                ? "bg-[#d4d4d4]"
                : "bg-[#dbe8e1]"
            }`}
          >
            <Image
              src={
                card.status === "Completed"
                  ? "/svgs/Group.svg"
                  : card.status === "Archived"
                  ? "/svgs/inboxbox.svg"
                  : "/svgs/estimatepic.svg"
              }
              width={card.status === "Archived" ? 27 : 21}
              height={card.status === "Archived" ? 27 : 21}
              alt="Profile"
              className="rounded"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              {/* Left section */}
              <div className="flex flex-col items-center sm:items-start">
                <span
                  onClick={() => handleDetails(card.id)}
                  className="font-semibold text-sm sm:text-base cursor-pointer hover:underline"
                >
                  {card.name}
                </span>
                <span className="text-[12px] text-[#424242] mt-1 pl-[17px] md:pl-[0px]">
                  Estimate Created on{" "}
                  {moment(card.created_at).format("M/D/YY h:mm A")}
                </span>
                <span className="text-[12px] text-[#424242] mt-1 truncate">
                  Last Reviewed:{" "}
                  {card.last_reviewed
                    ? moment(card.last_reviewed).fromNow()
                    : "N/A"}
                </span>
              </div>

              {/* Right section */}
              <div className="flex flex-col sm:flex-row items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
                <span
                  className={`p-[5px] text-[7px] text-white rounded-full ${
                    card.status === "Completed"
                      ? "bg-green-500"
                      : card.status === "In Progress"
                      ? "bg-yellow-500"
                      : card.status === "Archived"
                      ? "bg-gray-500"
                      : "bg-red-500"
                  }`}
                >
                  {card.status}
                </span>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  {card.status === "Completed" && (
                    <span
                      onClick={() => handleInCompleteEstimate(card.id)}
                      className="text-xs cursor-pointer pt-1"
                    >
                      Mark Incomplete
                    </span>
                  )}

                  {card.is_archived === 1 && (
                    <span
                      onClick={() => handleunArchivedEstimate(card.id)}
                      className="text-xs cursor-pointer pt-1"
                    >
                      Unarchive
                    </span>
                  )}

                  {!card.is_archived && card.status !== "Completed" && (
                    <>
                      <div
                        onClick={handleCSV}
                        className="px-2 py-1 bg-gray-200 rounded-full text-xs cursor-pointer"
                      >
                        <Image
                          src="/svgs/csv.svg"
                          width={16}
                          height={16}
                          alt="CSV"
                        />
                      </div>
                      <div
                        className="px-2 py-1 bg-gray-200 rounded-full text-xs cursor-pointer"
                        onClick={() => handleCompleteEstimate(card.id)}
                      >
                        <Image
                          src="/svgs/checkbox.svg"
                          width={16}
                          height={16}
                          alt="Checkbox"
                        />
                      </div>
                      <div
                        className="px-2 py-1 bg-gray-200 rounded-full text-xs cursor-pointer"
                        onClick={() => handleArchivedEstimate(card.id)}
                      >
                        <Image
                          src="/svgs/folder.svg"
                          width={16}
                          height={16}
                          alt="Folder"
                        />
                      </div>
                      <div
                        className="px-2 py-1 bg-gray-200 rounded-full text-xs cursor-pointer"
                        onClick={() =>
                          card.is_urgent === 1
                            ? handleNotUrgentEstimate(card.id)
                            : handleUrgentEstimate(card.id)
                        }
                      >
                        <Image
                          src={
                            card.is_urgent === 1
                              ? "/svgs/redfast.svg"
                              : "/svgs/Time.svg"
                          }
                          width={16}
                          height={16}
                          alt="Time"
                        />
                      </div>
                    </>
                  )}

                  <div
                    onClick={() => handleEdit(card.id)}
                    className="px-2 py-1 bg-gray-200 rounded-full text-xs cursor-pointer"
                  >
                    <Image
                      src="/svgs/editpen.svg"
                      width={16}
                      height={16}
                      alt="Edit"
                    />
                  </div>
                  <div
                    className="px-2 py-1 bg-gray-200 rounded-full text-xs cursor-pointer"
                    onClick={() => handleDeleteEstimate(card.id)}
                  >
                    <Image
                      src="/svgs/basket.svg"
                      width={16}
                      height={16}
                      alt="Basket"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstimateCard;
