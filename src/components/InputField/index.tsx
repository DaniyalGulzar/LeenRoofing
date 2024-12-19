"use client";

import Image from "next/image";
import React, { ChangeEvent, CSSProperties, FC, useState } from "react";

interface InputFieldProps {
  type?:
    | "text"
    | "textarea"
    | "number"
    | "password"
    | "email"
    | "checkbox"
    | "state"
    | "date"
    | "select"
    | "search";
  id?: string;
  name?: string;
  value?: string | number;
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  maxLength?: number;
  style?: CSSProperties;
  className?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  label?: string;
  labelClassName?: string;
  disabled?: boolean;
  options?: { label: string; value: string | number }[]; // Added for select input
  prefixIcon?: React.ReactNode;
  postfixIcon?: React.ReactNode;
  rightText?: string;
}

const InputField: FC<InputFieldProps> = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  maxLength = 100,
  style = {},
  className = "w-full h-[48px] p-2 mt-1",
  rows = 4,
  placeholder = "",
  required = false,
  label,
  labelClassName = "text-base text-[#708090] font-normal",
  disabled = false,
  options = [],
  prefixIcon,
  postfixIcon,
  rightText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-3 relative">
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
          {required && <span className="text-red-500">&nbsp;*</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={`${className} resize-none h-28`} // Adjusted height for textarea
          rows={rows}
          placeholder={placeholder}
          style={{
            textAlign: "left",
            border: "1px solid #EAE6F8",
            borderRadius: "0px",
            paddingLeft: prefixIcon ? "40px" : "10px",
            paddingRight: postfixIcon ? "40px" : "10px",
            ...style,
          }}
          required={required}
          disabled={disabled}
        />
      ) : type === "select" ? (
        <div className="relative">
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={className}
            style={{
              textAlign: "left",
              border: "1px solid #EAE6F8",
              borderRadius: "0px",
              paddingLeft: prefixIcon ? "40px" : "10px",
              paddingRight: postfixIcon ? "40px" : "10px",
              ...style,
            }}
            required={required}
            disabled={disabled}
          >
            <option value="" disabled selected>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {rightText && (
            <span className="absolute text-secondary-default text-sm hidden md:block right-0 top-0 pb-5 transform -translate-y-1/2">
              {rightText}
            </span>
          )}
        </div>
      ) : (
        <div className="relative">
          {prefixIcon && (
            <div className="absolute inset-y-0 left-3 flex items-center">
              {prefixIcon}
            </div>
          )}
          <input
            type={showPassword ? "text" : type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            className={className}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            style={{
              textAlign: "left",
              border: "1px solid #EAE6F8",
              borderRadius: "0px",
              paddingLeft: prefixIcon ? "40px" : "10px",
              paddingRight: postfixIcon ? "40px" : "10px",
              ...style,
            }}
          />
          {type === "password" && (
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={handleTogglePassword}
            >
              <Image
                src={showPassword ? "/svgs/eye.svg" : "/svgs/eye-hide.svg"}
                alt={showPassword ? "Hide Password" : "Show Password"}
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
          )}

          {postfixIcon && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              {postfixIcon}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
