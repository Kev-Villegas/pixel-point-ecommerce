"use client";

import React from "react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { formatPercentage, formatCurrency } from "@/app/_utils/formatter";
import {
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  ShoppingCart,
  Users,
  PackageCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

interface Metrics {
  totalIncome: number;
  incomeChangePercent: number;
  totalOrders: number;
  ordersChangePercent: number;
  totalClients: number;
  clientsChangePercent: number;
  avgValue: number;
  avgValueChangePercent: number;
}

interface MetricSummaryProps {
  metrics: Metrics;
  isLoading: boolean;
}

const MetricItem: React.FC<{
  title: string;
  icon: React.ReactNode;
  value: string | number;
  change: number;
  isLoading: boolean;
}> = ({ title, icon, value, change, isLoading }) => {
  const isPositive = change >= 0;
  const changeColor = isPositive
    ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
    : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100";

  return (
    <Card className="flex-1 border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-28 rounded-md" />
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </span>
            <span
              className={`flex items-center space-x-1 rounded-md px-2 py-0.5 text-sm font-medium ${changeColor}`}
            >
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span>{formatPercentage(change)}</span>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const MetricSummary: React.FC<MetricSummaryProps> = ({
  metrics,
  isLoading,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row">
      <MetricItem
        title="Ventas Totales"
        icon={<CreditCard className="h-4 w-4" />}
        value={isLoading ? "" : formatCurrency(metrics.totalIncome)}
        change={metrics.incomeChangePercent}
        isLoading={isLoading}
      />
      <MetricItem
        title="Pedidos Totales"
        icon={<PackageCheck className="h-4 w-4" />}
        value={isLoading ? "" : metrics.totalOrders}
        change={metrics.ordersChangePercent}
        isLoading={isLoading}
      />
      <MetricItem
        title="Clientes Totales"
        icon={<Users className="h-4 w-4" />}
        value={isLoading ? "" : metrics.totalClients}
        change={metrics.clientsChangePercent}
        isLoading={isLoading}
      />
      <MetricItem
        title="Valor Promedio"
        icon={<ShoppingCart className="h-4 w-4" />}
        value={isLoading ? "" : formatCurrency(metrics.avgValue)}
        change={metrics.avgValueChangePercent}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MetricSummary;
