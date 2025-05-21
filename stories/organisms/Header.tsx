'use client';

import { Notification } from "../atoms/Notification";
import { User } from "../molecules/User";
import Link from "next/link";
import React from "react";
import { useT } from "../../app/i18n/useT";

export interface HeaderProps {
  isDark?: boolean;
  number?: number;
  gender?: string;
  fullname?: string;
  role?: string;
  onMenuClick?: () => void;
}

export const Header = ({
  isDark = false,
  number,
  gender = 'M',
  fullname = 'John Doe',
  role = 'User',
  onMenuClick
}: HeaderProps) => {
  const color = isDark ? "bg-dark-900 text-white-50" : "bg-white-50 text-dark-950";
  const image = gender === 'M' ? '/assets/icons/man.png' : '/assets/icons/woman.png';

  const { i18n } = useT();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={`${color} w-full flex items-center justify-between md:justify-end px-3 md:px-9 py-3`}>
      {/* Menu button - only visible on mobile */}
      <button
        className="md:hidden p-2 focus:outline-none"
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex gap-5 md:gap-9 items-center">
        <div className="hidden sm:flex items-center gap-4">
          <button onClick={() => changeLanguage('en')} className="text-sm">EN</button>
          <button onClick={() => changeLanguage('es')} className="text-sm">ES</button>
        </div>

        <Link href="/" className="flex items-center justify-center">
          <Notification number={number} />
        </Link>

        <User
          isDark={isDark}
          logo={image}
          width={38}
          height={38}
          alt="User"
          name={fullname}
          role={role}
        />
      </div>
    </header>
  );
};
