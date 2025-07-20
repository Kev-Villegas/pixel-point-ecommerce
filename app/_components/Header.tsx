"use client";
import { User } from "lucide-react";
import Link from "next/link";
import CartInfo from "./navbar/CartInfo";
import SearchInput from "./navbar/SearchInput";
import UserDropDownMenu from "./UserDropDownMenu";
import BurgerButton from "./BurgerButton";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Header() {
  const brands = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Realme",
    "Honor",
    "Oneplus",
    "Oppo",
    "Motorola",
  ];

  const { data: session, status } = useSession();

  useEffect(() => {
    // Aquí puedes realizar acciones cuando la sesión cambie
    // Por ejemplo, refrescar datos o mostrar un toast
    // console.log('Session changed:', session);
  }, [session, status]);

  return (
    <header className="bg-white px-5 shadow-md md:px-10">
      <div className="mx-auto py-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="mr-2 md:hidden">
            <BurgerButton brands={brands} />
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
          <nav className="hidden space-x-4 text-sm font-medium text-gray-700 md:flex">
            {brands.map((brand) => (
              <Link
                href={`/brands/${brand}`}
                className="hover:text-primary"
                key={brand}
              >
                {brand}
              </Link>
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
