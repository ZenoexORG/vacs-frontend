'use client';

import { Notification } from "@atoms/Notification";
import { User } from "@molecules/User";
import Link from "next/link";
import React from "react";

export interface HeaderProps {
  isDark?: boolean;
  number?: number;
  gender?: string;
}

export const Header = ({
  isDark = false,
  number,
  gender = 'M'
}: HeaderProps) => {
  const color = isDark ? "bg-dark-900 text-white-50" : "bg-white-50 text-dark-950";
  const image = gender === 'M' ? '/assets/icons/man.png' : '/assets/icons/woman.png';

  return (
    <header className={`${color} w-full flex items-center justify-end px-9 py-3`}>
      <div className="flex gap-9 items-center">
        <Link href="/" className="flex items-center justify-center">
          <Notification number={number} />
        </Link>

        <User
          isDark={isDark}
          logo={image}
          width={38}
          height={38}
          alt="User"
          name="John Doe"
          role="Admin"
        />
      </div>
    </header>
  );
};
