import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Stats2Props {
  records: any; // Replace `any[]` with the specific type if available
  fetchData: () => void;
}

const Stats2: React.FC<Stats2Props> = ({ records, fetchData }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session }: any = useSession();
  const router = useRouter();

  const handleDeleteEstimate = async (id: any) => {
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
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUrgentEstimate = async (id: any) => {
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
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleNotUrgentEstimate = async (id: any) => {
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
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleArchivedEstimate = async (id: any) => {
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
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleunArchivedEstimate = async (id: any) => {
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
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteEstimate = async (id: any) => {
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
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleInCompleteEstimate = async (id: any) => {
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
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: any) => {
    router.push(`/estimate-edit/${id}`);
  };

  return (
    <>
      {records.length != 0 && (
        <div className="flex flex-col md:flex-row gap-[19px]">
          <div className="bg-white rounded-lg p-4 w-full flex flex-col md:flex-row items-center gap-4  md:w-[calc(50%-117px)] mx-auto">
            <div className="flex justify-center items-center rounded-full min-w-[70px] w-[70px] h-[70px] bg-[#dbe8e1]">
              <Image
                src="/svgs/estimatepic.svg"
                width={29}
                height={29}
                alt="Profile"
                className="rounded min-w-[29px] min-h-[29px]"
              />
            </div>
            <div className="flex flex-col items-center md:items-start w-[calc(100%-90px)]">
              <p className="text-[21px] text-[#2C3D33] mb-[2px]">
                {records.name}
              </p>

              <div
                className="text-[15px] text-center md:text-left truncate w-[100%]"
                title={`Estimate created: ${moment(records.created_at).format(
                  "M/D/YY h:mm A"
                )}`}
              >
                Estimate created:{" "}
                {moment(records.created_at).format("M/D/YY h:mm A")}
              </div>

              <div
                className="text-[15px] text-center md:text-left truncate w-[100%]"
                title={`Last reviewed: ${
                  records.last_reviewed
                    ? moment(records.last_reviewed).format("M/D/Y h:mm A")
                    : "N/A"
                }`}
              >
                Last reviewed:{" "}
                {records.last_reviewed
                  ? moment(records.last_reviewed).format("M/D/Y h:mm A")
                  : "N/A"}
              </div>
            </div>
          </div>

          <div className="bg-white  rounded-lg p-4 sm:p-6 flex flex-col justify-center items-center w-full md:w-[234px]">
            <p className="text-2xl text-[#2C3D33] sm:text-3xl mb-2">Total</p>

            <span className="text-2xl sm:text-3xl font-bold text-green-500">
              {records.cost}
            </span>
          </div>

          <div className="bg-white rounded-lg p-3 md:p-4 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2 sm:space-x-4 w-full md:w-[calc(50%-117px)]">
            <span
              className={`p-[7px] text-[10px] text-white rounded whitespace-nowrap ${
                records.status === "Completed"
                  ? "bg-green-500"
                  : records.status === "In Progress"
                  ? "bg-yellow-500"
                  : records.status === "Draft" || records.status === "Archived"
                  ? "bg-gray-500"
                  : "bg-red-500"
              }`}
            >
              {records.status}
            </span>
            <div className="flex flex-wrap justify-center items-center gap-2">
              {records.status === "Completed" && (
                <span
                  onClick={() => handleInCompleteEstimate(records.id)}
                  className="text-xs cursor-pointer"
                >
                  Mark Incomplete
                </span>
              )}
              {records.is_archived === 1 && (
                <span
                  onClick={() => handleunArchivedEstimate(records.id)}
                  className="text-xs cursor-pointer"
                >
                  Unarchive
                </span>
              )}
              {!(
                records.status === "Completed" || records.is_archived === 1
              ) && (
                <>
                  <Image
                    className="cursor-pointer"
                    src="/svgs/csv.svg"
                    width={26}
                    height={26}
                    alt="CSV"
                  />
                  <Image
                    className="cursor-pointer"
                    onClick={() => handleCompleteEstimate(records.id)}
                    src="/svgs/checkbox.svg"
                    width={26}
                    height={26}
                    alt="Checkbox"
                  />
                  <Image
                    className="cursor-pointer"
                    onClick={() => handleArchivedEstimate(records.id)}
                    src="/svgs/folder.svg"
                    width={26}
                    height={26}
                    alt="Folder"
                  />
                  {records.is_urgent === 1 ? (
                    <Image
                      className="cursor-pointer"
                      onClick={() => handleNotUrgentEstimate(records.id)}
                      src="/svgs/redfast.svg"
                      width={26}
                      height={26}
                      alt="Time"
                    />
                  ) : (
                    <Image
                      className="cursor-pointer"
                      onClick={() => handleUrgentEstimate(records.id)}
                      src="/svgs/Time.svg"
                      width={26}
                      height={26}
                      alt="Time"
                    />
                  )}
                </>
              )}
              <Image
                className="cursor-pointer"
                onClick={() => handleEdit(records.id)}
                src="/svgs/editpen.svg"
                width={26}
                height={26}
                alt="Edit"
              />
              <Image
                className="cursor-pointer"
                onClick={() => handleDeleteEstimate(records.id)}
                src="/svgs/basket.svg"
                width={26}
                height={26}
                alt="Basket"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stats2;
