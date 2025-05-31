import React from "react";
import { Search } from "@mui/icons-material";
import { Input, InputProps } from "./Input";

export interface SearchBarProps extends Omit<InputProps, "type" | "placeholder"> {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isDark = false,
  placeholder = "Search vehicle",
  onSearch,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black-500 dark:text-white-300">
        <Search className="w-5 h-5" />
      </div>

      <Input
        isDark={isDark}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        className="px-10"
        {...props}
      />
    </div>
  );
};
