'use client';

import React from "react";
import { useT } from "../../app/i18n/useT";
import { Title } from "@atoms/Title";
import { DoneAllOutlined, MailOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material"; // Add this import for loading indicator

export interface TicketSidebarProps {
  open?: number;
  closed?: number;
  isDark?: boolean;
  status?: string;
  setStatus: any;
  priority?: string;
  setPriority: (priority: string) => void;
  statusList: string[];
  priorityList: string[];
  isLoading?: boolean; // Add this prop for loading state
}

export const TicketSidebar = ({
  open = 0,
  closed = 0,
  isDark = false,
  status = 'open',
  setStatus,
  priority = '',
  setPriority,
  statusList,
  priorityList,
  isLoading = false // Default to false
}: TicketSidebarProps) => {
  const { t } = useT('incident');

  const color = isDark ? "bg-dark-900 text-white-50" : "bg-white-50 text-dark-950";

  return (
    <aside className={`w-1/4 ${color} h-full flex flex-col gap-8 items-center p-6 border border-black-300/40 rounded-xl relative`}>
      {/* Add loading overlay when isLoading is true */}
      {isLoading && (
        <div className="absolute inset-0 bg-black-300/20 flex items-center justify-center rounded-xl z-10">
          <CircularProgress color="primary" />
        </div>
      )}

      <h4 className="bg-primary-600 text-white-50 w-full text-center font-bold py-3 rounded-xl">
        {t('tickets')}
      </h4>

      <div className="w-full flex flex-col gap-2">
        <Title isDark={isDark}>{t('status')}</Title>

        <div className="flex flex-col">
          {statusList.map((item) => (
            <button
              key={item}
              className={`w-full flex items-center justify-between text-left px-4 py-2 rounded-lg ${status === item ? 'bg-primary-600 text-white-50' : 'hover:bg-primary-400'}`}
              onClick={() => setStatus(item)}
              disabled={isLoading} // Disable buttons during loading
            >
              <div className="flex items-center gap-3">
                {item === 'open' ? <MailOutline /> : <DoneAllOutlined />}

                <Title isDark={isDark}>{t(item)}</Title>
              </div>

              <Title isDark={isDark} className={status != item ? 'opacity-75' : ''}>
                {item === 'open' ? open : closed}
              </Title>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Title isDark={isDark}>{t('priority')}</Title>

        <div className="flex flex-col">
          {priorityList.map((item) => (
            <button
              key={item}
              className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg ${priority === item ? 'bg-primary-600 text-white-50' : 'hover:bg-primary-400'}`}
              onClick={() => setPriority(item)}
              disabled={isLoading} // Disable buttons during loading
            >
              <div className={`border-2 rounded-sm w-[1em] h-[1em] ${item === 'low' ? 'border-action-success' : item === 'medium' ? 'border-action-warning' : item === 'high' ? 'border-action-error' : ''}`}>
              </div>

              <Title isDark={isDark} className='font-normal'>
                {t(item)}
              </Title>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
