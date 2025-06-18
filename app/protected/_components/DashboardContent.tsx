"use client";

import DashboardControls from "./DashboardControls";
import { calculateMetrics } from "@/app/_utils/metrics";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { formatMonthLabel } from "@/app/_utils/formatter";
import { processSalesData } from "@/app/_utils/salesData";
import { useDateRanges } from "@/app/_hooks/useDateRanges";
import MetricsSummary from "../_components/MetricsSummary";
import { exportOrdersToCSV } from "@/app/_utils/exportCSV";
import { getProductColor } from "@/app/_utils/productColors";
import React, { useState, useMemo, useCallback } from "react";
import { useDashboardData } from "@/app/_hooks/useDashboardData";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  ChartContainerProps,
  DateRange,
  PieChartLegendProps,
} from "../types/dashboard";

const INITIAL_DATE_RANGE: DateRange = {
  from: new Date(new Date().setDate(new Date().getDate() - 7)),
  to: new Date(),
};

const CHART_MARGINS = {
  top: 10,
  right: 30,
  left: 0,
  bottom: 0,
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

  const handleExportCSV = useCallback(() => {
    exportOrdersToCSV(orders || [], currentDateISO.from, currentDateISO.to);
  }, [orders, currentDateISO]);

  const handleRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  const handleDateRangeChange = useCallback(
    (range: { from?: string | Date; to?: string | Date }) => {
      if (range.from && range.to) {
        setTempRange({
          from: new Date(range.from),
          to: new Date(range.to),
        });
      }
    },
    [],
  );

  const handleApplyDateRange = useCallback(() => {
    setDateRange(tempRange);
    setIsCalendarOpen(false);
  }, [tempRange]);

  if (error) {
    console.error("Dashboard error:", error);
  }

  return (
    <div className="w-full">
      {/* Header Controls */}
      <DashboardControls
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        tempRange={tempRange}
        handleDateRangeChange={handleDateRangeChange}
        handleApplyDateRange={handleApplyDateRange}
        handleExportCSV={handleExportCSV}
        handleRefresh={handleRefresh}
        isLoading={isLoading}
        error={error}
        hasOrders={!!orders?.length}
      />

      <MetricsSummary metrics={metrics} isLoading={isLoading} />

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
