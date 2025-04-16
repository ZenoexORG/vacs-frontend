import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VACS",
  description: "Software for managing vehicle access control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
