export const formatCurrency = (amount: number): string =>
  `$${amount.toFixed(2)}`;

export const formatPercentage = (percentage: number): string =>
  `${Math.abs(percentage).toFixed(1)}%`;

export const formatMonthLabel = (monthString: string): string => {
  const [year, month] = monthString.split("-");
  return `${month}/${year}`;
};
