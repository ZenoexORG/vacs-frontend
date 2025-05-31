import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VACS | Roles",
  description: "Manage roles in VACS",
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
