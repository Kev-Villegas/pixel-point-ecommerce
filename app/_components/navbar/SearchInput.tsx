"use client";
import { useSearchProductStore } from "@/store/useSearchProductStore";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchInput() {
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
    <div className="flex w-full items-stretch">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="h-10 w-full"
        />
        {showSuggestions && searchResults.length > 0 && (
          <div className="absolute z-10 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-lg">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.id}`}
                className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-100"
              >
                {product.images.length > 0 && (
                  <Image
                    src={product.images[0].url || "/placeholder.svg"}
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
      <Button size="icon" className="ml-2 h-10">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}
