import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyQ",
  description: "Created by Rohit Kumar",
  generator: "dev",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/favicon.ico", sizes: "any" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
