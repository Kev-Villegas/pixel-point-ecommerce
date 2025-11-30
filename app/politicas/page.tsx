export default function PoliticasPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-10">
      <h1 className="text-3xl font-bold">
        Términos y Condiciones & Política de Privacidad
      </h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Términos y Condiciones</h2>
        {/* <p><strong>Última actualización:</strong> </p> */}

        <p>
          Bienvenido/a a <strong>Pixel Point</strong>. Al usar nuestro sitio web
          o realizar una compra aceptás estos Términos y Condiciones.
        </p>

        <h3 className="text-xl font-semibold">1. Identidad del Comercio</h3>
        <p>
          Pixel Point es un emprendimiento dedicado a la venta de celulares,
          accesorios y periféricos.
        </p>

        <h3 className="text-xl font-semibold">2. Uso del Sitio</h3>
        <p>
          El usuario se compromete a utilizar el sitio con fines lícitos y de
          forma responsable. Pixel Point puede actualizar contenido sin previo
          aviso.
        </p>

        <h3 className="text-xl font-semibold">3. Productos y Precios</h3>
        <ul className="ml-6 list-disc">
          <li>Precios expresados en ARS.</li>
          <li>Las imágenes pueden ser ilustrativas.</li>
          <li>La disponibilidad depende del stock al momento de la compra.</li>
        </ul>

        <h3 className="text-xl font-semibold">4. Pagos</h3>
        <p>
          Los pagos se procesan mediante <strong>MercadoPago</strong>. Pixel
          Point no almacena datos de tarjetas.
        </p>

        <h3 className="text-xl font-semibold">5. Envíos y Entregas</h3>
        <p>
          Envíos a todo el país. Pixel Point no se responsabiliza por demoras
          ajenas al negocio.
        </p>

        <h3 className="text-xl font-semibold">6. Cambios y Devoluciones</h3>
        <p>
          Se aceptan cambios o devoluciones dentro de los 7 días por productos
          defectuosos o errores en el envío.
        </p>

        <h3 className="text-xl font-semibold">7. Garantías</h3>
        <p>Los productos cuentan con garantía oficial según fabricante.</p>

        <h3 className="text-xl font-semibold">8. Información del Usuario</h3>
        <p>El usuario debe proporcionar datos reales y completos.</p>

        <h3 className="text-xl font-semibold">9. Propiedad Intelectual</h3>
        <p>
          El contenido del sitio pertenece a Pixel Point y está protegido por
          derechos de autor.
        </p>

        <h3 className="text-xl font-semibold">10. Ley Aplicable</h3>
        <p>Las condiciones se rigen por las leyes de la República Argentina.</p>
      </section>

      <section className="space-y-4 border-t pt-10">
        <h2 className="text-2xl font-semibold">Política de Privacidad</h2>
        {/* <p><strong>Última actualización:</strong> </p> */}

        <p>
          En Pixel Point protegemos tus datos personales según la Ley 25.326.
          Esta política explica qué datos recopilamos y cómo los usamos.
        </p>

        <h3 className="text-xl font-semibold">
          1. Información que Recopilamos
        </h3>
        <ul className="ml-6 list-disc">
          <li>Nombre, email, teléfono y dirección.</li>
          <li>Datos de navegación (cookies, IP, navegador).</li>
          <li>Información de pago procesada por MercadoPago.</li>
        </ul>

        <h3 className="text-xl font-semibold">2. Cómo Obtenemos los Datos</h3>
        <ul className="ml-6 list-disc">
          <li>Compras realizadas.</li>
          <li>Formularios completados.</li>
          <li>Cookies y herramientas de análisis.</li>
        </ul>

        <h3 className="text-xl font-semibold">3. Uso de los Datos</h3>
        <ul className="ml-6 list-disc">
          <li>Procesamiento de pedidos.</li>
          <li>Mejoras del sitio.</li>
          <li>Publicidad personalizada mediante Meta Pixel.</li>
        </ul>

        <h3 className="text-xl font-semibold">4. MercadoPago</h3>
        <p>
          MercadoPago procesa los pagos de forma segura. Pixel Point no accede a
          datos de tarjetas.
        </p>

        <h3 className="text-xl font-semibold">5. Meta Pixel</h3>
        <p>
          Utilizamos Meta Pixel para medición y publicidad personalizada. Podés
          gestionar tus preferencias desde tu cuenta de Meta.
        </p>

        <h3 className="text-xl font-semibold">6. Cookies</h3>
        <p>Usamos cookies para analítica, funcionalidades y publicidad.</p>

        <h3 className="text-xl font-semibold">
          7. Compartir Datos con Terceros
        </h3>
        <ul className="ml-6 list-disc">
          <li>MercadoPago.</li>
          <li>Servicios de envío.</li>
          <li>Meta Platforms para anuncios.</li>
        </ul>

        <h3 className="text-xl font-semibold">8. Derechos del Usuario</h3>
        <p>
          Podés solicitar acceso, rectificación o eliminación de tus datos
          enviando un email a tu contacto oficial.
        </p>

        <h3 className="text-xl font-semibold">9. Modificaciones</h3>
        <p>
          Podremos actualizar esta política en cualquier momento. La fecha de
          actualización será publicada aquí.
        </p>
      </section>
    </div>
  );
}
