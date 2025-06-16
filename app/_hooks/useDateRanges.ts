import { useMemo } from "react";
import { DateRange } from "@/app/protected/types/dashboard";

export const useDateRanges = (dateRange: DateRange) => {
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
