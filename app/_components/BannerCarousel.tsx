"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import samsungs3 from "@/public/samsungs3.png";
import xiaomiPOCO from "@/public/xiaomiPOCO.png";
import accessories from "@/public/accessories.png";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CountdownTimer from "@/app/_components/CountdownTimer";

const banners = [
  {
    id: 2,
    type: "new-arrivals",
    title: "NUEVAS LLEGADAS",
    subtitle: "SAMSUNG 2025 YA DISPONIBLE",
    discount: "30%",
    installments: "12",
    bgGradient: "from-slate-900 via-slate-800 to-slate-900",
    accentColor: "bg-cyan-500",
    textColor: "text-cyan-500",
    buttonColor: "bg-cyan-500 hover:bg-cyan-600",
    imagePath: samsungs3,
    imageAlt: "Nuevos modelos Samsung en lanzamiento",
  },
  {
    id: 3,
    type: "premium",
    title: "SERIE PREMIUM",
    subtitle: "EXPERIENCIA ULTRA DEFINICIÓN",
    discount: "20%",
    installments: "24",
    bgGradient: "from-zinc-900 via-zinc-800 to-zinc-900",
    accentColor: "bg-violet-500",
    textColor: "text-violet-500",
    buttonColor: "bg-violet-500 hover:bg-violet-600",
    imagePath: samsungs3,
    imageAlt: "Samsung S3 Ultra gama alta",
  },
  {
    id: 4,
    type: "accessories",
    title: "ACCESORIOS",
    subtitle: "PRÓXIMAMENTE DISPONIBLES",
    discount: "50%",
    installments: "6",
    bgGradient: "from-gray-900 via-gray-800 to-gray-900",
    accentColor: "bg-emerald-500",
    textColor: "text-emerald-500",
    buttonColor: "bg-emerald-500 hover:bg-emerald-600",
    imagePath: accessories,
    imageAlt: "Accesorios para smartphone disponibles pronto",
  },
  {
    id: 5,
    type: "flash-sale",
    title: "VENTA FLASH",
    subtitle: "UNO DE LOS MÁS VENDIDOS ACTUALMENTE",
    discount: "60%",
    installments: "3",
    bgGradient: "from-neutral-900 via-neutral-800 to-neutral-900",
    accentColor: "bg-amber-500",
    textColor: "text-amber-500",
    buttonColor: "bg-amber-500 hover:bg-amber-600",
    imagePath: xiaomiPOCO,
    imageAlt: "Xiaomi POCO en oferta flash",
  },
];

export default function BannerCarousel() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoSlide();
  };

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    resetAutoSlide();
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    resetAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const banner = banners[currentBanner];

  return (
    <div className="relative w-full">
      <button
        onClick={prevBanner}
        className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70"
        aria-label="Banner anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextBanner}
        className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70"
        aria-label="Siguiente banner"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div
        className={`relative flex w-full flex-col items-center overflow-hidden bg-gradient-to-r ${banner.bgGradient} rounded-2xl px-4 py-12 md:min-h-[500px] md:flex-row md:py-0`}
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-gray-800/50 blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] h-40 w-40 rounded-full bg-gray-800/50 blur-3xl" />
          <div
            className={`absolute bottom-[10%] left-[30%] h-24 w-24 rounded-full ${banner.accentColor}/10 blur-2xl`}
          />
          <div
            className={`absolute right-[20%] top-[30%] h-20 w-20 rounded-full ${banner.accentColor}/10 blur-2xl`}
          />
        </div>
        <div className="relative flex w-full items-center justify-center md:w-1/2 md:justify-end">
          <div className="relative z-10 my-6 flex items-center md:mr-12">
            <div
              className={`absolute -left-4 top-1/2 h-40 w-1 -translate-y-1/2 ${banner.accentColor} blur-sm`}
            />
            <div
              className={`absolute -right-4 top-1/2 h-40 w-1 -translate-y-1/2 ${banner.accentColor} blur-sm`}
            />
            <div className="group relative">
              <div
                className={`absolute -inset-0.5 rounded-2xl ${banner.accentColor}/20 blur-sm transition duration-300 group-hover:${banner.accentColor}/30`}
              />
              <div className="relative rounded-2xl bg-gray-900 p-1">
                <Image
                  src={banner.imagePath}
                  alt={banner.imageAlt}
                  width={300}
                  height={500}
                  className="rounded-xl drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="z-10 flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:pl-8 md:text-left">
          <div
            className={`inline-block rounded-full ${banner.accentColor}/20 px-4 py-1 text-sm font-medium ${banner.textColor}`}
          >
            {banner.subtitle}
          </div>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl">
            {banner.title.split("").map((char, i) => (
              <span
                key={i}
                className={i % 2 === 0 ? banner.textColor : "text-white"}
              >
                {char}
              </span>
            ))}
          </h1>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div
              className={`flex items-center gap-2 rounded-lg ${banner.accentColor}/10 px-6 py-3`}
            >
              <span className={`text-3xl font-bold ${banner.textColor}`}>
                {banner.discount}
              </span>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-400">HASTA</span>
                <span className="text-lg font-semibold text-white">
                  DE DESCUENTO
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-gray-800/50 px-6 py-3 backdrop-blur-sm">
              <span className="text-3xl font-bold text-white">
                {banner.installments}
              </span>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-400">CUOTAS SIN</span>
                <span className="text-lg font-semibold text-white">
                  INTERÉS
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Oferta por tiempo limitado. Finaliza el 30 de Julio de 2025.
          </p>

          {banner.type === "hot-sale" || banner.type === "flash-sale" ? (
            <CountdownTimer accentColor={banner.textColor} />
          ) : (
            <Button
              className={`mt-6 rounded-lg ${banner.buttonColor} px-8 py-3 font-medium text-white transition-all hover:scale-105`}
            >
              Comprar Ahora
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2 bg-transparent py-4">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentBanner(i);
              resetAutoSlide();
            }}
            className={`h-1 rounded-full transition-all ${
              i === currentBanner
                ? `w-8 ${banners[i].accentColor}`
                : "w-2 bg-gray-700 hover:bg-gray-600"
            }`}
            aria-label={`Ir al banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
