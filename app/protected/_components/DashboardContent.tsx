"use client";

import React, { useState, useMemo, useCallback } from "react";
import useSWR from "swr";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/app/_components/ui/button";
import { Skeleton } from "@/app/_components/ui/skeleton";

import { DatePickerWithRange } from "@/app/_components/DateRangePicker";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

// Types
interface Order {
  id: string;
  email: string;
  createdAt: string;
  totalPrice: number;
}

interface Metrics {
  totalIncome: number;
  totalOrders: number;
  totalClients: number;
  avgValue: number;
  incomeChangePercent: number;
  ordersChangePercent: number;
  clientsChangePercent: number;
  avgValueChangePercent: number;
}

interface DateRange {
  from: Date;
  to: Date;
}

interface MetricCardData {
  title: string;
  value: string | number;
  change: number;
}

interface SalesDataPoint {
  month: string;
  revenue: number;
}

interface ProductData {
  name: string;
  sales: number;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  isLoading: boolean;
}

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

interface PieChartLegendProps {
  data: ProductData[];
  isLoading: boolean;
}

// Constants
const PRODUCT_COLORS: Record<string, string> = {
  iPhone: "#000000",
  Samsung: "#404040",
  Google: "#606060",
  OnePlus: "#808080",
  default: "#A0A0A0",
};

const INITIAL_DATE_RANGE: DateRange = {
  from: new Date(new Date().setDate(new Date().getDate() - 7)),
  to: new Date(),
};

const SWR_CONFIG = {
  revalidateOnFocus: false,
};

const CHART_MARGINS = {
  top: 10,
  right: 30,
  left: 0,
  bottom: 0,
};

// Utility Functions
const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

const calculatePercentageChange = (
  current: number,
  previous: number,
): number => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
};

const getProductColor = (productName: string): string => {
  const brand = Object.keys(PRODUCT_COLORS).find(
    (key) => key !== "default" && productName.includes(key),
  );
  return brand ? PRODUCT_COLORS[brand] : PRODUCT_COLORS.default;
};

