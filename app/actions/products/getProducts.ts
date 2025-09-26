"use server";

import { ProductBase } from "@/types/types";

type SortOptions = "createdAt" | "mostSold" | "mostLiked";

export async function getProducts(sort?: SortOptions): Promise<ProductBase[]> {
  let url = `${process.env.NEXT_PUBLIC_URL}/api/products`;
  if (sort) {
    url += `?sort=${sort}`;
  }

  const res = await fetch(url, {
    next: {
      // revalidate: 60 * 60, // 1 hour
      revalidate: 0,
    },
  });

  if (!res.ok) throw new Error("Error al cargar productos");

  return res.json();
}
