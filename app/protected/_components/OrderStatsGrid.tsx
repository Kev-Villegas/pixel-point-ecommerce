import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ShoppingCart,
  CheckCircle,
  Package,
  Clock,
  Banknote,
} from "lucide-react";

interface OrderStats {
  total: number;
  entregados: number;
  enviadas: number;
  enviosPendientes: number;
  pagoPendiente: number;
}

export function OrderStatsGrid({ stats }: { stats: OrderStats }) {
  const items = [
    {
      label: "Total Órdenes",
      value: stats.total,
      icon: <ShoppingCart className="h-5 w-5 text-gray-600" />,
      bg: "bg-gray-100",
    },
    {
      label: "Entregado",
      value: stats.entregados,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      label: "Enviadas",
      value: stats.enviadas,
      icon: <Package className="h-5 w-5 text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      label: "Envío Pendiente",
      value: stats.enviosPendientes,
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      label: "Pago Pendiente",
      value: stats.pagoPendiente,
      icon: <Banknote className="h-5 w-5 text-red-600" />,
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <Card key={item.label} className="transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2 ${item.bg}`}>{item.icon}</div>
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
