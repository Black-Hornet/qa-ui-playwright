import { test, expect } from '@playwright/test';

test('user can logout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await page.waitForURL('**/inventory.html');

  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByTestId('login-button')).toBeVisible();
});
