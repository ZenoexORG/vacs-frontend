import React, { ReactNode } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Option } from "../atoms/Option";
import toTitleCase from "../../shared/format/toTitleCase";

export interface SelectProps {
  isDark?: boolean;
  label?: string;
  id?: string;
  placeholder?: string;
  onCard?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}

export const Select = ({
  isDark = false,
  label,
  id,
  placeholder,
  onCard,
  onChange,
  children,
  ...props
}: SelectProps) => {
  const color = onCard
    ? isDark
      ? "bg-dark-800 text-white placeholder:text-white-300"
      : "bg-white-50 text-black placeholder:text-black-500"
    : isDark
      ? "bg-dark-900 text-white placeholder:text-white-300"
      : "bg-black-50 text-black placeholder:text-black-500";

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className={`block mb-1 text-sm font-medium ${isDark ? "text-white" : "text-black"
            }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          name={id}
          onChange={onChange}
          className={`appearance-none w-full px-5 py-3 pr-10 rounded-md border border-[#A3A3A3] ${color} bg-transparent`}
          {...props}
        >
          {placeholder && (
            <Option label={toTitleCase(placeholder)} value="" isDark={isDark} />
          )}
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#A3A3A3]">
          <KeyboardArrowDownIcon />
        </div>
      </div>
    </div>
  );
};
