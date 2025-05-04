"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  brands: string[];
  logoSrc?: string;
};

export default function BurgerButton({
  brands,
  logoSrc = "/placeholder.svg?height=40&width=120",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex items-center justify-between border-b p-6">
            <button
              className="text-gray-700"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="ml-4">
              <h1>Logo</h1>
              {/* <Image src={logoSrc || "/placeholder.svg"} alt="Logo" width={120} height={40} className="h-10 w-auto" /> */}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col space-y-4">
              {brands.map((brand) => (
                <Link
                  key={brand}
                  href={`/brands/${brand}`}
                  className="text-lg font-medium text-gray-700 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t p-6">
            <button
              className="w-full rounded-md bg-black px-4 py-3 text-white transition-colors hover:bg-gray-800"
              onClick={() => {
                // Add login logic here
                setIsOpen(false);
              }}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
