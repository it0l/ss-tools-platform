import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SS Tools Platform",
  description:
    "Discord-integrated platform with OAuth, role-based access control and secure server-side authorization.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
