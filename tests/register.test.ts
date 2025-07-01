import { test, expect } from "@playwright/test";

test("Registro de usuario nuevo en /auth/signup", async ({ page }) => {
  const uniqueEmail = `usuario${Date.now()}@test.com`;

  await page.goto("http://localhost:3000/auth/signup");

  await page.fill("#email", uniqueEmail);
  await page.fill("#password", "Test1234!");
  await page.fill("#confirmPassword", "Test1234!");

  await page.click('button[type="submit"]');

  await page.waitForURL("**/auth/signin");

  expect(page.url()).toContain("/auth/signin");
});
