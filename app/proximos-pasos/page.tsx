import { NextStepsSection } from "@/app/_components/NextStepsSection";

export const metadata = {
  title: "Próximos Pasos | Pixel Point",
  description:
    "Información sobre futuras actualizaciones y el proceso de compra en Pixel Point.",
};

export default function NextStepsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Próximos Pasos y Actualizaciones
      </h1>
      <NextStepsSection />
    </div>
  );
}
