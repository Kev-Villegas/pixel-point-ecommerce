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
import { useAuthModal } from "@/app/_hooks/useAuthModal";
import { ALL_BRANDS, PRODUCT_CATEGORIES } from "../_utils/categories";

export default function Header() {
  // Flatten brands for mobile menu compatibility
  // For now, passing all unique brands to BurgerButton to keep it working
  const { openModal } = useAuthModal();

  const { data: session, status } = useSession();

  useEffect(() => {}, [session, status]);

  return (
    <header className="bg-white px-5 shadow-md md:px-10">
      <div className="mx-auto py-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="mr-2 md:hidden">
            <BurgerButton brands={ALL_BRANDS} />
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
            {PRODUCT_CATEGORIES.filter((c) => c.brands.length > 0).map(
              (category) => (
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
              ),
            )}
          </nav>
          <div className="flex w-full items-center justify-between md:justify-end md:space-x-4">
            <CartInfo />
            {session && session.user?.email ? (
              <UserDropDownMenu session={session} />
            ) : (
              <div
                onClick={() => openModal("signin")}
                className="cursor-pointer transition-colors hover:text-primary"
                role="button"
                tabIndex={0}
              >
                <User className="h-6 w-6" />
                <span className="sr-only">Login</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
