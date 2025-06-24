"use client";

import toast from "react-hot-toast";
import { useState, useMemo } from "react";
import { OrderStatsGrid } from "./OrderStatsGrid";
import OrdersControls from "./OrdersControls";
import { OrderDetailDialog } from "./OrderDetailDialog";
import { RecentOrdersTable } from "./RecentOrdersTable";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useOrderStats } from "@/app/_hooks/useOrderStats";
import { exportToCSV } from "@/app/_utils/exportOrdersCSV";
import { useMonthlyTrends } from "@/app/_hooks/useMonthlyTrends";
import { Order, useRecentOrders } from "@/app/_hooks/useOrders";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { DateRange } from "../types/dashboard";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-3 shadow-lg">
        <p className="font-semibold">{`${label}`}</p>
        <p className="text-blue-600">{`Órdenes: ${payload[0].value}`}</p>
        {payload[0].payload.revenue && (
          <p className="text-green-600">{`Ingresos: $${payload[0].payload.revenue.toLocaleString()}`}</p>
        )}
      </div>
    );
  }
  return null;
};

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border bg-white p-2 shadow-lg">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-blue-600">{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export function OrderDashboard() {
  const { orders, refreshOrders } = useRecentOrders();
  const { trendData, isLoading } = useMonthlyTrends();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("TODOS");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [tempRange, setTempRange] = useState<DateRange>(dateRange);

  const handleApplyDateRange = () => {
    setDateRange(tempRange);
    setIsCalendarOpen(false);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "TODOS" ||
        order.estado.toLowerCase() === statusFilter.toLowerCase();

      const matchesDate =
        !dateRange.from ||
        (new Date(order.fecha) >= new Date(dateRange.from) &&
          new Date(order.fecha) <= new Date(dateRange.to));

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, searchTerm, statusFilter, dateRange]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const { stats, pieData } = useOrderStats(filteredOrders);

  const handleExport = () => {
    exportToCSV({
      filename: `ordenes-${new Date().toISOString().split("T")[0]}.csv`,
      headers: ["ID", "Cliente", "Producto", "Precio ($)", "Estado", "Fecha"],
      data: filteredOrders,
      rows: (order) => [
        order.id,
        order.cliente,
        order.producto,
        order.precio.toFixed(2),
        order.estado,
        new Date(order.fecha).toLocaleDateString("es-AR"),
      ],
    });

    toast.success("Datos exportados con éxito");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("TODOS");
    setDateRange({
      from: new Date(new Date().setDate(new Date().getDate() - 7)),
      to: new Date(),
    });
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-6 py-4">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestión de Órdenes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Administra y visualiza todas las órdenes de tu tienda
          </p>
        </div>

        <OrdersControls
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
          tempRange={tempRange}
          handleDateRangeChange={(range) => {
            if (range.from && range.to) {
              setTempRange({
                from: new Date(range.from),
                to: new Date(range.to),
              });
            }
          }}
          handleApplyDateRange={handleApplyDateRange}
          refreshOrders={refreshOrders}
          handleExportCSV={handleExport}
          isLoading={isLoading}
          hasOrders={filteredOrders.length > 0}
          error={null}
        />
      </div>

      <div>
        <OrderStatsGrid stats={stats} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrdersTable
            refreshOrders={refreshOrders}
            filteredOrders={filteredOrders}
            paginatedOrders={paginatedOrders}
            statusFilter={statusFilter}
            searchTerm={searchTerm}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            setSearchTerm={setSearchTerm}
            setStatusFilter={setStatusFilter}
            setItemsPerPage={setItemsPerPage}
            setCurrentPage={setCurrentPage}
            clearFilters={clearFilters}
            setSelectedOrder={setSelectedOrder}
            setIsDetailModalOpen={setIsDetailModalOpen}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Órdenes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-center">
              <p className="text-lg font-semibold">
                Completado {pieData.find((d) => d.name === "Completado")?.value}
                %
              </p>
            </div>
            <div className="relative h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">
                    {item.name} ({item.count})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Órdenes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={trendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#666" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#666" }}
                    domain={[0, "dataMax + 50"]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="orders"
                    fill="#000000"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={60}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <OrderDetailDialog
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
          order={selectedOrder}
        />
      </Card>
    </div>
  );
}
