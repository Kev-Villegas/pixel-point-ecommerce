import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "@/context/CartContext";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <React.StrictMode>
          <CartContextProvider>
            <main>{children}</main>
          </CartContextProvider>
        </React.StrictMode>
        <Toaster
          position="top-center"
          reverseOrder={true}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#e7e5e4",
              color: "#0a0a0a",
            },
          }}
        />
      </body>
    </html>
  );
}
