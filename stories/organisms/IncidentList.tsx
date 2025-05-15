import React, { useState, useEffect } from "react";
import { SearchBar } from "../molecules/SearchBar";
import { IncidentRow, IncidentData } from "../molecules/IncidentRow";
import { DualButton } from "../atoms/DualButton";
import { CircularProgress } from "@mui/material";

export interface IncidentTableProps {
  data: IncidentData[];
  meta: {
    page: number;
    total_pages: number;
    open: number;
    closed: number;
  };
  isDark?: boolean;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  onSearch?: (query: string) => void;
  onIncidentClick?: (incident: IncidentData) => void;
}

export const IncidentTable: React.FC<IncidentTableProps> = ({
  data = [],
  meta = { page: 1, total_pages: 1, open: 0, closed: 0 },
  isDark = false,
  isLoading = false,
  onPageChange,
  onSearch,
  onIncidentClick,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { page, total_pages } = meta;

  // Use client-side only rendering for dynamic content
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > total_pages || isLoading) return;
    onPageChange?.(newPage);
  };

  const bgColor = isDark ? "bg-dark-900" : "bg-black-50";
  const textColor = isDark ? "text-white-50" : "text-black-950";

  // Provide a simple placeholder on the server and during hydration
  if (!isMounted) {
    return (
      <div className="flex-1 flex flex-col h-full space-y-4">
        <div className="mb-2 w-1/3">
          {/* Simplified SearchBar placeholder for server */}
          <div className={`h-10 rounded-lg ${isDark ? 'bg-dark-800' : 'bg-black-100'}`}></div>
        </div>
        <div className={`flex-1 rounded-xl ${bgColor} ${textColor} border border-black-300/40`}>
          {/* Simple loading placeholder */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full space-y-4">
      <div className="mb-2 w-1/3">
        <SearchBar
          isDark={isDark}
          onSearch={handleSearch}
          placeholder="Search vehicle"
        />
      </div>

      <div className={`flex-1 overflow-hidden rounded-xl ${bgColor} ${textColor} border border-black-300/40 relative`}>
        {isLoading && (
          <div className="absolute inset-0 bg-black-300/20 flex items-center justify-center z-10">
            <CircularProgress color="primary" />
          </div>
        )}

        <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
          {isLoading ? (
            <span>Loading...</span>
          ) : data.length > 0 ? (
            data.map((incident) => (
              <IncidentRow
                key={incident.id}
                incident={incident}
                isDark={isDark}
                onClick={isLoading ? undefined : onIncidentClick}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-500">No incidents found</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span>
          Page {page} of {total_pages}
        </span>

        <DualButton
          isDark={isDark}
          leftAction={() => handlePageChange(page - 1)}
          rightAction={() => handlePageChange(page + 1)}
        />
      </div>
    </div>
  );
};
