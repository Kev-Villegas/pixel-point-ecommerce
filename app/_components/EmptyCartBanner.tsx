import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export function EmptyCartBanner() {
  return (
    <div className="w-full rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <ShoppingBag className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-900">
            ¡Tu carrito está vacío! 🛒
          </h2>
          <p className="text-sm text-muted-foreground">
            Aún no has agregado productos a tu carrito. Empieza ahora y descubre
            todo lo que tenemos para ti.
          </p>
        </div>
        <div className="sm:ml-auto">
          <Button asChild>
            <Link href="/">Explorar productos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
