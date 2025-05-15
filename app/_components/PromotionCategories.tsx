import { CreditCard, Tag, Play, Flame, Truck, Percent } from "lucide-react";

export default function PromotionCategories() {
  const categories = [
    {
      icon: <Flame className="h-6 w-6 md:h-7 md:w-7" />,
      title: "SÓLO 24 HS",
      bgColor: "bg-yellow-400",
    },
    {
      icon: <CreditCard className="h-6 w-6 md:h-7 md:w-7" />,
      title: "CUOTAS SIN INTERÉS",
      bgColor: "bg-white",
    },
    {
      icon: <Tag className="h-6 w-6 md:h-7 md:w-7" />,
      title: "DESCUENTOS DIRECTOS",
      bgColor: "bg-yellow-400",
    },
    {
      icon: <Play className="h-6 w-6 md:h-7 md:w-7" />,
      title: "GAMA ALTA",
      bgColor: "bg-white",
    },
    {
      icon: <Flame className="h-6 w-6 md:h-7 md:w-7" />,
      title: "HOT SALE",
      bgColor: "bg-yellow-400",
    },
    {
      icon: <Truck className="h-6 w-6 md:h-7 md:w-7" />,
      title: "ENVÍO RÁPIDO",
      bgColor: "bg-white",
    },
    {
      icon: <Percent className="h-6 w-6 md:h-7 md:w-7" />,
      title: "CUPONES ACTIVOS",
      bgColor: "bg-yellow-400",
    },
  ];

  return (
    <div className="relative w-full overflow-x-auto bg-neutral-950 py-6">
      <div className="flex min-w-max items-center gap-5 px-4">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full ${category.bgColor} text-neutral-900 shadow-md transition-all duration-200 hover:scale-105`}
            >
              {category.icon}
            </div>
            <p className="mt-2 max-w-[90px] text-xs font-semibold leading-tight text-white">
              {category.title}
            </p>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-neutral-950 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-neutral-950 to-transparent" />
    </div>
  );
}
