"use client";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "./globals.css";

import React from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ThemeProvider } from "@contexts/themeContext";
import { DefaultAside } from "@components/DefaultAside";
import { usePathname } from "next/navigation";

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
            <main className="flex items-center">
              {!isAuthPage && <DefaultAside />}
              <div className="h-screen w-full">{children}</div>
            </main>
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
