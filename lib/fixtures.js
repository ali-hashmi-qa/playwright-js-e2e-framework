import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

export const test = base.extend({
    page: async ({ page }, use, testInfo) => {
        await use(page);
        const failed = testInfo.status === 'failed' || testInfo.status === 'timedOut';
        if (!failed) {
            return;
        }
        await testInfo.attach('page-url-on-failure', {
            body: page.url(),
            contentType: 'text/plain',
        });
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
});
