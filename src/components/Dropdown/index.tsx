"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
interface DropdownButtonProps {
  label: string; // Label for the dropdown button
  options: { label: string; href: string }[]; // Dropdown options
}
const DropdownButton: React.FC<DropdownButtonProps> = ({ label, options }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="relative">
      <button
        onClick={handleDropdownToggle}
        className="text-gray-600 flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-600 bg-white "
      >
        <span>{label}</span>
        <FaChevronDown />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg  w-48">
          {options.map((option, index) => (
            <a
              key={index}
              href={option.href}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
export default DropdownButton;
