import { test, expect } from '@playwright/test';

test('login and add to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await page.waitForURL('**/inventory.html', { timeout: 15000 });

  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');

  await page.getByTestId('shopping-cart-link').click();
  await page.waitForURL('**/cart.html', { timeout: 10000 });
  await expect(page.locator('.cart_item')).toHaveCount(2);
});
