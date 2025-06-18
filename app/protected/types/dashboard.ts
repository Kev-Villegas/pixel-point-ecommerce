export interface Order {
  id: string;
  email: string;
  createdAt: string;
  totalPrice: number;
}

export interface Metrics {
  totalIncome: number;
  totalOrders: number;
  totalClients: number;
  avgValue: number;
  incomeChangePercent: number;
  ordersChangePercent: number;
  clientsChangePercent: number;
  avgValueChangePercent: number;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  change: number;
}

export interface SalesDataPoint {
  month: string;
  revenue: number;
}

export interface ProductData {
  name: string;
  sales: number;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  isLoading: boolean;
}

export interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface PieChartLegendProps {
  data: ProductData[];
  isLoading: boolean;
}

export type DateRangeISO = {
  from: string;
  to: string;
};
