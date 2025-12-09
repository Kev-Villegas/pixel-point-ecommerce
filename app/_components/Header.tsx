"use client";
import { User, ChevronDown } from "lucide-react";
import Link from "next/link";
import CartInfo from "./navbar/CartInfo";
import SearchInput from "./navbar/SearchInput";
import UserDropDownMenu from "./UserDropDownMenu";
import BurgerButton from "./BurgerButton";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

export default function Header() {
  const categories = [
    {
      name: "Celulares",
      value: "SMARTPHONE",
      brands: [
        "Apple",
        "Samsung",
        "Xiaomi",
        "Realme",
        "Honor",
        "Oneplus",
        "Oppo",
        "Motorola",
        "Google",
      ],
    },
    {
      name: "Consolas",
      value: "CONSOLE",
      brands: ["Valve", "Nintendo", "Sony", "Microsoft"],
    },
    {
      name: "Periféricos",
      value: "PERIPHERAL",
      brands: ["Logitech", "Razer", "HyperX", "Corsair"],
    },
  ];

  // Flatten brands for mobile menu compatibility if needed, or update BurgerButton later.
  // For now, passing all unique brands to BurgerButton to keep it working as before roughly,
  // or we can update BurgerButton to accept categories.
  const allBrands = Array.from(new Set(categories.flatMap((c) => c.brands)));

  const { data: session, status } = useSession();

  useEffect(() => {}, [session, status]);

  return (
    <header className="bg-white px-5 shadow-md md:px-10">
      <div className="mx-auto py-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="mr-2 md:hidden">
            <BurgerButton brands={allBrands} />
          </div>
          <Link
            href="/"
            className="mx-7 hidden text-2xl font-bold text-primary md:block"
          >
            <Image src={"/logo.svg"} alt="logo" width={90} height={90} />
          </Link>
          <SearchInput />
        </div>
        <div className="flex items-center justify-between">
          <nav className="hidden space-x-6 text-sm font-medium text-gray-700 md:flex">
            {categories.map((category) => (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary focus:outline-none">
                  {category.name} <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {category.brands.map((brand) => (
                    <DropdownMenuItem key={brand} asChild>
                      <Link
                        href={`/brands/${brand}`}
                        className="w-full cursor-pointer hover:bg-gray-100"
                      >
                        {brand}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
          <div className="flex w-full items-center justify-between md:justify-end md:space-x-4">
            <CartInfo />
            {session && session.user?.email ? (
              <UserDropDownMenu session={session} />
            ) : (
              <Link href="/auth/signin">
                <User className="h-6 w-6" />
                <span className="sr-only">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
