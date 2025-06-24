"use client";

import React, { useState } from "react";
import DashboardContent from "../_components/DashboardContent";
import { OrderDashboard } from "../_components/OrderDashboard";
import ProductDashboard from "../_components/ProductDashboard";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/_components/ui/tabs";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("ventas");

  return (
    <section className="mt-6 flex-1 dark:bg-gray-950">
      <div className="ml-4 w-full px-8">
        <div className="pl-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Analítica y métricas de tu tienda
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-3 pl-6"
        >
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-gray-300 p-1 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <TabsTrigger
              value="ventas"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50"
            >
              Ventas
            </TabsTrigger>
            <TabsTrigger
              value="ordenes"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50"
            >
              Órdenes
            </TabsTrigger>
            <TabsTrigger
              value="productos"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50"
            >
              Productos
            </TabsTrigger>
          </TabsList>

          {/* Contenido */}
          <TabsContent value="ventas" className="mt-6">
            <DashboardContent />
          </TabsContent>
          <TabsContent value="ordenes" className="mt-6">
            <OrderDashboard />
          </TabsContent>
          <TabsContent value="productos" className="mt-6">
            <ProductDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DashboardPage;
