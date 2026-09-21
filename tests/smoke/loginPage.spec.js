// @ts-check
import { test, expect } from '@playwright/test';

test('Login page displays the Sauce Demo login form', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#login-button')).toBeVisible();
});

