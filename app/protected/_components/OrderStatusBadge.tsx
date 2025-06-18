import { Badge } from "@/app/_components/ui/badge";

export type OrderStatus =
  | "ENTREGADO"
  | "ENVIO_PENDIENTE"
  | "ENVIADO"
  | "PAGO_PENDIENTE";

const statusMap: Record<
  OrderStatus,
  { label: string; icon: string; className: string }
> = {
  ENTREGADO: {
    label: "Entregado",
    icon: "✓",
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  ENVIO_PENDIENTE: {
    label: "Envío Pendiente",
    icon: "⏳",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
  ENVIADO: {
    label: "Enviado",
    icon: "📦",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  },
  PAGO_PENDIENTE: {
    label: "Pago Pendiente",
    icon: "✕",
    className: "bg-red-100 text-red-800 hover:bg-red-100",
  },
};

interface Props {
  status: string;
}

export function OrderStatusBadge({ status }: Props) {
  const badge = statusMap[status as OrderStatus];

  if (!badge) return <Badge variant="secondary">{status}</Badge>;

  return (
    <Badge className={badge.className}>
      {badge.icon} {badge.label}
    </Badge>
  );
}
