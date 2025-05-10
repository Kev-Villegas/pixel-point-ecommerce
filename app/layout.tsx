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
  title: "Pixel Point - Celulares Originales al Mejor Precio",
  description:
    "Pixel Point: tienda online familiar dedicada a la venta de celulares originales con garantía y a precios accesibles.",
  keywords: [
    "Pixel Point",
    "celulares originales",
    "tienda de celulares",
    "celulares Argentina",
    "Pixel Point Argentina",
    "celulares con garantía",
  ],
  authors: [
    {
      name: "Nahuel Villegas",
      url: "https://www.linkedin.com/in/villegasnahuel/",
    },
    {
      name: "Kevin Villegas",
      url: "https://www.linkedin.com/in/kevin--villegas/",
    },
  ],
  creator: "Pixel Point",
  robots: "index, follow",
  openGraph: {
    title: "Pixel Point - Celulares Originales al Mejor Precio",
    description:
      "Comprá celulares originales de forma segura en Pixel Point, un emprendimiento familiar con garantía y confianza.",
    url: "https://www.pixel-point.com.ar/",
    siteName: "Pixel Point",
    locale: "es_AR",
    type: "website",
  },
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
