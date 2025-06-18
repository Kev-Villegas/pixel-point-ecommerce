import { Label } from "@/app/_components/ui/label";
import { Order } from "@/app/_hooks/useRecentOrders";
import { OrderStatusBadge } from "@/app/protected/_components/OrderStatusBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export function OrderDetailDialog({ open, onOpenChange, order }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalles de la Orden {order?.id}</DialogTitle>
        </DialogHeader>

        {order && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Cliente" value={order.cliente} />
              <Field label="Email" value={order.email} />
              <Field label="Teléfono" value={order.telefono} />
              <Field label="Fecha" value={order.fecha} />
            </div>
            <Field label="Dirección" value={order.direccion} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Producto" value={order.producto} />
              <Field label="Precio" value={`$${order.precio.toFixed(2)}`} />
            </div>
            <div>
              <Label className="text-sm font-medium">Estado</Label>
              <div className="mt-1">
                <OrderStatusBadge status={order.estado} />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  );
}
