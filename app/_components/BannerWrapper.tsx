"use client";

import dynamic from "next/dynamic";

const BannerCarousel = dynamic(() => import("./BannerCarousel"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full animate-pulse rounded-2xl bg-zinc-900/30" />
  ),
});

export default function BannerWrapper() {
  return (
    <div className="rounded-2xl px-5 pt-4 md:px-10">
      <BannerCarousel />
    </div>
  );
}
