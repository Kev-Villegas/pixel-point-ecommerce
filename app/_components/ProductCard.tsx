import Image, { StaticImageData } from "next/image";
import { BadgeCheck, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";

interface ProductCardProps {
  imageSrc: StaticImageData | string;
  name: string;
  price: number;
  brand: string;
}

export default function ProductCard({
  imageSrc,
  name,
  price,
  brand,
}: ProductCardProps) {
  return (
    <Card
      className="w-full max-w-[225px] overflow-hidden transition-transform duration-300 hover:shadow-lg hover:shadow-gray-400"
      tabIndex={0}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={name}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <CardContent className="p-2">
        <div className="flex flex-col space-y-1">
          <h3 className="cursor-pointer truncate text-base font-medium leading-tight hover:text-primary">
            {name}
          </h3>
          {brand && (
            <p className="flex items-center gap-[3px] truncate pt-1 text-sm text-muted-foreground">
              {brand}
              <BadgeCheck className="h-4 w-4 font-semibold text-blue-700" />
            </p>
          )}
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-semibold text-emerald-600">
              ${price.toFixed(2)}
            </span>
            <button
              className="rounded-full p-2 text-primary transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-primary hover:text-primary-foreground"
              aria-label="Añadir al carrito"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
