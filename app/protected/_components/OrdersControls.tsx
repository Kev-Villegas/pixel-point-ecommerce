"use client";

import { DateRange } from "../types/dashboard";
import { Button } from "@/app/_components/ui/button";
import { Calendar, Download, RefreshCw } from "lucide-react";
import { DatePickerWithRange } from "@/app/_components/DateRangePicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

interface OrdersControlsProps {
  isCalendarOpen: boolean;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tempRange: DateRange;
  handleDateRangeChange: (range: {
    from?: string | Date;
    to?: string | Date;
  }) => void;
  handleApplyDateRange: () => void;
  refreshOrders: () => void;
  handleExportCSV: () => void;
  isLoading: boolean;
  hasOrders: boolean;
  error: unknown;
}

const OrdersControls: React.FC<OrdersControlsProps> = ({
  isCalendarOpen,
  setIsCalendarOpen,
  tempRange,
  handleDateRangeChange,
  handleApplyDateRange,
  refreshOrders,
  handleExportCSV,
  isLoading,
  hasOrders,
  error,
}) => (
  <div className="mb-6 flex flex-wrap items-center justify-end gap-2">
    {/* Filtro por fecha */}
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

    {/* Exportar CSV */}
    <Button
      variant="outline"
      size="sm"
      className="h-10 rounded-lg border-gray-200 dark:border-gray-700"
      onClick={handleExportCSV}
      disabled={isLoading || !!error || !hasOrders}
    >
      <Download className="mr-2 h-4 w-4" />
      Exportar CSV
    </Button>

    {/* Refrescar */}
    <Button
      variant="outline"
      size="sm"
      className="h-10 rounded-lg border-gray-200 dark:border-gray-700"
      onClick={refreshOrders}
      disabled={isLoading}
      title="Refrescar"
    >
      <RefreshCw className="mr-2 h-4 w-4" />
      Refrescar
    </Button>
  </div>
);

export default OrdersControls;
