import { FaqSection } from "../_components/FaqSection";

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Preguntas Frecuentes
      </h1>
      <FaqSection />
    </main>
  );
}
