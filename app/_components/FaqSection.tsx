"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";

const faqCategories = [
  {
    title: "Información General",
    items: [
      {
        question: "¿Quiénes somos?",
        answer:
          "Somos un grupo de emprendedores con más de un año de experiencia en ventas a través de Mercado Libre.",
      },
      {
        question: "¿Los productos son originales?",
        answer:
          "Sí, todos nuestros celulares son 100% originales y nuevos. No vendemos productos usados ni reacondicionados.",
      },
      {
        question: "¿Tienen local a la calle?",
        answer:
          "Por ahora trabajamos de forma online, pero podés retirar en persona coordinando previamente en nuestro punto de entrega.",
      },
    ],
  },
  {
    title: "Envíos y Entregas",
    items: [
      {
        question: "¿Hacen envíos a todo el país?",
        answer:
          "Sí, realizamos envíos a todo el país por correo. También podés retirar en persona si estás cerca.",
      },
    ],
  },
  {
    title: "Pagos y Promociones",
    items: [
      {
        question: "¿Qué medios de pago aceptan?",
        answer:
          "Aceptamos transferencias, tarjetas de crédito/débito, pagos por MercadoPago y efectivo si retirás en persona.",
      },
      {
        question: "¿Puedo pagar en cuotas?",
        answer:
          "Sí, podés pagar en cuotas con tarjeta a través de MercadoPago. Las promociones pueden variar según el banco.",
      },
      {
        question: "¿Hacen descuentos por compras grandes o mayoristas?",
        answer:
          "Sí, tenemos precios especiales para compras por cantidad. Escribinos y te armamos un presupuesto a medida.",
      },
    ],
  },
];

export function FaqSection() {
  return (
    <div className="space-y-10">
      {faqCategories.map((category, index) => (
        <div key={index} className="rounded-lg border bg-card p-6">
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
