"use client";

import Link from "next/link";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import debounce from "lodash.debounce";
import React, { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Search, ShoppingCart, User } from "lucide-react";
import { useSearchProductStore } from "@/store/useSearchProductStore";

const Header = () => {
  const brands = ["Apple", "Samsung", "Xiaomi"];
  const { cartProducts } = useCartStore();
  const totalProducts = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { searchResults, handleSearch } = useSearchProductStore();

  const handleFocus = () => setShowSuggestions(true);
  const handleBlur = () => setTimeout(() => setShowSuggestions(false), 200);

  const debouncedSearch = debounce((query: string) => {
    handleSearch(query);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <header className="bg-white px-10 shadow-md">
      <div className="mx-auto py-4">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="mr-3 text-2xl font-bold text-primary">
            Logo
          </Link>
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full"
            />

            {showSuggestions && searchResults.length > 0 && (
              <div className="absolute z-10 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-lg">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-100"
                  >
                    {product.images.length > 0 && (
                      <Image
                        src={product.images[0].url}
                        width={40}
                        height={40}
                        alt={product.name}
                        className="h-8 w-8 rounded object-cover"
                      />
                    )}
                    <span>{product.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="ml-[8px]">
            <Button size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <nav className="flex space-x-4 text-sm font-medium text-gray-700">
            {brands.map((brand) => (
              <a
                href={`/brands/${brand}`}
                className="hover:text-primary"
                key={brand}
              >
                {brand}
              </a>
            ))}
            {/* <a href="/category/2" className="hover:text-primary">
              Categoría 2
            </a> */}
          </nav>
          <div className="relative flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalProducts > 0 && (
                <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalProducts}
                </span>
              )}
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
