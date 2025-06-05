/* eslint-disable */
import { Button } from "@/app/_components/ui/button";
import { motion } from "framer-motion";
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
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-4">
        <Image
          src={product.images[0].url}
          alt={product.name}
          width={60}
          height={60}
          className="rounded-md object-cover"
        />
        <div>
          <p className="font-medium text-gray-800">{product.name}</p>
          <p className="text-sm text-gray-600">
            ${product.price.toLocaleString("es-AR")}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => onQuantityChange(product.id, false)}
            className="text-bold rounded bg-gray-200 px-2 py-1 text-sm font-bold text-slate-900 hover:bg-gray-300"
          >
            <Minus />
          </Button>
          <p className="w-6 text-center text-sm font-medium text-gray-800">
            {product.quantity}
          </p>
          <Button
            variant="ghost"
            onClick={() => onQuantityChange(product.id, true)}
            className="rounded bg-gray-200 px-2 py-1 text-sm font-bold text-gray-700 hover:bg-gray-300"
          >
            <Plus />
          </Button>
        </div>
        <Button
          variant="destructive"
          className="bg-red-600"
          aria-label="Eliminar producto"
          onClick={() => onRemove(product.id)}
        >
          <Trash2 className="h-6 w-6 text-gray-50" />
        </Button>
      </div>
    </motion.div>
  );
}
