import { FaqSection } from "../_components/FaqSection";

export default function FaqPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            Preguntas Frecuentes
          </h1>
          <p className="text-balance text-muted-foreground">
            Encontrá respuestas a las preguntas más comunes sobre Pixel Point.
            <br />
            Cualquier consulta sobre su compra, pueden mandarnos un mensaje por{" "}
            <a
              href="https://www.instagram.com/pixel.pointt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Instagram
            </a>
            .
          </p>
        </div>
        <FaqSection />
      </div>
    </main>
  );
}
