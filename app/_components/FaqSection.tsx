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
    title: "Proceso de Compra",
    items: [
      {
        question: "¿Cómo es el proceso de compra?",
        answer:
          "El proceso es muy simple y consta de 3 pasos: 1) Armás tu carrito con los productos que querés. 2) Realizás el pago de forma segura a través de nuestra plataforma. 3) Al confirmar el pago, se muestra directamente en la página un formulario para que completes tu domicilio de entrega. Una vez que completás y enviás el formulario, despachamos tu paquete.",
      },
      {
        question: "¿Cuánto tarda en llegar mi pedido después de pagar?",
        answer:
          "Una vez que completes el formulario con tu domicilio que se muestra en la página después del pago, procesamos y despachamos tu pedido. Los tiempos de entrega dependen de tu ubicación y pueden variar según el servicio de envío.",
      },
      {
        question: "¿Qué pasa si no completo el formulario de domicilio?",
        answer:
          "Es importante que completes el formulario que se muestra en la página después del pago lo antes posible. Sin esta información, no podemos despachar tu pedido. Si tenés algún inconveniente, contactanos y te ayudamos.",
      },
    ],
  },
  {
    title: "Envíos y Entregas",
    items: [
      {
        question: "¿Hacen envíos a todo el país?",
        answer:
          "Sí, realizamos envíos a todo el país a través de Correo Argentino. También podés retirar en persona si estás cerca, coordinando previamente en nuestro punto de entrega.",
      },
      {
        question: "¿Con qué empresa de logística trabajan?",
        answer:
          "Trabajamos con Correo Argentino, una de las empresas de logística más confiables de Argentina, para asegurar que tu pedido llegue en tiempo y forma.",
      },
      {
        question: "¿Puedo hacer seguimiento de mi envío?",
        answer:
          "Sí, una vez que despachemos tu paquete con Correo Argentino, te enviaremos el código de seguimiento para que puedas rastrear tu envío en tiempo real.",
      },
    ],
  },
  {
    title: "Pagos y Promociones",
    items: [
      {
        question: "¿Qué medios de pago aceptan?",
        answer:
          "Aceptamos transferencias, tarjetas de crédito/débito y pagos por MercadoPago. También podés abonar en efectivo generando un ticket para Pago Fácil o Rapipago.",
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
  {
    title: "Cuenta y Registro",
    items: [
      {
        question: "¿Qué beneficios tengo si me registro en el ecommerce?",
        answer:
          "Al registrarte como cliente en nuestra plataforma tenés acceso a funciones exclusivas: podés guardar tus productos favoritos, hacer seguimiento de tus pedidos en tiempo real, acceder más rápido al checkout con tus datos guardados, recibir notificaciones sobre promociones especiales, y mucho más. ¡Es gratis y solo te toma unos segundos!",
      },
      {
        question: "¿Es obligatorio registrarme para comprar?",
        answer:
          "No es obligatorio, podés comprar como invitado. Sin embargo, te recomendamos registrarte para aprovechar todas las ventajas y tener un mejor control de tus compras.",
      },
      {
        question: "¿Mis datos están seguros?",
        answer:
          "Absolutamente. Utilizamos tecnología de encriptación y protocolos de seguridad para proteger toda tu información personal y de pago.",
      },
    ],
  },
];

export function FaqSection() {
  return (
    <div className="space-y-10">
      {faqCategories.map((category, index) => (
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
