import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VACS | Auth",
  description: "Login to use VACS software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
