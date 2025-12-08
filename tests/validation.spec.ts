import { test, expect } from "@playwright/test";

test("Debe rechazar correos con errores tipográficos comunes (.con)", async ({
  page,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  await page.goto(`${baseUrl}/auth/signup`);

  await page.fill("#name", "TestUser");
  await page.fill("#lastname", "TestLastname");
  await page.fill("#email", "invalid@gmail.con");
  await page.fill("#password", "Password123!");
  await page.fill("#confirmPassword", "Password123!");

  await page.click('button[type="submit"]');

  // Check for the specific error message we added
  const errorMessage = page.getByText(
    "El correo electrónico no parece válido (verifica '.con').",
  );
  await expect(errorMessage).toBeVisible();
});

test("Debe permitir correos válidos", async ({ page }) => {
  const uniqueEmail = `valid${Date.now()}@test.com`;
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  await page.goto(`${baseUrl}/auth/signup`);

  await page.fill("#name", "TestUser");
  await page.fill("#lastname", "TestLastname");
  await page.fill("#email", uniqueEmail);
  await page.fill("#password", "Password123!");
  await page.fill("#confirmPassword", "Password123!");

  await page.click('button[type="submit"]');

  // Should redirect to signin or show success message (depending on logic, test/register.test.ts expects redirect)
  await expect(page).toHaveURL(/.*\/auth\/signin/);
});
