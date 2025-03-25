"use client";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "./globals.css";

import '@mantine/charts/styles.css';
import React from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ThemeProvider } from "@contexts/themeContext";
import { DefaultAside } from "@components/DefaultAside";
import { usePathname } from "next/navigation";
import { DefaultHeader } from '@components/DefaultHeader';

const theme = createTheme({});

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <MantineProvider theme={theme}>
            <Notifications />
            {isAuthPage ? (
              <main>
                {children}
              </main>
            ) : (
              <main className="flex items-center">
                <DefaultAside />
                <div className="h-screen w-full flex flex-col">
                  <DefaultHeader />
                  <div className="p-6 h-0 flex-grow overflow-auto no-scrollbar">{children}</div>
                </div>
              </main>
            )}
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
