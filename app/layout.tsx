import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import { Toaster } from "react-hot-toast";
import Header from "./_components/Header";
import SessionWrapper from "./_components/SessionWrapper";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pixel Point",
  description: "Pixel Point E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="es">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <React.StrictMode>
            <Header />
            <main>{children}</main>
          </React.StrictMode>
          <Toaster
            position="top-center"
            reverseOrder={true}
            gutter={8}
            toastOptions={{
              duration: 1500,
              style: {
                background: "#e7e5e4",
                color: "#0a0a0a",
              },
            }}
          />
        </body>
      </html>
    </SessionWrapper>
  );
}
