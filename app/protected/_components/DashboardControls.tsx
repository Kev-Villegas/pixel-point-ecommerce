"use client";

import React from "react";
import { DateRange } from "../types/dashboard";
import { Button } from "@/app/_components/ui/button";
import { Calendar, Download, RefreshCw } from "lucide-react";
import { DatePickerWithRange } from "@/app/_components/DateRangePicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

interface DashboardControlsProps {
  isCalendarOpen: boolean;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tempRange: DateRange;
  handleDateRangeChange: (range: {
    from?: string | Date;
    to?: string | Date;
  }) => void;
  handleApplyDateRange: () => void;
  handleExportCSV: () => void;
  handleRefresh: () => void;
  isLoading: boolean;
  error: unknown;
  hasOrders: boolean;
}

const DashboardControls: React.FC<DashboardControlsProps> = ({
  isCalendarOpen,
  setIsCalendarOpen,
  tempRange,
  handleDateRangeChange,
  handleApplyDateRange,
  handleExportCSV,
  handleRefresh,
  isLoading,
  error,
  hasOrders,
}) => (
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
      disabled={isLoading || !!error || !hasOrders}
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
);

export default DashboardControls;
