"use client";

import { useDashboardProducts } from "@/app/_hooks/useDashboardProducts";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Checkbox } from "@/app/_components/ui/checkbox";
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
  Download,
  Plus,
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ProductsChartsDashboard } from "@/app/protected/_components/ProductsChartsDashboard";
import { KPIs } from "./Kpis";
import { useDashboardKPIs } from "@/app/_hooks/useDashboardKPIs";

export default function Dashboard() {
  const { products, isLoading } = useDashboardProducts();

  const { kpis, isLoading: kpisLoading, isError } = useDashboardKPIs();

  if (isError) return <div>Error al cargar KPIs</div>;
  if (kpisLoading) return <div>Cargando KPIs...</div>;

  const total = products.length;

  return (
    <div className="space-y-6 p-6">
      <div className="w-full">
        <div className="space-y-6">
          <div>
            <KPIs
              total={kpis.total}
              inStock={kpis.inStock}
              lowStock={kpis.lowStock}
              inventoryValue={kpis.inventoryValue}
              avgPrice={kpis.avgPrice}
            />
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Gestión de Productos</CardTitle>
                  <CardDescription>
                    Administra tu catálogo de productos
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir Producto
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative max-w-sm flex-1">
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
                    <SelectItem value="all-status">
                      Todos los estados
                    </SelectItem>
                    <SelectItem value="in-stock">En stock</SelectItem>
                    <SelectItem value="low-stock">Pocas unidades</SelectItem>
                    <SelectItem value="out-of-stock">Agotado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Catálogo de Productos
                  </CardTitle>
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
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center">
                            Cargando productos...
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product) => {
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
                                    <DropdownMenuItem>
                                      Duplicar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                      Eliminar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

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
      </div>
    </div>
  );
}
