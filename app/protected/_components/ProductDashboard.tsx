"use client";

import { KPIs } from "./Kpis";
import { Product } from "@prisma/client";
import { KPIsSkeleton } from "./KPIsSkeletons";
import { Badge } from "@/app/_components/ui/badge";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useDashboardKPIs } from "@/app/_hooks/useDashboardKPIs";
import { useDashboardProducts } from "@/app/_hooks/useDashboardProducts";
import { ProductsChartsDashboard } from "@/app/protected/_components/ProductsChartsDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

export default function Dashboard() {
  const { products, isLoading } = useDashboardProducts();

  const { kpis, isLoading: kpisLoading, isError } = useDashboardKPIs();

  if (isError) return <div>Error al cargar KPIs</div>;
  if (kpisLoading) return <KPIsSkeleton />;

  const total = products.length;

  const handleExportCSV = () => {
    if (!products.length) return;

    const header = ["ID", "Nombre", "Marca", "Precio", "Stock", "Estado"];
    const rows = products.map((p: Product) => [
      p.id,
      p.name,
      p.brand,
      p.price.toFixed(2),
      p.stock,
      p.stock > 10 ? "En stock" : p.stock > 0 ? "Pocas unidades" : "Agotado",
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map(String).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "productos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-6 py-4">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestión de Productos
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Visualiza, edita y administra el catálogo de productos de tu tienda.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Añadir Producto
          </Button>
        </div>
      </div>

      <KPIs
        total={kpis.total}
        inStock={kpis.inStock}
        lowStock={kpis.lowStock}
        inventoryValue={kpis.inventoryValue}
        avgPrice={kpis.avgPrice}
      />

      <Card>
        <CardHeader>
          <CardTitle>Catálogo de Productos</CardTitle>
          <CardDescription>
            Filtra y organiza los productos disponibles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative w-full max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input placeholder="Buscar productos..." className="pl-10" />
            </div>

            <Select defaultValue="all-categories">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">
                  Todas las categorías
                </SelectItem>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="samsung">Samsung</SelectItem>
                <SelectItem value="google">Google</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-status">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">Todos los estados</SelectItem>
                <SelectItem value="in-stock">En stock</SelectItem>
                <SelectItem value="low-stock">Pocas unidades</SelectItem>
                <SelectItem value="out-of-stock">Agotado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Listado de Productos</CardTitle>
          <CardDescription>0 de {total} seleccionados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={`skeleton-${i}`}>
                      <TableCell>
                        <Skeleton className="h-4 w-4 rounded-sm" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-14" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-10" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-8" />
                      </TableCell>
                    </TableRow>
                  ))
                : products.map((product: Product) => {
                    const status =
                      product.stock > 10
                        ? "En stock"
                        : product.stock > 0
                          ? "Pocas unidades"
                          : "Agotado";

                    const badgeVariant =
                      status === "En stock"
                        ? "default"
                        : status === "Pocas unidades"
                          ? "secondary"
                          : "destructive";

                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.id}
                        </TableCell>
                        <TableCell className="cursor-pointer text-blue-600 hover:underline">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant={badgeVariant}>{status}</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Duplicar</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {products.length} de {total} productos
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductsChartsDashboard />
    </div>
  );
}