const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`;

const formatPercentage = (percentage: number): string =>
  `${Math.abs(percentage).toFixed(1)}%`;

const formatDateForFilename = (date: string): string =>
  date.replace(/[:.]/g, "-");

const formatMonthLabel = (monthString: string): string => {
  const [year, month] = monthString.split("-");
  return `${month}/${year}`;
};

// Business Logic Functions
const calculateMetrics = (
  currentOrders: Order[] = [],
  previousOrders: Order[] = [],
): Metrics => {
  const currentIncome = currentOrders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0,
  );
  const previousIncome = previousOrders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0,
  );

  const currentOrdersCount = currentOrders.length;
  const previousOrdersCount = previousOrders.length;

  const currentClients = new Set(currentOrders.map((order) => order.email))
    .size;
  const previousClients = new Set(previousOrders.map((order) => order.email))
    .size;

  const currentAvgValue =
    currentOrdersCount > 0 ? currentIncome / currentOrdersCount : 0;
  const previousAvgValue =
    previousOrdersCount > 0 ? previousIncome / previousOrdersCount : 0;

  return {
    totalIncome: currentIncome,
    totalOrders: currentOrdersCount,
    totalClients: currentClients,
    avgValue: currentAvgValue,
    incomeChangePercent: calculatePercentageChange(
      currentIncome,
      previousIncome,
    ),
    ordersChangePercent: calculatePercentageChange(
      currentOrdersCount,
      previousOrdersCount,
    ),
    clientsChangePercent: calculatePercentageChange(
      currentClients,
      previousClients,
    ),
    avgValueChangePercent: calculatePercentageChange(
      currentAvgValue,
      previousAvgValue,
    ),
  };
};

const processSalesData = (orders: Order[]): SalesDataPoint[] => {
  if (!orders?.length) return [];

  const salesByMonth = orders.reduce<Record<string, number>>((acc, order) => {
    const date = new Date(order.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    acc[monthKey] = (acc[monthKey] || 0) + order.totalPrice;
    return acc;
  }, {});

  return Object.entries(salesByMonth).map(([month, revenue]) => ({
    month,
    revenue,
  }));
};

const exportToCSV = (orders: Order[], fromISO: string, toISO: string): void => {
  if (!orders?.length) {
    console.warn("No orders to export");
    return;
  }

  const headers = ["PedidoID", "Email", "Fecha", "Total"];
  const csvRows = orders.map((order) => [
    order.id,
    order.email,
    new Date(order.createdAt).toLocaleDateString(),
    order.totalPrice.toFixed(2),
  ]);

  const csvContent = [headers, ...csvRows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `pedidos_${formatDateForFilename(fromISO)}_${formatDateForFilename(toISO)}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Components
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isLoading,
}) => {
  const isPositive = change >= 0;
  const changeColorClass = isPositive
    ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
    : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100";

  return (
    <Card className="border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-2">
          {isLoading ? (
            <Skeleton className="h-8 w-24 rounded-md" />
          ) : (
            <span className="break-words text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </span>
          )}
          {isLoading ? (
            <Skeleton className="h-6 w-12 rounded-md" />
          ) : (
            <span
              className={`flex items-center space-x-1 rounded-md px-2 py-0.5 text-sm font-medium ${changeColorClass}`}
            >
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span>{formatPercentage(change)}</span>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  className = "min-h-[300px]",
}) => (
  <Card
    className={`border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}
  >
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="h-72">{children}</CardContent>
  </Card>
);

const PieChartLegend: React.FC<PieChartLegendProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((_, index) => (
          <Skeleton key={index} className="h-4 w-20 rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {data.map((product) => (
        <div key={product.name} className="flex items-center space-x-2">
          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: getProductColor(product.name) }}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {product.name}
          </span>
        </div>
      ))}
    </div>
  );
};

// Custom Hooks
const useDateRanges = (dateRange: DateRange) => {
  return useMemo(() => {
    const fromISO = dateRange.from.toISOString();
    const toISO = new Date(
      dateRange.to.getTime() + 24 * 60 * 60 * 1000,
    ).toISOString();

    const diffMs =
      dateRange.to.getTime() - dateRange.from.getTime() + 24 * 60 * 60 * 1000;

    const prevFrom = new Date(dateRange.from.getTime() - diffMs).toISOString();
    const prevTo = fromISO;

    return {
      currentDateISO: { from: fromISO, to: toISO },
      previousDateISO: { from: prevFrom, to: prevTo },
    };
  }, [dateRange]);
};

const useDashboardData = (currentDateISO: any, previousDateISO: any) => {
  const {
    data: topProducts,
    error: topProductsError,
    isLoading: isLoadingTopProducts,
  } = useSWR<ProductData[]>("/api/dashboard/most-selled", fetcher, SWR_CONFIG);

  const {
    data: orders,
    error,
    isLoading,
    mutate,
  } = useSWR<Order[]>(
    `/api/dashboard/orders?from=${currentDateISO.from}&to=${currentDateISO.to}`,
    fetcher,
    SWR_CONFIG,
  );

  const { data: previousOrders } = useSWR<Order[]>(
    `/api/dashboard/orders?from=${previousDateISO.from}&to=${previousDateISO.to}`,
    fetcher,
    SWR_CONFIG,
  );

  return {
    topProducts,
    topProductsError,
    isLoadingTopProducts,
    orders,
    error,
    isLoading,
    mutate,
    previousOrders,
  };
};

// Main Component
export const DashboardContent: React.FC = () => {
  const [tempRange, setTempRange] = useState<DateRange>(INITIAL_DATE_RANGE);
  const [dateRange, setDateRange] = useState<DateRange>(INITIAL_DATE_RANGE);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { currentDateISO, previousDateISO } = useDateRanges(dateRange);

  const {
    topProducts,
    isLoadingTopProducts,
    orders,
    error,
    isLoading,
    mutate,
    previousOrders,
  } = useDashboardData(currentDateISO, previousDateISO);

  const isChartsLoading = isLoading || isLoadingTopProducts;

  const metrics = useMemo(
    () => calculateMetrics(orders, previousOrders),
    [orders, previousOrders],
  );

  const salesData = useMemo(() => processSalesData(orders || []), [orders]);

  const metricCards: MetricCardData[] = useMemo(
    () => [
      {
        title: "Ventas Totales",
        value: formatCurrency(metrics.totalIncome),
        change: metrics.incomeChangePercent,
      },
      {
        title: "Pedidos Totales",
        value: metrics.totalOrders,
        change: metrics.ordersChangePercent,
      },
      {
        title: "Clientes Totales",
        value: metrics.totalClients,
        change: metrics.clientsChangePercent,
      },
      {
        title: "Valor promedio",
        value: formatCurrency(metrics.avgValue),
        change: metrics.avgValueChangePercent,
      },
    ],
    [metrics],
  );

  // Handlers
  const handleExportCSV = useCallback(() => {
    exportToCSV(orders || [], currentDateISO.from, currentDateISO.to);
  }, [orders, currentDateISO]);

  const handleRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  const handleDateRangeChange = useCallback((range: any) => {
    if (range.from && range.to) {
      setTempRange({
        from: new Date(range.from),
        to: new Date(range.to),
      });
    }
  }, []);

  const handleApplyDateRange = useCallback(() => {
    setDateRange(tempRange);
    setIsCalendarOpen(false);
  }, [tempRange]);

  if (error) {
    console.error("Dashboard error:", error);
  }

  return (
    <div className="max-w-7xl">
      {/* Header Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-end gap-2">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-10 rounded-lg border-gray-200 dark:border-gray-700"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Filtrar por fecha
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="end">
            <DatePickerWithRange
              dateRange={tempRange}
              setDateRange={handleDateRangeChange}
              onApply={handleApplyDateRange}
            />
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          size="sm"
          className="h-10 rounded-lg border-gray-200 dark:border-gray-700"
          onClick={handleExportCSV}
          disabled={isLoading || !!error || !orders?.length}
        >
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-10 rounded-lg border-gray-200 dark:border-gray-700"
          onClick={handleRefresh}
          disabled={isLoading}
          title="Refrescar datos"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refrescar
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map(({ title, value, change }) => (
          <MetricCard
            key={title}
            title={title}
            value={value}
            change={change}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Area Chart */}
        <ChartContainer title="Ingresos por Mes">
          {isLoading ? (
            <Skeleton className="h-full w-full rounded-md" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={CHART_MARGINS}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                  tickFormatter={formatMonthLabel}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  fill="#C7D2FE"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartContainer>

        {/* Pie Chart */}
        <ChartContainer title="Productos Más Vendidos" className="col-span-1">
          <div className="flex h-full w-full flex-col">
            <div className="min-h-32 flex-1">
              {isChartsLoading ? (
                <Skeleton className="h-full w-full rounded-md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topProducts ?? []}
                      dataKey="sales"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      innerRadius="40%"
                      paddingAngle={2}
                      stroke="none"
                    >
                      {(topProducts ?? []).map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={getProductColor(entry.name)}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <PieChartLegend
              data={topProducts ?? []}
              isLoading={isLoadingTopProducts}
            />
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export default DashboardContent;
