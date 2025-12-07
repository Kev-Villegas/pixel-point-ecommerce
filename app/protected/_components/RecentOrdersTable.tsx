"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Order } from "@/app/_hooks/useOrders";
import { OrderStatusBadge } from "./OrderStatusBadge";
import {
  Eye,
  Trash2,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/_components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";

interface Props {
  filteredOrders: Order[];
  paginatedOrders: Order[];
  statusFilter: string;
  searchTerm: string;
  dateFilter?: string;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  clearFilters: () => void;
  setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  setIsDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshOrders: () => void;
  onStatusChange?: (orderId: string, newStatus: string) => Promise<void>;
}

export function RecentOrdersTable({
  filteredOrders,
  paginatedOrders,
  statusFilter,
  searchTerm,
  dateFilter,
  itemsPerPage,
  currentPage,
  totalPages,
  startIndex,
  setSearchTerm,
  setStatusFilter,
  setItemsPerPage,
  setCurrentPage,
  clearFilters,
  setSelectedOrder,
  setIsDetailModalOpen,
  refreshOrders,
  onStatusChange,
}: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<number | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  async function handleDeleteOrder() {
    if (!orderToDelete) return;

    try {
      setDeletingOrderId(orderToDelete.rawId);
      const response = await fetch(
        `/api/dashboard/orders/${orderToDelete.rawId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la orden");
      }

      toast.success("Orden eliminada correctamente");

      await refreshOrders();

      setSearchTerm("");
      setCurrentPage(1);

      setDialogOpen(false);
      setOrderToDelete(null);
    } catch (error) {
      toast.error("No se pudo eliminar la orden");
      console.error(error);
    } finally {
      setDeletingOrderId(null);
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (onStatusChange) {
      setUpdatingOrderId(orderId);
      try {
        await onStatusChange(orderId, newStatus);
      } finally {
        setUpdatingOrderId(null);
      }
    }
  };

  if (!filteredOrders.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Órdenes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(itemsPerPage)].map((_, i) => (
            <div
              key={i}
              className="mb-2 h-8 w-full animate-pulse rounded bg-gray-200"
            />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Órdenes Recientes</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="ENTREGADO">Entregado</SelectItem>
                  <SelectItem value="ENVIO_PENDIENTE">
                    Envío Pendiente
                  </SelectItem>
                  <SelectItem value="ENVIADO">Enviado</SelectItem>
                  <SelectItem value="PAGO_PENDIENTE">Pago Pendiente</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar órdenes..."
                  className="w-full pl-8 sm:w-40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {(searchTerm || statusFilter !== "TODOS" || dateFilter) && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.cliente}</TableCell>
                    <TableCell>{order.producto}</TableCell>
                    <TableCell>${order.precio.toFixed(2)}</TableCell>
                    <TableCell>
                      <Select
                        value={order.estado}
                        onValueChange={(newStatus) =>
                          handleStatusChange(order.rawId.toString(), newStatus)
                        }
                        disabled={updatingOrderId === order.id}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PAGO_PENDIENTE">
                            Pago Pendiente
                          </SelectItem>
                          <SelectItem value="ENVIO_PENDIENTE">
                            Envío Pendiente
                          </SelectItem>
                          <SelectItem value="ENVIADO">Enviado</SelectItem>
                          <SelectItem value="ENTREGADO">Entregado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsDetailModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deletingOrderId === order.rawId}
                          onClick={() => {
                            setOrderToDelete(order);
                            setDialogOpen(true);
                          }}
                          aria-label={`Eliminar orden ${order.id}`}
                        >
                          {deletingOrderId === order.rawId ? (
                            <svg
                              className="h-4 w-4 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                          ) : (
                            <Trash2 className="h-4 w-4 text-red-500" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => setItemsPerPage(Number(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600">
                por página - Mostrando {startIndex + 1} a{" "}
                {Math.min(startIndex + itemsPerPage, filteredOrders.length)} de{" "}
                {filteredOrders.length} órdenes
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <span className="px-2 text-sm">
                {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que deseas eliminar la orden{" "}
              <strong>{orderToDelete?.id}</strong>? Esta acción es irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={deletingOrderId !== null}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteOrder}
              disabled={deletingOrderId !== null}
            >
              {deletingOrderId !== null ? (
                <svg
                  className="mr-2 inline-block h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : null}
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
