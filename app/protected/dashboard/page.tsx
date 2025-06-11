import React from "react";
import DashboardContent from "../_components/DashboardContent";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/_components/ui/tabs";

const DashboardPage = () => {
  return (
    <section className="flex-1 items-center justify-center overflow-auto p-5 pt-4 dark:bg-gray-950">
      <div className="px-10">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Analítica y métricas de tu tienda
        </p>
        <header className="mb-6">
          <Tabs defaultValue="ventas" className="w-full">
            <TabsList className="no-scrollbar inline-flex h-10 overflow-x-auto rounded-md bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <TabsTrigger value="ventas">Ventas</TabsTrigger>
              <TabsTrigger value="ordenes">Órdenes</TabsTrigger>
              <TabsTrigger value="productos">Productos</TabsTrigger>
            </TabsList>

            {/* Contenido de cada Tab */}
            <TabsContent value="ventas" className="mt-6">
              <DashboardContent />
            </TabsContent>

            <TabsContent value="ordenes" className="mt-6">
              {/* Aquí irá tu componente de órdenes */}
              <div className="py-12 text-center">
                <h2 className="text-2xl font-semibold">Órdenes Content</h2>
                <p className="mt-2 text-gray-600">Próximamente...</p>
              </div>
            </TabsContent>

            <TabsContent value="productos" className="mt-6">
              {/* Aquí irá tu componente de productos */}
              <div className="py-12 text-center">
                <h2 className="text-2xl font-semibold">Productos Content</h2>
                <p className="mt-2 text-gray-600">Próximamente...</p>
              </div>
            </TabsContent>
          </Tabs>
        </header>
      </div>
    </section>
  );
};

export default DashboardPage;
