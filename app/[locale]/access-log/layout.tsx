import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VACS | Access Log",
  description: "View the access log of VACS",
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
