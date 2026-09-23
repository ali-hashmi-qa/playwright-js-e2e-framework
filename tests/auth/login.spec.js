import { test } from '../../lib/fixtures.js';

const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';
const INVALID_PASSWORD = 'wrong_password';

test.describe('Login', () => {
    test('standard user reaches inventory', async ({ loginPage, inventoryPage }) => {
        await loginPage.goto();
        await loginPage.login(VALID_USER, VALID_PASSWORD);
        await inventoryPage.expectLoaded();
    });

    test('invalid password shows an error', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(VALID_USER, INVALID_PASSWORD);
        await loginPage.expectErrorContains('Username and password do not match');
    });
});
