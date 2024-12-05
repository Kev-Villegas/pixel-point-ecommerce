"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BannerProps = {
  banners: {
    imageUrl: string;
    link: string;
    altText: string;
    title: string;
    description: string;
  }[];
};

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length,
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [banners.length]);

  return (
    <div className="relative h-64 w-full rounded-3xl sm:h-80 lg:h-96">
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <Image
          src={banners[currentIndex].imageUrl}
          alt={banners[currentIndex].altText}
          fill
          style={{ objectFit: "cover" }}
          quality={90}
          className="h-full w-full object-cover transition-all delay-100 duration-300 ease-in-out"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black bg-opacity-50">
        <div className="px-4 text-center text-white sm:px-8">
          <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
            {banners[currentIndex].title}
          </h2>
          <p className="mb-4 text-lg">{banners[currentIndex].description}</p>
          <Link href={banners[currentIndex].link}>
            <Button className="hover:bg-primary-dark rounded-md bg-primary px-6 py-2 text-lg font-semibold text-white">
              Ver Oferta
            </Button>
          </Link>
        </div>
      </div>

      <button
        onClick={prevBanner}
        className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextBanner}
        className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 cursor-pointer rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
