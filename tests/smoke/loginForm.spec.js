import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test('homepage displays the Sauce Demo login form', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.expectLoaded();
});
