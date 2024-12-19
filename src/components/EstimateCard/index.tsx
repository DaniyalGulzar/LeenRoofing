"use client";

import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";

type EstimateCardProps = {
  card: any;
  fetchData: any;
  setLoading: any;
};

const EstimateCard: React.FC<EstimateCardProps> = ({
  card,
  fetchData,
  setLoading,
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
        className={`border bg-white rounded-md transition-transform transform hover:scale-105 mb-[10px] 
    ${card.status === "Urgent" ? "bg-[#FFD6D6]" : ""} 
    ${card.status === "Completed" ? "hover:bg-green-100" : ""}`}
      >
        <div className="flex flex-col sm:flex-row items-center px-[5px] md:px-[27px] py-[10px] md:py-[24px] space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
          <div className="flex justify-center items-center rounded-full w-[54px] h-[54px]">
            {card.status === "Completed" && (
              <Image
                src={"/svgs/completed.svg"}
                width={54}
                height={54}
                alt="Status Icon"
                className="rounded-full min-w-[54px] min-h-[54px]"
              />
            )}
            {card.status === "Draft" && (
              <Image
                src={"/svgs/Draftimage.svg"}
                width={54}
                height={54}
                alt="Status Icon"
                className="rounded-full min-w-[54px] min-h-[54px]"
              />
            )}
            {card.status === "In Progress" && (
              <>
                {card.is_archived === 1 ? (
                  <Image
                    src={"/svgs/archived.svg"}
                    width={54}
                    height={54}
                    alt="Status Icon"
                    className="rounded-full min-w-[54px] min-h-[54px]"
                  />
                ) : (
                  (card.is_urgent === 1 ||
                    card.is_urgent === 0 ||
                    card.is_archived === 0) && (
                    <Image
                      src={"/svgs/inprogress.svg"}
                      width={54}
                      height={54}
                      alt="Status Icon"
                      className="rounded-full min-w-[54px] min-h-[54px]"
                    />
                  )
                )}
              </>
            )}
          </div>

          <div className="flex-1 w-[50%]">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-4 md:gap-6 lg:gap-8">
              <Tooltip title={card.name}>
                <div
                  onClick={() => handleDetails(card.id)}
                  className="text-[16px] text-center sm:text-left truncate text-ellipsis overflow-hidden whitespace-nowrap sm:w-[100%] md:max-w-[200px] w-full cursor-pointer"
                >
                  {card.name}
                </div>
              </Tooltip>

              <span
                className={`p-[5px] text-[7px] text-white rounded whitespace-nowrap ${
                  card.status === "Completed"
                    ? "bg-green-500"
                    : card.status === "In Progress"
                    ? "bg-yellow-500"
                    : card.status === "Draft" || card.status === "Archived"
                    ? "bg-gray-500"
                    : "bg-red-500"
                }`}
              >
                {card.status}
              </span>
            </div>

            <span className="text-[12px] text-[#424242] mt-1 block flex-wrap">
              Estimate Created on{" "}
              {moment(card.created_at).format("M/D/YY h:mm A")}
            </span>
            <span className="text-[12px] text-[#424242] truncate block">
              Last Reviewed:{" "}
              {card.last_reviewed
                ? moment(card.last_reviewed).fromNow()
                : "N/A"}
            </span>
          </div>
        </div>

        <hr className="border-gray-300" />
        <div
          className={`flex flex-col md:flex-row rounded-md justify-between items-center cursor-pointer bg-[#F2F2F2] px-[10px] md:px-[27px] py-[7px] ${
            card.status === "Urgent" ? "hover:bg-[#E8D0D0]" : ""
          }`}
        >
          <span className="text-[#424242] text-[11px]">ACTIONS</span>
          <div className="flex space-x-2">
            <>
              {card.status === "Completed" && (
                <span
                  onClick={() => handleInCompleteEstimate(card.id)}
                  className="text-xs cursor-pointer"
                >
                  Mark Incomplete
                </span>
              )}
              {card.is_archived === 1 && (
                <span
                  onClick={() => handleunArchivedEstimate(card.id)}
                  className="text-xs cursor-pointer"
                >
                  Unarchive
                </span>
              )}
              {!(card.status === "Completed" || card.is_archived === 1) && (
                <>
                  <Image
                    onClick={handleCSV}
                    src="/svgs/csv.svg"
                    width={16}
                    height={16}
                    alt="CSV"
                  />
                  <Image
                    onClick={() => handleCompleteEstimate(card.id)}
                    src="/svgs/checkbox.svg"
                    width={16}
                    height={16}
                    alt="Checkbox"
                  />
                  <Image
                    onClick={() => handleArchivedEstimate(card.id)}
                    src="/svgs/folder.svg"
                    width={16}
                    height={16}
                    alt="Folder"
                  />
                  {card.is_urgent === 1 ? (
                    <Image
                      onClick={() => handleNotUrgentEstimate(card.id)}
                      src="/svgs/redfast.svg"
                      width={16}
                      height={16}
                      alt="Time"
                    />
                  ) : (
                    <Image
                      onClick={() => handleUrgentEstimate(card.id)}
                      src="/svgs/Time.svg"
                      width={16}
                      height={16}
                      alt="Time"
                    />
                  )}
                </>
              )}
              <Image
                src="/svgs/editpen.svg"
                width={16}
                height={16}
                alt="Edit"
                onClick={() => handleEdit(card.id)}
              />
              <Image
                onClick={() => handleDeleteEstimate(card.id)}
                src="/svgs/basket.svg"
                width={16}
                height={16}
                alt="Basket"
                className="cursor-pointer"
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstimateCard;
