import { test, expect } from "@playwright/test";

test("Completa flujo de compra y captura ID de pago", async ({ page }) => {
  test.setTimeout(60000);

  await page.goto("http://localhost:3000");

  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });

  const productCard = page.locator(".product-card").first();
  await productCard.waitFor();
  await productCard.locator('button[aria-label="Añadir al carrito"]').click();

  await page.evaluate(() => {
    window.scrollBy(0, -500);
  });

  const cartButton = page.getByRole("link", { name: "Ver carrito de compras" });
  await expect(cartButton.locator("span")).toHaveText("1");

  await page.getByRole("link", { name: "Ver carrito de compras" }).click();
  await page.waitForURL("**/cart");

  await page.getByRole("button", { name: "Continuar al Pago" }).click();
  await page.waitForURL("**/checkout");

  await page.fill('input[id="name"]', "Juan");
  await page.fill('input[id="surname"]', "Perez");
  await page.fill('input[id="street_name"]', "Calle Falsa 123");
  await page.fill('input[id="street_number"]', "1234");
  await page.fill('input[id="email"]', "test@example.com");
  await page.fill('input[id="number"]', "1123456789");
  await page.fill('input[id="city"]', "Buenos Aires");
  await page.fill('input[id="province"]', "Buenos Aires");
  await page.fill('input[id="postalCode"]', "1425");
  await page.fill('input[id="floor"]', "1");
  await page.fill('input[id="apartment"]', "A");

  await page.getByRole("button", { name: "Enviar" }).click();

  await page.waitForURL("**/checkout/payment?preference=*");

  await page.waitForSelector("iframe", { timeout: 15000 });

  let paymentFrame = null;
  for (const frame of page.frames()) {
    const isVisible = await frame
      .locator("form.mp-checkout-bricks__payment-form")
      .isVisible()
      .catch(() => false);
    if (isVisible) {
      paymentFrame = frame;
      break;
    }
  }

  if (!paymentFrame) {
    throw new Error(
      "No se encontró el iframe de MercadoPago con el formulario visible",
    );
  }

  await page.waitForTimeout(5000);
  await paymentFrame.waitForSelector("text=Tarjeta de débito");
  await paymentFrame.getByText("Tarjeta de débito").click();

  await page.waitForSelector('iframe[name="cardNumber"]');
  await page.waitForSelector('iframe[name="expirationDate"]');
  await page.waitForSelector('iframe[name="securityCode"]');

  const cardNumberFrame = page.frameLocator('iframe[name="cardNumber"]');
  await cardNumberFrame
    .locator('input[name="cardNumber"]')
    .fill("5287 3383 1025 3304");

  const expirationDateFrame = page.frameLocator(
    'iframe[name="expirationDate"]',
  );
  await expirationDateFrame
    .locator('input[name="expirationDate"]')
    .fill("1130"); // MMYY

  const securityCodeFrame = page.frameLocator('iframe[name="securityCode"]');
  await securityCodeFrame.locator('input[name="securityCode"]').fill("123");

  const nameField = paymentFrame.locator('input[name="HOLDER_NAME"]');
  if (await nameField.isVisible()) {
    await nameField.fill("Nahuel Villegas");
  }

  const dniField = paymentFrame.locator('input[name="DOCUMENT"]');
  if (await dniField.isVisible()) {
    await dniField.fill("12345678");
  }

  const emailField = paymentFrame.locator('input[name="EMAIL"]');
  if (await emailField.isVisible()) {
    await emailField.fill("nahugc258@gmail.com");
  }

  await page.waitForTimeout(3000);
  await paymentFrame.getByRole("button", { name: "Pagar" }).click();

  await page.waitForURL("**/checkout/payment/status?id=*", { timeout: 15000 });

  const url = page.url();
  const match = url.match(/id=(\d+)/);
  const paymentId = match ? match[1] : null;

  expect(paymentId).not.toBeNull();
  console.log("ID del pago:", paymentId);
});
