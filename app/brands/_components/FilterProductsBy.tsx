"use client";

import { Label } from "@/app/_components/ui/label";
import { useFilterStore } from "@/store/useFilterStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface FilterProductsByProps {
  onChange: (order: "asc" | "desc", filterBy: "price" | "name") => void;
}

export default function FilterProductsBy({ onChange }: FilterProductsByProps) {
  const { selectedOption, selectedFilter, setFilter } = useFilterStore();

  const handleChange = (value: string) => {
    const [filterBy, order] = value.split("-") as [
      "price" | "name",
      "asc" | "desc",
    ];
    setFilter(filterBy, order);
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
