/* eslint-disable */
import { Button } from "@/app/_components/ui/button";
import { m } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface images {
  id: number;
  url: string;
  productId: number;
}

interface CartProductItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    images: images[];
  };
  onQuantityChange: (productId: number, increment: boolean) => void;
  onRemove: (productId: number) => void;
}

export function CartProductItem({
  product,
  onQuantityChange,
  onRemove,
}: CartProductItemProps) {
  return (
    <m.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="border-b border-gray-100 py-4 last:border-0 md:py-6"
    >
      {/* Mobile Layout */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* Product Info + Delete */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                {product.name}
              </h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(product.id)}
            className="flex-shrink-0 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Quantity + Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-full border border-gray-200 px-2 py-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onQuantityChange(product.id, false)}
              className="h-7 w-7 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium text-gray-900">
              {product.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onQuantityChange(product.id, true)}
              className="h-7 w-7 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="text-base font-semibold text-gray-900">
            ${(product.price * product.quantity).toLocaleString("es-AR")}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden grid-cols-[2fr,1fr,1fr,auto] items-center gap-4 md:grid">
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex justify-center">
          <div className="flex items-center rounded-full border border-gray-200 px-2 py-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onQuantityChange(product.id, false)}
              className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm font-medium text-gray-900">
              {product.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onQuantityChange(product.id, true)}
              className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Total */}
        <div className="text-center font-semibold text-gray-900">
          ${(product.price * product.quantity).toLocaleString("es-AR")}
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(product.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </m.div>
  );
}
