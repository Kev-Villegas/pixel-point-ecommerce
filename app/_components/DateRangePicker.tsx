"use client";

import { cn } from "@/app/_lib/utils";
import type { DateRange } from "react-day-picker";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";

interface DatePickerWithRangeProps {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
  onApply?: () => void;
  className?: string;
}

export function DatePickerWithRange({
  dateRange,
  setDateRange,
  onApply,
  className,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={(range: any) => {
          if (range) setDateRange(range);
        }}
        numberOfMonths={2}
      />
      <div className="flex items-center justify-end gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date();
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
            setDateRange({ from: lastWeek, to: today });
          }}
        >
          Última semana
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date();
            const lastMonth = new Date(today);
            lastMonth.setMonth(today.getMonth() - 1);
            setDateRange({ from: lastMonth, to: today });
          }}
        >
          Último mes
        </Button>
        <Button
          className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          size="sm"
          onClick={onApply}
        >
          Aplicar
        </Button>
      </div>
    </div>
  );
}
