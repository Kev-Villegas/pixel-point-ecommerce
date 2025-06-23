"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/_components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useDashboardSummary } from "@/app/_hooks/useDashboardSummary";

export function ProductsChartsDashboard() {
  const { data, loading, error } = useDashboardSummary();

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Cargando gráficos...</p>
    );
  }

  if (error || !data) {
    return (
      <p className="text-sm text-red-500">
        Error al cargar datos del dashboard.
      </p>
    );
  }

  const { brandData } = data;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Distribución por Marca</CardTitle>
          <CardDescription>
            Productos en catálogo por fabricante
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{ sales: { label: "Productos" } }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={brandData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="sales"
                >
                  {brandData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 flex flex-wrap gap-2">
            {brandData.map((brand) => (
              <div key={brand.brand} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: brand.fill }}
                />
                <span className="text-sm">{brand.brand}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
