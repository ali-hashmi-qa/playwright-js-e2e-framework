import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';

const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';
const INVALID_PASSWORD = 'wrong_password';

test.describe('Login', () => {
    test('standard user reaches inventory', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(VALID_USER, VALID_PASSWORD);
        await inventoryPage.expectLoaded();
    });

    test('invalid password shows an error', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(VALID_USER, INVALID_PASSWORD);
        await loginPage.expectErrorContains('Username and password do not match');
    });
});
