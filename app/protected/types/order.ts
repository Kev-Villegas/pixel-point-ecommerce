import type { Order, OrderItem, Product, Image } from "@prisma/client";

export interface OrderWithItems extends Order {
  items: (OrderItem & {
    product: Product & {
      images: Image[];
    };
  })[];
}

export interface OrderProps {
  order: OrderWithItems;
}
