"use server";
import { User } from "lucide-react";
import Link from "next/link";
import CartInfo from "./navbar/CartInfo";
import SearchInput from "./navbar/SearchInput";
import UserDropDownMenu from "./UserDropDownMenu";
import { auth } from "../_lib/auth";
import BurgerButton from "./BurgerButton";

export default async function Header() {
  const brands = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Realme",
    "Honor",
    "Oneplus",
    "Oppo",
  ];

  const session = await auth();

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
            Logo
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
