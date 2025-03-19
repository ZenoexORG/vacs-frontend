import type { Metadata } from "next";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import "./globals.css";

import React from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ThemeProvider } from "@contexts/themeContext";
import { DefaultAside } from "@components/DefaultAside";

export const metadata: Metadata = {
  title: "VACS",
  description: "VACS is a software for managing vehicle access",
};

const theme = createTheme({
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <MantineProvider theme={theme}>
            <Notifications />

            <main className="flex items-center">
              <DefaultAside />

              <div className="h-screen w-full">
                {children}
              </div>
            </main>
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
