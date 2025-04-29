import React from "react";
import { Check } from "@mui/icons-material";
import toTitleCase from "../../shared/format/toTitleCase";

export interface InputProps {
  isDark?: boolean;
  label?: string;
  type?: "text" | "email" | "password" | "checkbox";
  id?: string;
  placeholder?: string;
  onCard?: boolean;
  checked?: boolean;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  isDark = false,
  label,
  id,
  type = "text",
  placeholder,
  onCard,
  checked,
  onClick,
  onChange,
  ...props
}: InputProps) => {
  const color = onCard
    ? isDark
      ? "bg-dark-800 placeholder:text-white-300"
      : "bg-white-50 placeholder:text-black-500"
    : isDark
      ? "bg-dark-900 placeholder:text-white-300"
      : "bg-black-50 placeholder:text-black-500";

  if (type === "checkbox") {
    return (
      <label
        htmlFor={id}
        className="relative w-6 h-6 flex items-center justify-center"
      >
        <input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={onChange}
          onClick={onClick}
          className="peer appearance-none w-6 h-6 border border-[#A3A3A3] rounded bg-transparent cursor-pointer"
          {...props}
        />
        <Check className="!w-4 !h-4 text-[#A3A3A3] absolute pointer-events-none opacity-0 peer-checked:opacity-100" />
      </label>
    );
  }

  return (
    <input
      type={type}
      id={id}
      name={id}
      placeholder={toTitleCase(placeholder || "")}
      onChange={onChange}
      onClick={onClick}
      className={`px-5 py-3 rounded-md ${color} appearance-none w-full`}
      {...props}
    />
  );
};
