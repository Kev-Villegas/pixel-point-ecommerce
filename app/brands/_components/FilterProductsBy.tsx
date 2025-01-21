"use client";

import { useState } from "react";

interface FilterProductsByProps {
  onChange: (order: "asc" | "desc") => void;
}

export default function FilterProductsBy({ onChange }: FilterProductsByProps) {
  const [selectedOption, setSelectedOption] = useState<"asc" | "desc">("asc");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as "asc" | "desc";
    setSelectedOption(value);
    onChange(value); // Llamamos a la función `onChange` pasada como prop
  };

  return (
    <div className="mb-4">
      <label htmlFor="filter" className="mr-2">
        Ordenar por precio:
      </label>
      <select
        id="filter"
        value={selectedOption}
        onChange={handleChange}
        className="rounded border px-3 py-2"
      >
        <option value="asc">Precio: Bajo a Alto</option>
        <option value="desc">Precio: Alto a Bajo</option>
      </select>
    </div>
  );
}
