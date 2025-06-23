import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Smartphone, Package, TrendingUp, DollarSign } from "lucide-react";

export function KPIs({
  total,
  inStock,
  lowStock,
  inventoryValue,
  avgPrice,
}: {
  total: number;
  inStock: number;
  lowStock: number;
  inventoryValue: number;
  avgPrice: number;
}) {
  return (
    <div className="grid gap-4 space-x-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex-row items-center gap-x-2 space-y-0 p-6">
          <Smartphone className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">
            Productos Totales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center gap-x-2 space-y-0 p-6">
          <Package className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">En Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inStock}</div>
          <p className="text-xs text-muted-foreground">
            {lowStock} pocas unidades
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center gap-x-2 space-y-0 p-6">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">
            Valor Inventario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            $
            {inventoryValue.toLocaleString("es-AR", {
              maximumFractionDigits: 0,
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center gap-x-2 space-y-0 p-6">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">Precio Promedio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${Math.round(avgPrice)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
