import { Suspense } from "react";
import OrdersTable from "@/app/orders/_components/OrdersTable";
import { OrdersHeader } from "@/app/orders/_components/OrdersHeader";
import OrdersTableSkeleton from "@/app/orders/_components/OrdersTableSkeleton";

const OrdersPage = () => {
  return (
    <div className="container p-10">
      <OrdersHeader />
      <div className="mt-8">
        <Suspense fallback={<OrdersTableSkeleton />}>
          <OrdersTable />
        </Suspense>
      </div>
    </div>
  );
};

export default OrdersPage;
