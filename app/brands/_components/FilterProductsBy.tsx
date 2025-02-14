"use client";

import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useState } from "react";

interface FilterProductsByProps {
  onChange: (order: "asc" | "desc", filterBy: "price" | "name") => void;
}

export default function FilterProductsBy({ onChange }: FilterProductsByProps) {
  const [selectedOption, setSelectedOption] = useState<"asc" | "desc">("asc");
  const [selectedFilter, setSelectedFilter] = useState<"price" | "name">(
    "price",
  );

  const handleChange = (value: string) => {
    const [filterBy, order] = value.split("-") as [
      "price" | "name",
      "asc" | "desc",
    ];
    setSelectedOption(order);
    setSelectedFilter(filterBy);
    onChange(order, filterBy);
  };

  return (
    <div className="mb-4">
      <Label>Ordenar Por</Label>
      <Select
        value={`${selectedFilter}-${selectedOption}`}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Ordenar Por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Precio: Bajo a Alto</SelectItem>
          <SelectItem value="price-desc">Precio: Alto a Bajo</SelectItem>
          <SelectItem value="name-asc">Nombre: A - Z</SelectItem>
          <SelectItem value="name-desc">Nombre: Z - A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
