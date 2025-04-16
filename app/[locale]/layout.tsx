import React from "react";
import type { Metadata } from "next";
import { languages } from "../i18n/config";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Mi app",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
