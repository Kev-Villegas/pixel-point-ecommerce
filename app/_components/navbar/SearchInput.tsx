"use client";
import { useSearchProductStore } from "@/store/useSearchProductStore";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { searchResults, handleSearch } = useSearchProductStore();
  const router = useRouter();

  const handleFocus = () => setShowSuggestions(true);
  const handleBlur = () => setTimeout(() => setShowSuggestions(false), 200);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        handleSearch(query);
      }, 300),
    [handleSearch],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    const trimmed = searchTerm.trim();
    if (trimmed) {
      router.push(`/productos?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/productos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-stretch">
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
          <div className="absolute z-50 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-gray-100 bg-white shadow-xl">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.id}`}
                onClick={() => setShowSuggestions(false)}
                className="flex items-center space-x-4 px-4 py-2.5 transition-colors hover:bg-gray-100"
              >
                {product.images.length > 0 && (
                  <Image
                    src={product.images[0].url || "/placeholder.svg"}
                    width={40}
                    height={40}
                    alt={product.name}
                    className="h-9 w-9 rounded object-cover"
                  />
                )}
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium text-gray-800">
                    {product.name}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">
                    ${product.price.toLocaleString("es-AR")}
                  </span>
                </div>
              </Link>
            ))}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full border-t border-gray-100 bg-gray-50 px-4 py-2.5 text-center text-xs font-semibold text-primary transition-colors hover:bg-gray-100"
            >
              Ver todos los resultados para &quot;{searchTerm}&quot;
            </button>
          </div>
        )}
      </div>
      <Button
        type="submit"
        size="icon"
        className="ml-2 h-10"
        aria-label="Buscar"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Buscar</span>
      </Button>
    </form>
  );
}
