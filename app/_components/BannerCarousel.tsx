"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    id: 3,
    type: "premium",
    title: "SERIE PREMIUM",
    subtitle: "EXPERIENCIA ULTRA DEFINICIÓN",
    installments: "12",
    bgGradient: "from-zinc-900 via-zinc-800 to-zinc-900",
    accentColor: "bg-violet-500",
    textColor: "text-violet-500",
    buttonColor: "bg-violet-500 hover:bg-violet-600",
    imagePath: "/banner/iphone.webp",
    imageAlt: "Samsung S3 Ultra gama alta",
  },
  {
    id: 2,
    type: "new-arrivals",
    title: "NUEVOS LANZAMIENTOS",
    subtitle: "TODO EN UN SOLO LUGAR",
    installments: "12",
    bgGradient: "from-slate-900 via-slate-800 to-slate-900",
    accentColor: "bg-cyan-500",
    textColor: "text-cyan-500",
    buttonColor: "bg-cyan-500 hover:bg-cyan-600",
    imagePath: "/banner/s25.webp",
    imageAlt: "Nuevos modelos Samsung en lanzamiento",
  },
  {
    id: 4,
    type: "flash-sale",
    title: "SUPER PRECIOS",
    subtitle: "UNO DE LOS MÁS VENDIDOS ACTUALMENTE",
    discount: "60%",
    installments: "12",
    bgGradient: "from-neutral-900 via-neutral-800 to-neutral-900",
    accentColor: "bg-amber-500",
    textColor: "text-amber-500",
    buttonColor: "bg-amber-500 hover:bg-amber-600",
    imagePath: "/banner/a36.webp",
    imageAlt: "Xiaomi POCO en oferta flash",
  },
  {
    id: 5,
    type: "accessories",
    title: "ACCESORIOS",
    subtitle: "PRÓXIMAMENTE DISPONIBLES",
    installments: "6",
    bgGradient: "from-gray-900 via-gray-800 to-gray-900",
    accentColor: "bg-emerald-500",
    textColor: "text-emerald-500",
    buttonColor: "bg-emerald-500 hover:bg-emerald-600",
    imagePath: "/banner/accessories.webp",
    imageAlt: "Accesorios para smartphone disponibles pronto",
  },
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c === banners.length - 1 ? 0 : c + 1));
    }, 5000);
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoSlide();
  };

  const next = () => {
    setCurrent((c) => (c === banners.length - 1 ? 0 : c + 1));
    resetAutoSlide();
  };
  const prev = () => {
    setCurrent((c) => (c === 0 ? banners.length - 1 : c - 1));
    resetAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const dx = touchStartX.current - touchEndX.current;
      if (Math.abs(dx) > 50) {
        if (dx > 0) next();
        else prev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const b = banners[current];

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Flechas (solo lg+) */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-50 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:scale-110 hover:bg-black/70 lg:flex"
        aria-label="Banner anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-50 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:scale-110 hover:bg-black/70 lg:flex"
        aria-label="Siguiente banner"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          aria-live="polite"
          key={banners[current].id}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className={`relative flex w-full flex-col items-center overflow-hidden bg-gradient-to-r ${banners[current].bgGradient} rounded-2xl px-4 py-12 md:min-h-[500px] md:flex-row md:py-0`}
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-gray-800/50 blur-3xl" />
            <div className="absolute bottom-[20%] right-[10%] h-40 w-40 rounded-full bg-gray-800/50 blur-3xl" />
            <div
              className={`absolute bottom-[10%] left-[30%] h-24 w-24 rounded-full ${b.accentColor}/10 blur-2xl`}
            />
            <div
              className={`absolute right-[20%] top-[30%] h-20 w-20 rounded-full ${b.accentColor}/10 blur-2xl`}
            />
          </div>

          <div className="relative flex w-full items-center justify-center md:w-1/2 md:justify-end">
            <div className="relative z-10 flex items-center md:mr-12">
              <div
                className={`absolute -left-4 top-1/2 h-40 w-1 -translate-y-1/2 ${b.accentColor} blur-sm`}
              />
              <div
                className={`absolute -right-4 top-1/2 h-40 w-1 -translate-y-1/2 ${b.accentColor} blur-sm`}
              />
              <div className="group relative">
                <div
                  className={`absolute -inset-0.5 rounded-2xl ${b.accentColor}/20 blur-sm transition duration-300 group-hover:${b.accentColor}/30`}
                />
                <div
                  className="relative rounded-2xl p-1"
                  style={{ width: 300, height: 500 }}
                >
                  <Image
                    src={b.imagePath}
                    alt={b.imageAlt}
                    fill
                    style={{ objectFit: "contain" }}
                    // width={300}
                    // height={500}
                    className="rounded-xl drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    priority={current === 0}
                    loading={current === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Texto y CTA */}
          <div className="z-10 flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:pl-8 md:text-left">
            <span
              className={`inline-block rounded-full ${b.accentColor}/20 py-1 text-sm font-medium ${b.textColor}`}
            >
              {b.subtitle}
            </span>
            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {b.title}
            </h1>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div
                className={`flex items-center gap-2 rounded-lg ${b.accentColor}/10 px-6 py-3`}
              >
                <Image
                  src="/banner/mp-blue.webp"
                  alt="Mercado Pago Logo"
                  width={200}
                  height={500}
                  className="rounded-xl drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center rounded-lg bg-gray-800/50 px-6 py-3 backdrop-blur-sm">
                <p className="mb-1 text-center text-sm font-semibold leading-none text-white">
                  HASTA
                </p>
                <div className="flex items-baseline justify-center gap-2 leading-none">
                  <span className="text-3xl font-bold text-white">
                    {b.installments}
                  </span>
                  <span className="text-lg font-semibold text-white">
                    CUOTAS
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Pagalo en cuotas con tu tarjeta, fácil y seguro.
            </p>
            {["hot-sale", "flash-sale"].includes(b.type) ? (
              <></>
            ) : (
              // <CountdownTimer accentColor={b.textColor} />
              <></>
              // <Button className={`${b.buttonColor} mt-6 px-8 py-3`}>
              //   Comprar Ahora
              // </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 bg-transparent py-4">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              resetAutoSlide();
            }}
            aria-label={`Ir al slide ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
            className={`h-1 rounded-full transition-all ${i === current ? `w-8 ${b.accentColor}` : "w-2 bg-gray-700"} `}
          />
        ))}
      </div>
    </div>
  );
}
