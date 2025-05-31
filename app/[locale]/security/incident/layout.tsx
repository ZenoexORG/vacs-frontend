import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VACS | Incidents",
  description: "View and manage incidents in VACS.",
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
