"use client";
import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import withAuth from "@/app/auth/auth/authHOC";
import Loader from "@/components/Loader";

const Account = () => {
  const { data: session }: any = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clear the fields when the modal is closed
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage(""); // Reset the error message
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveChanges = async () => {
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
      setLoading(true); // Start loading

      try {
        const token = session.token;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_NEXT_URL}api/password/change`,
          {
            old_password: oldPassword,
            new_password: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Optionally, show success message or redirect after successful password change
        handleCloseModal();
        toast.success("Password Changed");
      } catch (error: any) {
        setLoading(false);
        setErrorMessage("Failed to update password. Please try again.");
        console.error(error.response.data.message); // Log the error
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="h-[100vh] overflow-auto bg-gray-100">
        <AuthWrapper title={`Welcome Back, ${session?.user?.name}`}>
          <div className="w-full px-[48px] pt-[35px]">
            {/* Top Section with Two Texts */}
            <div className="flex flex-col md:flex-row justify-between mb-[19px] items-center">
              <span className="text-[#2C3D33] text-[20px]">My Account</span>

              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
                <Button
                  onClick={handleOpenModal}
                  className="font-semibold text-[10px] w-[120px] h-[32px] bg-[#F2BE22] rounded-3xl cursor-pointer"
                >
                  Change Password
                </Button>
              </div>
            </div>

            <hr className="border-b border-gray-200 mb-[27px]" />

            <div className="bg-white p-6 md:p-8 lg:p-12 rounded-lg  max-w-lg mx-auto flex flex-col items-center">
              <span className="w-full text-center text-[#2C3D33] text-[18px] md:text-[20px] lg:text-[24px] font-semibold mb-4">
                Full Name: {session && session.user.name}
              </span>
              <span className="w-full text-center text-[#2C3D33] text-[18px] md:text-[20px] lg:text-[24px] font-semibold truncate">
                Email: {session && session.user.email}
              </span>
            </div>
          </div>

          {/* Inline Modal for Changing Password */}
          {isModalOpen && (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white w-full max-w-md p-6 rounded-lg ">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Change Password</h2>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-600 hover:text-black"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="p-4">
                    <InputField
                      label="Old Password"
                      type="password"
                      id="old-password"
                      name="oldPassword"
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />

                    <InputField
                      label="New Password"
                      type="password"
                      id="new-password"
                      name="newPassword"
                      required={true}
                      placeholder="new Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <InputField
                      label="Confirm New Password"
                      type="password"
                      required={true}
                      placeholder="confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {/* Show error message if passwords don't match */}
                    {errorMessage && (
                      <p className="text-red-500 text-center mt-2">
                        {errorMessage}
                      </p>
                    )}

                    {/* Centering the Save Changes button */}
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        onClick={handleSaveChanges}
                        className="mt-4 bg-[#2C3D33] text-white px-4 py-2 rounded-lg"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </AuthWrapper>
      </div>
    </>
  );
};

export default withAuth(Account);
