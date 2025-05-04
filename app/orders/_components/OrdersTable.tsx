"use client";

import useSWR from "swr";
import { format } from "date-fns";
import { useState, memo } from "react";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { OrderDetails } from "@/app/orders/_components/OrderDetails";
import OrdersTableSkeleton from "@/app/orders/_components/OrdersTableSkeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OrdersTable() {
  const { data: orders, error } = useSWR("/api/orders", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
    fallbackData: [],
  });

  if (error) return <div>Error al cargar las órdenes.</div>;
  if (!orders) return <OrdersTableSkeleton />;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID de Orden</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order: any) => (
            <MemoizedOrderRow key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const OrderRow = ({ order }: { order: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const total = order.items.reduce((acc: number, item: any) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <>
      <TableRow className="group">
        <TableCell className="font-medium">
          #{String(order.id).slice(0, 8)}
        </TableCell>
        <TableCell>
          {format(new Date(order.createdAt), "d MMM, yyyy")}
        </TableCell>
        <TableCell>
          <OrderStatusBadge status={order.status} paid={order.paid} />
        </TableCell>
        <TableCell className="text-right">${total.toFixed(2)}</TableCell>
        <TableCell>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="sr-only">Mostrar detalles de la orden</span>
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </TableCell>
      </TableRow>
      <TableRow className={!isOpen ? "hidden" : ""}>
        <TableCell colSpan={5} className="p-0">
          <Collapsible open={isOpen}>
            <CollapsibleContent>
              <OrderDetails orderId={order.id} />
            </CollapsibleContent>
          </Collapsible>
        </TableCell>
      </TableRow>
    </>
  );
};

const MemoizedOrderRow = memo(OrderRow);

function OrderStatusBadge({ status, paid }: { status: string; paid: boolean }) {
  const statusMap: Record<
    "paid" | "pending",
    {
      label: string;
      variant: "default" | "outline" | "secondary" | "destructive";
    }
  > = {
    paid: { label: "Pagado", variant: "default" },
    pending: { label: "Pendiente", variant: "outline" },
  };

  const paymentStatus = paid ? "paid" : "pending";
  const { label, variant } = statusMap[paymentStatus];

  return <Badge variant={variant}>{label}</Badge>;
}
