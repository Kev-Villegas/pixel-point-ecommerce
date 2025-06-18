type CSVField = string | number | null | undefined;
type CSVRow = CSVField[];

export interface ExportCSVOptions<T> {
  filename?: string;
  headers: string[];
  rows: (item: T) => CSVRow;
  data: T[];
  locale?: string;
}

const escapeCSV = (text: string): string => text?.replace(/"/g, '""') ?? "";

export const exportToCSV = <T>({
  filename = `export-${new Date().toISOString().split("T")[0]}.csv`,
  headers,
  rows,
  data,
  locale = "es-AR",
}: ExportCSVOptions<T>) => {
  const BOM = "\uFEFF";

  const csvRows = data.map((item) =>
    rows(item).map((field) => `"${escapeCSV(String(field ?? ""))}"`),
  );

  const csvContent =
    BOM + [headers, ...csvRows].map((r) => r.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
