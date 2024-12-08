"use client";

import React from "react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white px-10 shadow-md">
      <div className="mx-auto py-4">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="mr-3 text-2xl font-bold text-primary">
            Logo
          </Link>
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full"
          />
          <div className="ml-[8px]">
            <Button size="icon" className=" ">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <nav className="flex space-x-4 text-sm font-medium text-gray-700">
            <a href="/category/1" className="hover:text-primary">
              Categoría 1
            </a>
            <a href="/category/2" className="hover:text-primary">
              Categoría 2
            </a>
            <a href="/category/3" className="hover:text-primary">
              Categoría 3
            </a>
            <a href="/category/4" className="hover:text-primary">
              Categoría 4
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <User className="h-6 w-6" />
            <span className="sr-only">Login</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
