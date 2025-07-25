import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import { Toaster } from "react-hot-toast";
import Header from "./_components/Header";
import SessionWrapper from "./_components/SessionWrapper";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixel Point - Celulares Originales al Mejor Precio",
  description:
    "E-commerce dedicado a la venta de celulares 100% originales con garantía y a precios accesibles. Trabajamos con marcas reconocidas y productos de calidad, seleccionados cuidadosamente para ofrecerte la mejor experiencia",
  keywords: [
    "celulares liberados",
    "celulares baratos",
    "celulares de alta gama",
    "nuevo iphone",
    "ultimo iphone",
    "smartphones económicos",
    "smartphones de gama media",
    "celulares nuevos",
    "envíos a todo el país",
    "iPhone originales en Argentina",
    "e-commerce de tecnología",
    "celulares con garantía",
    "venta de celulares online",
    "Celulares",
    "Originales",
    "Xiaomi",
    "iPhone",
    "iPhone 16",
    "Motorola",
    "Google",
    "Ecommerce",
    "E-commerce",
    "Argentina",
    "Mecado Libre",
    "Mecadolibre",
    "Mecado Pago",
    "Mecadopago",
    "Pixel",
    "Pixel Point",
    "pixel point",
    "pixel-point",
    "Store",
    "Smartphone",
    "Pixel-Point",
    "baratos",
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
      "Comprá celulares originales de forma segura en Pixel Point, celulares 100% originales, con garantía, excelente atención y envíos a todo el país.",
    url: "https://www.pixel-point.com.ar/",
    siteName: "Pixel Point",
    locale: "es_AR",
    type: "website",
  },
};

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="es">
        <head>
          <link
            rel="preconnect"
            href="https://connect.facebook.net"
            crossOrigin="anonymous"
          />
          {/* Meta Pixel Code */}
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
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
