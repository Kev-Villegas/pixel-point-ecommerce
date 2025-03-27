"use server";

export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al cargar productos");

  return res.json();
}
