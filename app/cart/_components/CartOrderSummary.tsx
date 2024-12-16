import { Button } from "@/app/_components/ui/button";
import { Card, CardDescription, CardTitle } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import axios from "axios";
import { motion } from "framer-motion";

interface CartOrderSummaryProps {
  cartProducts: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  getTotalOrderPrice: () => number;
}

export function CartOrderSummary({
  cartProducts,
  getTotalOrderPrice,
}: CartOrderSummaryProps) {
  const subtotal = getTotalOrderPrice();

  const toPayment = async () => {
    await axios
      .post("/api/checkout", cartProducts)
      .then((response) => console.log(response));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
      transition={{ duration: 0.4 }}
      className="h-min px-6"
    >
      <Card className="px-4 py-4">
        <CardTitle className="mb-2 text-2xl font-semibold">
          Resumen de Orden
        </CardTitle>

        {cartProducts.map((product) => (
          <CardDescription className="text-slate-800" key={product.id}>
            <div className="flex justify-between">
              <h2 className="text-base">
                {product.name} (x{product.quantity})
              </h2>
              <p>${(product.price * product.quantity).toFixed(2)}</p>
            </div>
          </CardDescription>
        ))}

        <Separator className="my-2" />

        <div className="flex flex-col gap-2 font-semibold">
          <div className="flex justify-between">
            <span className="text-xl font-semibold">Subtotal:</span>
            <span className="text-xl font-semibold">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-semibold">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>

        <Button className="mt-4 w-full" size="lg" onClick={() => toPayment()}>
          Continuar al Pago
        </Button>
        {/* <Link className='mt-4 w-full h-10 bg-black text-white px-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0' href='/checkout'>
          Continuar al Pago
        </Link> */}
      </Card>
    </motion.div>
  );
}
