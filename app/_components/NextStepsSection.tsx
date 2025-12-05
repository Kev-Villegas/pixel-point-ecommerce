"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";

const nextStepsCategories = [
  {
    title: "Beneficios de Crear una Cuenta",
    items: [
      {
        question: "¿Por qué crear una cuenta en Pixel Point?",
        answer:
          "Al crear una cuenta, generamos un 'cliente' en MercadoPago asociado a tu perfil. Esto es un paso fundamental para que, en una próxima actualización, podamos integrar la funcionalidad de guardar tus métodos de pago y direcciones directamente en la base de datos de MercadoPago. Queremos aclarar que nosotros NO guardamos los datos de tus tarjetas; todo se gestionará de forma 100% segura a través de MercadoPago.",
      },
      {
        question: "Compra como Invitado vs. Usuario Registrado",
        answer:
          "Si bien podés comprar como invitado, registrarte te brinda una experiencia más personalizada y rápida. Como invitado, tendrás que ingresar tus datos en cada compra. Como usuario registrado, todo queda guardado para tu comodidad.",
      },
    ],
  },
  {
    title: "Envíos y Futuras Mejoras",
    items: [
      {
        question: "¿Cómo funciona el envío actualmente?",
        answer:
          "Actualmente, al finalizar tu compra y confirmar el pago, se muestra directamente en la página un formulario para que completes tu domicilio. Es un paso adicional para asegurar que tu pedido llegue correctamente.",
      },
      {
        question: "Integración futura de envíos",
        answer:
          "Estamos trabajando para integrar la selección de método de envío y el cálculo de costos de Correo Argentino directamente en el proceso de pago de la página. Esto te permitirá gestionar todo desde aquí de forma aún más fluida.",
      },
    ],
  },
  {
    title: "Proceso de Compra Detallado",
    items: [
      {
        question: "¿Qué sucede después de pagar?",
        answer:
          "Una vez confirmado el pago, se mostrará directamente en la página un formulario para que completes tu dirección de entrega. Es CRUCIAL que completes este formulario con tu dirección real para coordinar la entrega. Sin este paso, no podemos despachar el producto.",
      },
    ],
  },
];

export function NextStepsSection() {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <p className="text-muted-foreground">
          Aquí te contamos sobre las próximas actualizaciones de la plataforma y
          cómo aprovechar al máximo tu experiencia de compra.
        </p>
      </div>
      {nextStepsCategories.map((category, index) => (
        <div key={index} className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">{category.title}</h2>
          <Accordion type="single" collapsible className="w-full">
            {category.items.map((item, itemIndex) => (
              <AccordionItem
                key={itemIndex}
                value={`item-${index}-${itemIndex}`}
              >
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
