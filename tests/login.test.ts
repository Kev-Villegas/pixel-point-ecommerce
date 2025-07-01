import { test, expect } from "@playwright/test";

test("Inicio de sesión con usuario existente", async ({ page }) => {
  const email = "usuario1750774857601@test.com";
  const password = "Test1234!";

  await page.goto("http://localhost:3000/auth/signin");

  await page.fill("#email", email);
  await page.fill("#password", password);
  await page.click('button[type="submit"]');

  await page.waitForURL("**/");
  expect(page.url()).toContain("localhost:3000");
});
