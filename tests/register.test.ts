import { test, expect } from "@playwright/test";

test("Registro de usuario nuevo en /auth/signup", async ({ page }) => {
  const uniqueEmail = `usuario${Date.now()}@test.com`;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  if (!baseUrl) {
    throw new Error("La variable de entorno NEXT_PUBLIC_URL no está definida");
  }

  await page.goto(`${baseUrl}/auth/signup`);

  await page.fill("#name", "TestNombre");
  await page.fill("#lastname", "TestApellido");
  await page.fill("#email", uniqueEmail);
  await page.fill("#password", "Test1234!");
  await page.fill("#confirmPassword", "Test1234!");

  await page.click('button[type="submit"]');

  await page.waitForURL("**/auth/signin");

  expect(page.url()).toContain("/auth/signin");
});
