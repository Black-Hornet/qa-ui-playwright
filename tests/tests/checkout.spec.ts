import { test, expect } from '@playwright/test';

test('complete checkout happy path', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await page.waitForURL('**/inventory.html');

  // Add two items
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
  await page.getByTestId('shopping-cart-link').click();
  await page.waitForURL('**/cart.html');
  await expect(page.locator('.cart_item')).toHaveCount(2);

  // Checkout
  await page.getByTestId('checkout').click();
  await page.waitForURL('**/checkout-step-one.html');

  await page.getByTestId('firstName').fill('Redge');
  await page.getByTestId('lastName').fill('Bez');
  await page.getByTestId('postalCode').fill('8001');
  await page.getByTestId('continue').click();

  await page.waitForURL('**/checkout-step-two.html');
  await expect(page.locator('.cart_item')).toHaveCount(2);
  await page.getByTestId('finish').click();

  // Confirmation
  await page.waitForURL('**/checkout-complete.html');
  await expect(page.getByRole('heading', { name: /thank you/i })).toBeVisible();
});
